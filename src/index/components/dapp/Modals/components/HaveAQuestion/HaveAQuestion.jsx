import React from 'react';

// Components
import { Button } from 'src/ui';

// Utils
import _ from 'lodash';

// Styles
import './HaveAQuestion.less';

function HaveAQuestion() {
  const [intercomIsVisible, setIntercomIsVisible] = React.useState(false);
  const [isListener, setIsListener] = React.useState(false);

  const addListenersToIntercom = () => {
    // if listener is added
    // or Intercom is not defined
    if (isListener) return;
    if (!_.isFunction(window.Intercom)) return;

    window.Intercom('onShow', () => {
      setIntercomIsVisible(true);
    });

    window.Intercom('onHide', () => {
      setIntercomIsVisible(false);
    });

    // Add listeners to Intercom
    setIsListener(true);
  };

  const chatToggler = () => {
    if (!_.isFunction(window.Intercom)) return;

    // Hide intercom chat if visible
    if (intercomIsVisible) {
      window.Intercom('hide');
      setIntercomIsVisible(false);

      return;
    }

    // Show intercome chat
    window.Intercom('show');
    setIntercomIsVisible(true);
  };

  const chatHandler = () => {
    chatToggler();
    addListenersToIntercom();
  };

  return (
    <div className="HaveAQuestion">
      <p className="HaveAQuestion__title">
        <em>
          If the funds are not received within 30 minutes, contact the buyer
          via:
        </em>
      </p>
      <div className="HaveAQuestion__button">
        <a href="https://t.me/NarfexExchange" target="_blank">
          <Button size="middle" type="secondary-alice" shadow>
            Telegram
          </Button>
        </a>
      </div>
      <div className="HaveAQuestion__button">
        <Button
          size="middle"
          type="secondary-alice"
          shadow
          onClick={chatHandler}
        >
          Online chat
        </Button>
      </div>
    </div>
  );
}

export default HaveAQuestion;
