import React from 'react';
import MainSection from './sections/Index/index';
import BotSection from './sections/Bot/Bot';


export default props => {
  const { section } = props.routerParams;

  switch (section) {
    case 'bot':
      return <BotSection {...props} />
    default:
      return <MainSection {...props} />
  }
}
