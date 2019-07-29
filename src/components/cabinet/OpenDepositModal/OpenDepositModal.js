import './OpenDepositModal.less';

import React from 'react';
import UI from '../../../ui';
import SVG from 'react-inlinesvg';

export default class OpenDepositModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectDepositType: 'static'
    };
  }

  render() {
    let typeInfoRows;
    if (this.state.selectDepositType === 'static') {
      typeInfoRows = [
        {
          label: 'Доход — равный % ежедневно',
          icon: require('../../../asset/24px/bar-chart.svg')
        },
        {
          label: 'Дополнительный бонусный %',
          icon: require('../../../asset/24px/percent.svg')
        },
        {
          label: 'Вывод — после завершения',
          icon: require('../../../asset/24px/withdraw.svg')
        }
      ];
    } else {
      typeInfoRows = [
        {
          label: 'Прогрессивный % дохода',
          icon: require('../../../asset/24px/bar-chart.svg')
        },
        {
          label: 'Снижение % дохода от частоты вывода',
          icon: require('../../../asset/24px/withdraw.svg')
        }
      ];
    }

    return (
      <UI.Modal noSpacing isOpen={true} onClose={() => window.history.back()}>
        <UI.ModalHeader>
          Open New Deposit
        </UI.ModalHeader>
        <div className="OpenDepositModal">
          <div className="OpenDepositModal__row">
            <UI.Dropdown
              placeholder={{ title: 'Bitcoin Profit', note: '20 BTC' }}
              options={[]}
              onChange={() => console.log('changed')}
            />
          </div>
          <div className="OpenDepositModal__row">
            <UI.Input
              placeholder="Amount"
              indicator="min 0.04 BTC"
            />
          </div>
          <div className="OpenDepositModal__row">
            <UI.SwitchTabs
              selected={this.state.selectDepositType}
              onChange={(selectDepositType) => this.setState({ selectDepositType })}
              tabs={[
                { value: 'static', label: 'Static' },
                { value: 'dynamic', label: 'Dynamic' }
              ]}
            />
            <div className="OpenDepositModal__type_info">
              {typeInfoRows.map((item, i) => {
                return (
                  <div className="OpenDepositModal__type_info__row" key={i}>
                    <SVG src={item.icon} />
                    {item.label}
                  </div>
                )
              })}
              <a href="#" className="OpenDepositModal__type_info__more">More</a>
            </div>
          </div>
          <div className="OpenDepositModal__row">
            <UI.Dropdown
              placeholder={{ title: 'Optimal', note: '153% 365 Days' }}
              options={[]}
              onChange={() => console.log('changed')}
            />
          </div>
          <div className="OpenDepositModal__btn_wrapper">
            <UI.Button>Invest</UI.Button>
          </div>
        </div>
      </UI.Modal>
    )
  }

  toggle = (isOpen) => this.setState({ isOpen });
}
