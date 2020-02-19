import './BankLogo.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import PropTypes from 'prop-types';

const BankLogo = props => {
  const logos = {
    bni: require('src/asset/banks/bni.svg'),
    bri: require('src/asset/banks/bri.svg'),
    mandiri: require('src/asset/banks/mandiri.svg'),
    permata: require('src/asset/banks/permata.svg'),
  };

  const logo = logos[props.name];

  return (

    <div className="BankLogo">
      {logo ? <SVG src={logo} /> : <small className="BankLogo__placeholder">{props.name}</small>}
    </div>
  )
}


BankLogo.propTypes = {
  size: PropTypes.oneOf(['bni', 'bri', 'mandiri', 'permata']),
};

export default BankLogo;
