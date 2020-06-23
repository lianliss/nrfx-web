import "./Advantages.less";

import React from "react";
import SVG from "react-inlinesvg";

export default () => {
  return (
    <div className="Advantages LandingWrapper__block">
      <div className="LandingWrapper__content Advantages__content">
        <h2>Преимущества</h2>
        <ul>
          <li>
            <SVG src={require("./assets/safe_vault.svg")} />
            <h4>Безопасное хранение</h4>
            <p>
              Мы храним подавляющее большинство цифровых активов в безопасном
              автономном хранилище
            </p>
          </li>
          <li>
            <SVG src={require("./assets/legality.svg")} />
            <h4>Легальность</h4>
            <p>Полностью легальная компания с финансовой лицензией в...?</p>
          </li>
          <li>
            <SVG src={require("./assets/safe_vault.svg")} />
            <h4>Надежность</h4>
            <p>Многоуровневая и многокластерная системная архитектура</p>
          </li>
          <li>
            <SVG src={require("./assets/fee.svg")} />
            <h4>Низкие комиссии</h4>
            <p>
              Благодаря оптимизации бизнес–процессов мы добились снижения
              комиссий
            </p>
          </li>
          <li>
            <SVG src={require("./assets/safety.svg")} />
            <h4>Безопасность</h4>
            <p>
              Мы уделяем особое внимание вопросу безопасности и постоянно
              добавляем новые уровни защиты
            </p>
          </li>
          <li>
            <SVG src={require("./assets/support.svg")} />
            <h4>Поддержка 24/7</h4>
            <p>
              Есть проблема? Просто свяжитесь с нами. Наша служба поддержки
              доступна 24/7
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
