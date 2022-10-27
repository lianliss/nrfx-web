import React from 'react';

// Components
import { Button } from 'src/ui';

// Styles
import './HaveAQuestion.less';

function HaveAQuestion() {
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
        <Button size="middle" type="secondary-alice" shadow>
          Online chat
        </Button>
      </div>
    </div>
  );
}

export default HaveAQuestion;
