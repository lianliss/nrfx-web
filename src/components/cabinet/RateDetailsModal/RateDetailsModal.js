import './RateDetailsModal.less';

import React from 'react';
import UI from '../../../ui';
import * as utils from "../../../utils";
import SVG from 'react-inlinesvg';

export default class RateDetailsModal extends React.Component {
  render() {
    const { plans } = this.props.params;
    return (
      <UI.Modal isOpen={true} onClose={() => {this.props.close()}}>
        <UI.ModalHeader>{utils.getLang('cabinet_rateDetailsModal_title')}</UI.ModalHeader>
        <div className="RateDetailsModal">
          <div className="RateDetailsModal__lists">
            <div className="RateDetailsModal__lists__list">
              <h3>{utils.getLang('cabinet_rateDetailsModal_static')}</h3>
              <div className="RateDetailsModal__lists__item">
                <SVG src={require("../../../asset/24px/bar-chart.svg")} />
                {utils.getLang('cabinet_rateDetailsModal_static_staticText1')}
              </div>
              <div className="RateDetailsModal__lists__item">
                <SVG src={require("../../../asset/24px/percent.svg")} />
                <div>
                  {utils.getLang('cabinet_rateDetailsModal_static_staticText2')}
                  <ul>
                    {plans.map( (plan, i) => (
                      <li>«{plan.description}» + {plan.percent} %{(plans.length === i+1) ? "." : ";"}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="RateDetailsModal__lists__item">
                <SVG src={require("../../../asset/24px/withdraw.svg")} />
                {utils.getLang('cabinet_rateDetailsModal_static_staticText3')}
              </div>
            </div>
            <div className="RateDetailsModal__lists__list">
              <h3>{utils.getLang('cabinet_rateDetailsModal_dynamic')}</h3>
              <div className="RateDetailsModal__lists__item">
                <SVG src={require("../../../asset/24px/bar-chart.svg")} />
                {utils.getLang('cabinet_rateDetailsModal_dynamicText1')}
              </div>
              <div className="RateDetailsModal__lists__item">
                <SVG src={require("../../../asset/24px/withdraw.svg")} />
                {utils.getLang('cabinet_rateDetailsModal_dynamicText2')}
              </div>
            </div>
          </div>
          <div className="RateDetailsModal__button_wrapper">
            <UI.Button onClick={() => {this.props.close()}}>{utils.getLang('site__goBack')}</UI.Button>
          </div>
        </div>
      </UI.Modal>
    )
  }
}