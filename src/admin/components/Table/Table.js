import './Table.less';

import React from 'react';

import Table, { TableCell, TableColumn } from '../../../ui/components/Table/Table';
import Item from '../Item/Item';
import {connect} from 'react-redux';
import * as utils from '../../../utils';
import EmptyContentBlock from '../../../index/components/cabinet/EmptyContentBlock/EmptyContentBlock';
import action, {valueChange} from '../../../actions/admin';
import Button from '../../../ui/components/Button/Button';

class TableComponent extends React.Component {
  renderSearch = () => {
    const getKey = (fieldId) => {
      return this.props.id + '_value_' + fieldId
    }

    if (!this.props.search) return false;
    return (
      <div className="Table__search">
        {this.props.search.fields.map(field => (
          <Item
            {...{...field, id: getKey(field.id) }}
            item={{type: (field.type || 'input') }}
            value={(this.props.filters.find(f => f.name === field.id) || {}).value}
          />
        ))}
        <Button onClick={() => {
          const values = {};
          this.props.search.fields.forEach(field => {
            values[field.id] = getKey(field.id);
          });
          this.props.search.action && action({
            ...this.props.search.action,
            values
          });
        }}>Search</Button>
      </div>
    )
  }

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
        {this.renderSearch()}
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
