import React from 'react';

import Table, { TableCell, TableColumn } from '../../../ui/components/Table/Table';
import Item from '../Item/Item';
import {connect} from 'react-redux';

class TableComponent extends React.Component {
  render() {
    const { props } = this;
    return (
      <Table skipContentBox headings={props.header.items.map(column => (
        <TableColumn><Item item={column.value}/></TableColumn>
      ))}>
        {props.items.filter(row => row.type !== 'deleted').map(row => (
          <TableCell>{row.items.map(column => (
            <TableColumn sub={column.sub_value}><Item item={column.value}/></TableColumn>
          ))}</TableCell>
        ))}
      </Table>
    );
  }
}


export default connect(state => ({
  state: state.admin
}))(TableComponent);