import "./ReferPercent.less";

import React from "react";
import * as UI from "src/ui";
import _ from 'lodash';
import web3Backend from 'services/web3-backend';

const MAXIMAL_PERCENT = 30;

class ReferPercent extends React.PureComponent {

  render() {
    const {updateProfile} = this.props;
    const referPercent = _.get(this.props, 'referPercent', 5);
    const agentPercent = MAXIMAL_PERCENT - referPercent;

    return <div className="ReferPercent Content_box">
      <h3>
        Мы выплачиваем 30% от нашей прибыли
      </h3>
      <p>
        Сами выберите, сколько получите вы, а какая скидка будет у ваших партнёров
      </p>
      <div className="ReferPercent__buttons">
        {[5, 10, 15, 20, 25,].map(value => <UI.Button key={value}
                                                      type={value === agentPercent
                                                        ? 'default'
                                                        : 'secondary'}
                                                      className="small"
                                                      onClick={() => {
                                                        const referPercent = MAXIMAL_PERCENT - value;
                                                        updateProfile({
                                                          referPercent,
                                                        });
                                                        web3Backend.setReferPercent(referPercent);
                                                      }}
        >
          {value}%
        </UI.Button>)}
      </div>
      <div className="ReferPercent__partner">
        Скидка партнёра {referPercent}%
      </div>
    </div>
  };
}

export default ReferPercent;
