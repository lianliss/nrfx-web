import React from 'react';
import { Web3Context } from 'services/web3Provider';
import { useDispatch, useSelector } from 'react-redux';
import wei from 'utils/wei';
import { toastPush } from 'src/actions/toasts';

// Components
import { Col, Row, Input, Button } from 'ui';
import { Select } from 'dapp';
import InputColumn from '../InputColumn/InputColumn';
import OpeningHours from '../OpeningHours/OpeningHours';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import Column from '../Column/Column';

// Utils
import defaultAnswer from '../../constants/defaultAnswer';

const processError = (error) => {
  const { message } = error;
  try {
    if (message.indexOf('Internal JSON-RPC error.') >= 0) {
      const internal = JSON.parse(message.split('Internal JSON-RPC error.')[1]);
      return internal.message;
    } else {
      return message;
    }
  } catch (err) {
    console.error('ERRR', err);
    return message;
  }
};

function MoreInformation({offer, setLastUpdate}) {
  const context = React.useContext(Web3Context);
  const dispatch = useDispatch();
  const {
    accountAddress,
    chainId,
    getFiatsArray,
    getWeb3,
    network,
    getBSCScanLink,
    getTransactionReceipt,
    transaction,
    backendRequest,
  } = context;
  const {
    fiat,
    offerAddress,
    owner,
    isBuy,
    isActive,
    commission,
    totalCommission,
    minTrade,
    maxTrade,
    schedule,
    isKYCRequired,
    bankAccounts,
    cache,
  } = offer;
  const {symbol} = fiat;
  const terms = _.get(JSON.parse(_.get(cache, 'settings', '{}')), 'terms', '');
  console.log('cache', cache, terms);
  
  const [_schedule, setSchedule] = React.useState(schedule);
  const [_commission, setCommission] = React.useState(commission * 100);
  const [_minTrade, setMinTrade] = React.useState(minTrade);
  const [_maxTrade, setMaxTrade] = React.useState(maxTrade);
  const [errorText, setErrorText] = React.useState(null);
  const [isProcess, setIsProcess] = React.useState(false);
  const [_terms, setTerms] = React.useState(terms);
  
  React.useEffect(() => {
    setSchedule(schedule);
    setCommission(commission * 100);
    setMinTrade(minTrade);
    setMaxTrade(maxTrade);
    setTerms(terms);
  }, [schedule, commission, minTrade, maxTrade, terms]);
  
  const _totalCommission = (totalCommission * 100) - (commission * 100) + Number(_commission);
  
  const isChanged = _commission !== commission * 100
    || _minTrade !== minTrade
    || _maxTrade !== maxTrade
    || _schedule !== schedule;
  
  const onSave = async () => {
    const {p2p} = network.contractAddresses;
    if (!p2p) return;
  
    if (isChanged) {
      const contract = isBuy
        ? new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/buy'),
          offerAddress,
        )
        : new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/sell'),
          offerAddress,
        );
      const params = [
        wei.to(Number(_commission) / 100, 4),
        wei.to(_minTrade, fiat.decimals),
        wei.to(_maxTrade, fiat.decimals),
        _schedule,
      ];
      const tx = await transaction(contract, 'setSettings', params);
      backendRequest({
        offerAddress
      }, null, 'offers/update', 'post');
    }
    console.log('_terms', _terms);
    if (terms !== _terms) {
      backendRequest({
        offerAddress,
        terms: _terms,
      }, null, 'offers/terms', 'post');
    }
    if (isChanged) {
      console.log('transaction hash', tx, getBSCScanLink(tx), params);
      const receipt = await getTransactionReceipt(tx);
      console.log('transaction receipt', receipt);
    }
    dispatch(toastPush(
      `Offer updated`));
    setLastUpdate(Date.now());
    try {
      setErrorText(null);
      setIsProcess(true);
    } catch (error) {
      console.error('[onSave]', error);
      setErrorText(processError(error));
    }
    setIsProcess(false);
  };
  
  return (
    <>
      <h2>Main information</h2>
      <Col className="more-information">
        <div className="more-information__item">
          <Row className="ValidatorTradeForm-row">
            <InputColumn
              title="Min. transaction limit"
              description={defaultAnswer}
              placeholder={minTrade}
              indicator={symbol}
              value={_minTrade}
              onChange={setMinTrade}
            />
            <InputColumn
              title="Max. transaction limit"
              description={defaultAnswer}
              placeholder={maxTrade}
              indicator={symbol}
              value={_maxTrade}
              onChange={setMaxTrade}
            />
            <InputColumn
              title="Commission"
              description={defaultAnswer}
              placeholder={commission}
              indicator="%"
              value={_commission}
              onChange={setCommission}
            />
            <Column>
              <ColumnTitle title="Total Commission" description={defaultAnswer} />
              {_totalCommission.toFixed(2)} %
            </Column>
          </Row>
        </div>
        <OpeningHours schedule={_schedule}
                      onChange={setSchedule}
                      isProcess={isProcess}
                      isChanged={isChanged || terms !== _terms}
                      onSave={onSave} />
        {!!errorText && <Row className="ValidatorTradeForm-row">
          <Column>
          {errorText}
        </Column>
        </Row>}
        <div className="more-information__item">
          <ColumnTitle title="Terms of trade" description={defaultAnswer} />
          <Input placeholder="Your text..."
                 value={_terms}
                 onTextChange={setTerms}
                 multiLine />
        </div>
      </Col>
    </>
  );
}

export default MoreInformation;
