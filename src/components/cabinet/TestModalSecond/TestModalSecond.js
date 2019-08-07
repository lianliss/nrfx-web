import React from 'react';
import UI from '../../../ui';

export default class TestModalSecond extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <UI.ModalHeader>
          Header 2
        </UI.ModalHeader>
        <div>
          <UI.Button onClick={() => this.props.openModalPage('third')}>
            Открыть окно 3
          </UI.Button>
        </div>
      </div>
    )
  }
}
