import './Table.less';

import React from 'react';

import Table, { TableCell, TableColumn } from '../../../ui/components/Table/Table';
import Item from '../Item/Item';
import {connect} from 'react-redux';
import * as utils from '../../../utils';
import EmptyContentBlock from '../../../index/components/cabinet/EmptyContentBlock/EmptyContentBlock';

class TableComponent extends React.Component {
  render() {
    const { props } = this;

    if (!props.items.length) {
      return <EmptyContentBlock skipContentClass
        icon={require('../../../asset/120/info.svg')}
        message="Empty table"
      />
    }

    return (
      <div>
        <div className="Table__controls">
          {props.filters && <div className="Table__filters">{props.filters.map(item => (
            <Item item={item} />
          ))}</div>}
          {props.paging && <Item totalCount={props.total_count} item={props.paging} />}
        </div>

        <Table skipContentBox headings={props.header.items.map(column => (
          <TableColumn sub={column.sub_value}><Item item={column.value}/></TableColumn>
        ))}>
          {props.items.filter(row => row.type !== 'deleted').map(row => (
            <TableCell>{row.items.map(column => (
              <TableColumn sub={column.sub_value}><Item item={column.value}/></TableColumn>
            ))}</TableCell>
          ))}
        </Table>
      </div>
    );
  }
}

export default connect(state => ({
  state: state.admin
}))(TableComponent);