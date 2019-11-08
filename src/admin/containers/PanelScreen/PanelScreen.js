import React from 'react';
import { connect } from 'react-redux';
import router from '../../../router';

import action from '../../../actions/admin';
import Item from '../../components/Item/Item';

class PanelScreen extends React.Component {
  render() {
    return (
      <div className="PanelScreen">
        {this.props.layout.map(item => (
          <Item item={item} />
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    layout: state.admin.layout,
    user: state.default.profile.user
  })
)(PanelScreen);