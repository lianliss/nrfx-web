import React from 'react';
import Wrapper from '../Wrapper/Wrapper';
import Block from '../Block/Block';
import Group from '../Group/Group';
import Table from '../Table/Table';
import Button from '../../../ui/components/Button/Button';
import Input from '../Input/Input';
import action from '../../../actions/admin/index';
import List from '../../../ui/components/List/List';
import Tabs from '../Tabs/Tabs';
import Message from '../../../ui/components/Message/Message';
import ActionSheet from '../../../ui/components/ActionSheet/ActionSheet';

const Item = ({item}) => {
  let Component = null;

  if (typeof item !== 'object') {
    return <p>{item}</p>;
  }

  const handleClick = item.params && item.params.action ? () => {
    action(item.params.action);
  } : null;

  switch (item.type) {
    case 'wrapper':
      Component = Wrapper;
      break;
    case 'block':
      Component = Block;
      break;
    case 'list':
      Component = List;
      break;
    case 'group':
      Component = Group;
      break;
    case 'table':
      Component = Table;
      break;
    case 'action_sheet':
      Component = () => (
        <ActionSheet position="left" items={item.items.map(item => ({
          title: item.title,
          type: item.action_type,
          onClick: () => action(item.params.action)
        }))}/>
      );
      break;
    case 'button':
      Component = () => <Button onClick={handleClick} children={item.title} />;
      break;
    case 'input':
      Component = Input;
      break;
    case 'tabs':
      Component = Tabs;
      break;
    default:
      Component = props => <Message type="error">Error item type [{props.type}]</Message>;
      break;
  }

  return <Component {...item}>{item.items && item.items.map(item => {
    return <Item item={item} />
  })}</Component>
}

export default Item;