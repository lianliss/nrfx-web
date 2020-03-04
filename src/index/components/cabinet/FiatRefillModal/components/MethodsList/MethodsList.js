import './MethodsList.less';

import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import Clipboard from '../../../Clipboard/Clipboard';
import { classNames as cn } from 'src/utils/index';

export default props => {

  const [openedId, setOpenedId] = useState(null);

  const toggleItem = (id) => {
    setOpenedId(id === openedId ? null : id);
  };

  const formatRow = row => {
    return row.split(/({account_number})/).map(e => e === '{account_number}' ? <Clipboard skipIcon text={props.accountNumber} /> : e);
  };

  return (
    <div className="MethodsList">
      {props.methods.map((method, id) => (
        <div className={cn("MethodsList__item", {opened: id === openedId})} key={id}>
          <div className="MethodsList__item__title" onClick={() => toggleItem(id)}>
            <span>{method.name}</span>
            <SVG src={require('src/asset/24px/angle-down-small.svg')} />
          </div>
          <div className="MethodsList__item__content">
            <ol className="MethodsList__steps">
              {method.steps.map((step, i) => (
                <li key={i} className="MethodsList__steps__step">
                  <div className="MethodsList__steps__step__number">{i + 1}</div>
                  <span>{formatRow(step)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </div>
  );
}
