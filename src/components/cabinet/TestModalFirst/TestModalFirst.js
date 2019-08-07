import React from 'react';
import UI from '../../../ui';

class TestModalFirst extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <UI.ModalHeader>
          Header 1
        </UI.ModalHeader>
        <div>
          <UI.Button onClick={() => this.props.openModalPage('second')}>
            Открыть окно 2
          </UI.Button>
        </div>
      </div>
    )
  }
}

export default React.memo(TestModalFirst);
