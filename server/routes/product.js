//reference customer model:
import express from 'express';
import ProductModel from '../models/product.model';

const router = express.Router()

  // Allow client to fetch data
  router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // Can change * to allow request from specific clients
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

router.get('/product',(req, res) => {
  let sorting = req.query.sorting ? req.query.sorting: 'Pris';
  let order = req.query.order ? req.query.order : '1';
  let page = req.query.page ? req.query.page : 1;
  let pages=parseInt(page);
  let limit = req.query.limit ? req.query.limit : 10;
  let lim=parseInt(limit);

  let content = {};
  if (req.query.Varenavn) {
    content.Varenavn = {$regex: RegExp(req.query.Varenavn), $options:'-i'};
  }
  if (req.query.Pris) {
    content.Pris = {$regex: RegExp(req.query.Pris), $options:'-i'};
  }
  if (req.query.Varetype) {
    content.Varetype = {$regex: RegExp(req.query.Varetype), $options:'-i'};
  }
  if (req.query.Land) {
    content.Land = {$regex: RegExp(req.query.Land), $options:'-i'};
  }
  if (req.query.Distrikt) {
    content.Distrikt = {$regex: RegExp(req.query.Distrikt), $options:'-i'};
  }
  if (req.query.Alkohol) {
    content.Alkohol = {$regex: RegExp(req.query.Alkohol), $options:'-i'};
  }
  if (req.query.Argang) {
    content.Argang = {$regex: RegExp(req.query.Argang), $options:'-i'};
  }
  if (req.query.Volum) {
    content.Volum = req.query.Volum;
  }
 
  ProductModel.paginate(content,{
    page: pages,
    limit: lim,
    sort: {[sorting]:[order]}
  }).then(page => {
    res.json(page)
  })
    .catch(err => {
      res.status(500).json(err);
    })
});

// UPDATE
router.put('/product',(req, res) => {

  if(req.query.Liker) {
    ProductModel.findOneAndUpdate({
      Varenummer: req.query.Varenummer,
    },{ $inc: {Liker :1 }})
      .then(doc => {
      res.json(doc)
    })
      .catch(err => {
        res.status(500).json(err)
      })
    }
  if(req.query.Misliker) {
    ProductModel.findOneAndUpdate({
      Varenummer: req.query.Varenummer,
    },{ $inc: {Misliker :1 }})
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
});

export default router;