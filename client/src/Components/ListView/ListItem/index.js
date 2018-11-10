import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';


class ListItem extends Component {

    render() {
        return (
                <Table.Row>
                    <Table.Cell>{this.props.name}</Table.Cell>
                    <Table.Cell>{this.props.type}</Table.Cell>
                    <Table.Cell>{this.props.volume}</Table.Cell>
                    <Table.Cell>{this.props.price}</Table.Cell>
                    <Table.Cell>{this.props.country}</Table.Cell>
                    <Table.Cell>{this.props.year}</Table.Cell>
                </Table.Row>
        );
    }
}

export default ListItem;