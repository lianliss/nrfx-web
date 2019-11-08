import React from 'react';

import Table, { TableCell, TableColumn } from '../../../ui/components/Table/Table';
import Item from '../Item/Item';

export default class TableComponent extends React.Component {

  render() {
    const { props } = this;
    return (
      <Table skipContentBox headings={props.header.items.map(column => (
        <TableColumn><Item item={column.value}/></TableColumn>
      ))}>
        {props.items.map(row => (
          <TableCell>{row.items.map(column => (
            <TableColumn><Item item={column.value}/></TableColumn>
          ))}</TableCell>
        ))}
      </Table>
    );
  }
}

