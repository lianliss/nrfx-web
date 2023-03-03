import React from 'react';
import AdaptiveList from '../AdaptiveList';
import List from '../List';

function ListWrapper({ adaptive, ...props }) {
  if (adaptive) {
    return <AdaptiveList {...props} />;
  }

  return <List {...props} />;
}

export default ListWrapper;
