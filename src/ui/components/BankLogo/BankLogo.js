import './BankLogo.less';

import React from 'react';
import SVG from 'utils/svg-wrap';
import PropTypes from 'prop-types';
import { classNames as cn } from '../../utils';

const BankLogo = (props) => {
  const logos = {
    tinkoff: require('src/asset/banks/tinkoff.svg'),
    sberbank: require('src/asset/banks/sberbank.svg'),
    bankvtb: require('src/asset/banks/bankvtb.svg'),
    gazprombank: require('src/asset/banks/gazprombank.svg'),
    alfabank: require('src/asset/banks/alfabank.svg'),
    rosselkhoz: require('src/asset/banks/rosselkhoz.svg'),
    rosbank: require('src/asset/banks/rosbank.svg'),
    moscreditbank: require('src/asset/banks/moscreditbank.svg'),
    otkrytie: require('src/asset/banks/otkrytie.svg'),
    sovkombank: require('src/asset/banks/sovkombank.svg'),
    raiffaizen: require('src/asset/banks/raiffaizen.svg'),
    bca: require('src/asset/banks/bca.svg'),
    bankdbs: require('src/asset/banks/bankdbs.svg'),
    mandiri: require('src/asset/banks/mandiri.svg'),
    oub: require('src/asset/banks/oub.svg'),
    banksyariah: require('src/asset/banks/banksyariah.svg'),
    citibank: require('src/asset/banks/citibank.svg'),
    bankjago: require('src/asset/banks/bankjago.svg'),
    bcasyariah: require('src/asset/banks/bcasyariah.svg'),
    hsbc: require('src/asset/banks/hsbc.svg'),
    'bank negara indonesia': require('src/asset/banks/bank negara indonesia.svg'),
    paninbank: require('src/asset/banks/paninbank.svg'),
    bri: require('src/asset/banks/bri.svg'),
    bnc: require('src/asset/banks/bnc.svg'),
    maybank: require('src/asset/banks/maybank.svg'),
    dki: require('src/asset/banks/dki.svg'),
    ocbcnisp: require('src/asset/banks/ocbcnisp.svg'),
    cimbniaga: require('src/asset/banks/cimbniaga.svg'),
    permata: require('src/asset/banks/permata.svg'),
    jenius: require('src/asset/banks/jenius.svg'),
    btpn: require('src/asset/banks/btpn.svg'),
    monobank: require('src/asset/banks/monobank.svg'),
    privatbank: require('src/asset/banks/privatbank.svg'),
  };

  const name = props.name.toLocaleLowerCase();
  const logo = logos[name];

  return (
    <div title={name} className={cn('BankLogo', props.className)}>
      {logo ? (
        <SVG src={logo} />
      ) : (
        <small className="BankLogo__placeholder">{props.name}</small>
      )}
    </div>
  );
};

BankLogo.propTypes = {
  name: PropTypes.string,
};

export default BankLogo;
