import './CabinetChangeEmail.less';
import React from 'react';
import UI from '../../../ui';
import { withRouter } from 'react-router5';
import { GetParamsContext } from '../../../contexts';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import apiSchema from '../../../services/apiSchema';
import * as api from "../../../services/api";
import * as storeUtils from "../../../storeUtils";
import * as CLASSES from "../../../constants/classes";
import * as pages from '../../../constants/pages';

class CabinetChangeEmail extends React.PureComponent {
  state = {
    success: null,
    pending: true,
    message: "You have successfully changed your email!"
  }

  componentDidMount() {
    const { params } = this.context;
    api.call(apiSchema.Profile.ConfirmEmailPost, params).then(() => {
      this.setState({success: true, pending: false});
    }).catch((err) => {
      this.setState({pending: false, message: err.message});
    })
  }

  static contextType = GetParamsContext;

  render() {
    if (this.state.pending) {
      return <LoadingStatus status="loading" />
    }
    return (
      <div className="CabinetChangeEmail">
        <div className="CabinetChangeEmail__content Content_box">
          {this.state.success && <div className="CabinetChangeEmail__content__icon" style={{backgroundImage: `url(${require('../../../asset/120/success.svg')})`}} />}
          <p>{this.state.message}</p>
          <UI.Button onClick={() => this.props.router.navigate(pages.PROFILE)}>Great!</UI.Button>
        </div>
      </div>
    )
  }
}
export default withRouter(CabinetChangeEmail);