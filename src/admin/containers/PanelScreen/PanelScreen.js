import './PanelScreen.less';

import React from 'react';
import { connect } from 'react-redux';

import Item from '../../components/Item/Item';
import * as pages from '../../constants/pages';
import * as adminActions from '../../../actions/admin';

class PanelScreen extends React.Component {
  componentDidMount() {
    adminActions.init();
  }

  render() {
    if (this.props.router.getState().name === pages.PANEL) {
      return <div className="PanelScreen">
        <div className="PanelScreen__placeholder">Select a page in the sidebar</div>
      </div>
    }
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
