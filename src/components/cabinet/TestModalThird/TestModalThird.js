import React from 'react';
import UI from '../../../ui';

export default class TestModalThird extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <UI.ModalHeader>
          Header 3
        </UI.ModalHeader>
        <div>
          <UI.Button onClick={() => this.props.close()}>
            Закрыть
          </UI.Button>
        </div>
      </div>
    )
  }
}
