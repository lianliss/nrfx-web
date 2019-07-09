import './CookieUsage.less';

import React from 'react';

import UI from '../../../ui';
import * as storage from '../../../services/storage';


function CookieUsage(props) {
  const [isOpen, toggleOpen] = React.useState(true);

  const handleAgree = () => {
    storage.setItem('acceptedCookies', true);
    toggleOpen(false);
  }

  if (isOpen) {
    return (
      <div className="CookieUsage">
        <h3 className="CookieUsage__title">Cookies on BitcoinBot</h3>
        <p className="CookieUsage__text">
          Мы используем куки-файлы, чтобы делать сайт еще удобней, анализировать его посещаемость, персонализировать контент, а также демонстрировать адресную рекламу. Узнайте о том, как мы используем куки-файлы и как вы можете их контролировать, из нашей 
          <span> Политики конфиденциальности</span>.
          Продолжая пользоваться этим сайтом, вы соглашаетесь на использование нами куки-файлов.
        </p>
        <UI.Button onClick={handleAgree}>Хорошо, я согласен</UI.Button>
      </div>
    )
  }

  return null;
}

export default CookieUsage;