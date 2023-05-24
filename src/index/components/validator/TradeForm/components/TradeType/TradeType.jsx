import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

// Components
import { Col, Row, Radio, Input, RadioGroup, Button } from 'ui';
import { Select } from 'dapp';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import InputColumn from '../InputColumn/InputColumn';
import router from 'src/router';

// Utils
import defaultAnswer from '../../constants/defaultAnswer';
import Column from '../Column/Column';
import { Web3Context } from 'services/web3Provider';
import { dappP2PCurrencySelector, dappP2PAvailableForTradeSelector } from 'src/selectors';
import { setP2PCurrency, updateP2PAvailableForTrade } from 'src/actions/dapp/p2p';
import { toastPush } from 'src/actions/toasts';
import wei from 'utils/wei';
import { VALIDATOR_CREATE_TRADE, VALIDATOR_EDIT_TRADE } from 'src/index/constants/pages';

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
    console.log('ERRR', err);
    return message;
  }
};

function TradeType() {
  const context = React.useContext(Web3Context);
  const dispatch = useDispatch();
  const currency = useSelector(dappP2PCurrencySelector);
  const symbol = _.get(currency, 'symbol', '');
  const logo = _.get(currency, 'logoURI', '');
  const [tradeType, setTradeType] = React.useState('buy');
  const [margin, setMargin] = React.useState(0);
  const [minTradeAmount, setMinTradeAmount] = React.useState(0);
  const [maxTradeAmount, setMaxTradeAmount] = React.useState(0);
  const [isProcess, setIsProcess] = React.useState(false);
  const [errorText, setErrorText] = React.useState();
  
  const {
    accountAddress,
    chainId,
    getFiatsArray,
    getWeb3,
    network,
    getBSCScanLink,
    getTransactionReceipt,
    transaction,
  } = context;
  
  const fiatsOptions = getFiatsArray()
    .map((fiat) =>
      ({value: fiat, label: fiat.symbol})
    );
  
  React.useEffect(() => {
    if (!currency) {
      dispatch(setP2PCurrency(fiatsOptions[0].value));
    }
  }, []);
  
  const onCreate = async () => {
    const {p2p} = network.contractAddresses;
    if (!p2p) return;
    
    setErrorText(null);
    setIsProcess(true);
    try {
      const isBuy = tradeType !== 'sell';
      const factory = isBuy
        ? new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/buyFactory'),
          p2p.buyFactory,
        )
        : new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/sellFactory'),
          p2p.sellFactory,
        );
      const params = [
        currency.address,
        wei.to(margin / 100, 4),
        wei.to(minTradeAmount, currency.decimals),
        wei.to(maxTradeAmount, currency.decimals),
      ];
      if (!isBuy) {
      
      }
      const tx = await transaction(factory, 'create', params);
      console.log('transaction hash', tx, getBSCScanLink(tx));
      const receipt = await getTransactionReceipt(tx);
      console.log('transaction receipt', receipt);
      dispatch(toastPush(
        `Offer created`));
      const offers = await factory.methods.getValidatorOffers(accountAddress, '0', '0').call();
      console.log('offers', offers);
      const currentOffer = offers.find(o => o.fiatAddress === currency.address && o.isBuy === isBuy);
      console.log('current offer', currentOffer);
      if (!currentOffer) {
        throw new Error("Can't find a new offer");
      } else {
        router.navigate(VALIDATOR_EDIT_TRADE, {
          offerAddress: currentOffer.offerAddress,
        });
      }
    } catch (error) {
      console.error('onCreate', error);
      setErrorText(processError(error));
    }
    setIsProcess(false);
  };

  return (
    <>
      <h2>Trade type</h2>
      <Row className="ValidatorTradeForm-row trade-type">
        <Column>
          <ColumnTitle title="Currency" />
          <Select
            value={currency}
            onChange={value => dispatch(setP2PCurrency(value))}
            options={fiatsOptions}
            type="simple"
            indicatorIcon={require('src/asset/icons/arrows/form-dropdown.svg')}
          />
        </Column>
        <Column>
          <ColumnTitle title="Customers can" description={defaultAnswer} />
          <RadioGroup selected={tradeType} onChange={setTradeType}>
            <Radio size="small" type="light-blue" value="buy">
              Buy stable {symbol} for fiat
            </Radio>
            <Radio size="small" type="light-blue" disabled value="sell">
              Sell stable {symbol} for fiat
            </Radio>
          </RadioGroup>
        </Column>
        <Column />
      </Row>
      <Row className="ValidatorTradeForm-row trade-type">
        <InputColumn
          title="Commission"
          description={defaultAnswer}
          placeholder="0"
          indicator="%"
          value={margin}
          onChange={setMargin}
        />
        <InputColumn
          title="Min. transaction limit"
          description={defaultAnswer}
          placeholder="0"
          indicator={symbol}
          value={minTradeAmount}
          onChange={setMinTradeAmount}
        />
        <InputColumn
          title="Max. transaction limit"
          description={defaultAnswer}
          placeholder="0"
          indicator={symbol}
          value={maxTradeAmount}
          onChange={setMaxTradeAmount}
        />
        <Column className="right bottom">
          <Button
            state={isProcess ? "loading" : ''}
            disabled={isProcess}
            onClick={onCreate}
          >
            Create
          </Button>
        </Column>
      </Row>
      {!!errorText && <Row className="ValidatorTradeForm-row trade-type">
        <Column>{errorText}</Column>
      </Row>}
    </>
  );
}

export default TradeType;
