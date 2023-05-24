import React from 'react';
import { Web3Context } from 'services/web3Provider';
import { useDispatch, useSelector } from 'react-redux';
import wei from 'utils/wei';
import { toastPush } from 'src/actions/toasts';
import defaultAnswer from '../../constants/defaultAnswer';
import { dappP2PKYCSelector } from 'src/selectors';
import _ from 'lodash';

// Component
import Column from '../Column/Column';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import InputColumn from '../InputColumn/InputColumn';
import { Col, Row, Input, Button, RadioGroup, Radio } from 'ui';
import { Select } from 'dapp';
import CheckBox from '../../../../../../ui/components/CheckBox/CheckBox';

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

function AddBankAccount({banksList, addBankAccount}) {
  const kyc = useSelector(dappP2PKYCSelector);
  const banksOptions = banksList.map(b => ({
    value: b.code, label: b.title,
  }));
  const [bankCode, setBankCode] = React.useState(null);
  const [type, setType] = React.useState('card');
  const [holder, setHolder] = React.useState(_.get(kyc, 'name', ''));
  const [account, setAccount] = React.useState('');
  const [isProcess, setIsProcess] = React.useState(false);
  const [bankName, setBankName] = React.useState('');
  
  let accountTitle;
  switch (type) {
    case 'account': accountTitle = 'Account number'; break;
    case 'card':
    default:
      accountTitle = 'Card number';
  }
  const isCustomBank = bankCode === 'BankTransfer';
  
  return <>
  <Row className="security-options">
    <Column>
      <ColumnTitle title="Type" description={defaultAnswer} />
      <RadioGroup selected={type} onChange={setType}>
        <Radio size="small" type="light-blue" value="card">
          Credit/Debit card number
        </Radio>
        <Radio size="small" type="light-blue" value="account">
          Account number
        </Radio>
      </RadioGroup>
    </Column>
    <Column>
      <ColumnTitle title="Bank" />
      <Select
        value={bankCode}
        onChange={setBankCode}
        options={banksOptions}
        type="simple"
        indicatorIcon={require('src/asset/icons/arrows/form-dropdown.svg')}
      />
    </Column>
  </Row>
  <Row className="security-options">
    {isCustomBank && <InputColumn
      title="Bank"
      description={defaultAnswer}
      placeholder={""}
      indicator=""
      value={bankName}
      onChange={setBankName}
    />}
    <InputColumn
      title="Holder name"
      description={defaultAnswer}
      placeholder={_.get(kyc, 'name', 'Hideo Kojima')}
      indicator=""
      value={holder}
      onChange={setHolder}
    />
    <InputColumn
      title={accountTitle}
      description={defaultAnswer}
      placeholder="0"
      indicator=""
      value={account}
      onChange={setAccount}
      type="number"
    />
  </Row>
  <Row>
    <Column className="right bottom">
      <Button
        state={isProcess ? "loading" : ''}
        disabled={isProcess}
        onClick={async () => {
          setIsProcess(true);
          const data = {
            type,
            holder,
            account,
            code: bankCode,
          };
          if (bankName) {
            data.bankName = bankName;
          }
          await addBankAccount(data);
          setIsProcess(false);
        }}
      >
        Add account
      </Button>
    </Column>
  </Row>
  </>;
}

function SecurityOptions({offer, setLastUpdate}) {
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
  
  const [banksList, setBanksList] = React.useState([]);
  const [_isKYCRequired, setIsKYCRequired] = React.useState(isKYCRequired);
  const [isProcess, setIsProcess] = React.useState(false);
  const {symbol} = fiat;
  
  React.useEffect(() => {
    backendRequest({
      currency: symbol,
    }, ``, 'offers/banks', 'get').then(data => {
      console.log('BANKS', data);
      setBanksList(data);
    }).catch(error => {
      console.error('[getBanks]', error);
    })
  }, [symbol]);
  
  const addBankAccount = async data => {
    const {p2p} = network.contractAddresses;
    if (!p2p) return;
  
    try {
      const contract = isBuy
        ? new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/buy'),
          offerAddress,
        )
        : new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/sell'),
          offerAddress,
        );
      const tx = await transaction(contract, 'addBankAccount', [JSON.stringify(data)]);
      console.log('transaction hash', tx, getBSCScanLink(tx), [JSON.stringify(data)]);
      const receipt = await getTransactionReceipt(tx);
      console.log('transaction receipt', receipt);
      dispatch(toastPush(
        `Offer updated`));
      setLastUpdate(Date.now());
    } catch (error) {
      console.error('[addBankAccount]', error);
    }
  };
  
  const updateKYC = async value => {
    const {p2p} = network.contractAddresses;
    if (!p2p) return;
    
    try {
      const contract = isBuy
        ? new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/buy'),
          offerAddress,
        )
        : new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/sell'),
          offerAddress,
        );
      const tx = await transaction(contract, 'setKYCRequirement', [value]);
      console.log('transaction hash', tx, getBSCScanLink(tx), [value]);
      const receipt = await getTransactionReceipt(tx);
      console.log('transaction receipt', receipt);
      dispatch(toastPush(
        `Offer updated`));
      setIsKYCRequired(value);
    } catch (error) {
      console.error('[updateKYC]', error);
    }
  };
  
  const clearBankAccount = async index => {
    const {p2p} = network.contractAddresses;
    if (!p2p) return;
  
    setIsProcess(true);
    try {
      const contract = isBuy
        ? new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/buy'),
          offerAddress,
        )
        : new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/sell'),
          offerAddress,
        );
      const tx = await transaction(contract, 'clearBankAccount', [index]);
      console.log('transaction hash', tx, getBSCScanLink(tx), [index]);
      const receipt = await getTransactionReceipt(tx);
      console.log('transaction receipt', receipt);
      dispatch(toastPush(
        `Bank account cleared`));
      setLastUpdate(Date.now());
    } catch (error) {
      console.error('[clearBankAccount]', error);
    }
    setIsProcess(false);
  };
  
  return (
    <Col className="more-information">
      <div className="more-information__item">
      <h2>Bank accounts</h2>
      <Row className="security-options">
        <Column>
          <ColumnTitle
            title="Client KYC verification"
            description={defaultAnswer}
          />
          <CheckBox checked={_isKYCRequired}
                    onChange={updateKYC}
                    type="simple">Required</CheckBox>
        </Column>
      </Row>
      {!!bankAccounts.length && <>
        {bankAccounts.map((data, index) => {
          let parsed;
          try {
            parsed = JSON.parse(data);
          } catch (error) {
            parsed = {};
          }
          
          const {type, holder, account, bankName, code} = parsed;
          if (!type) return <></>;
          
          const bank = banksList.find(b => b.code === code);
          let accountTitle;
          switch (type) {
            case 'account': accountTitle = 'Account number'; break;
            case 'card':
            default:
              accountTitle = 'Card number';
          }
          return <Row className="security-options" key={index}>
            <Column>
              <ColumnTitle
                title={accountTitle}
              />
              {account}
            </Column>
            <Column>
              <ColumnTitle
                title="Holder"
              />
              {holder}
            </Column>
            {!!bankName
              ? <Column>
                <ColumnTitle
                  title="Bank Name"
                />
                Bank Transfer: {bankName}
              </Column>
              : <Column>
                <ColumnTitle
                  title="Bank Name"
                />
                {_.get(bank, 'title', '')}
              </Column>}
            <Column>
              <Button
                state={isProcess ? "loading" : ''}
                disabled={isProcess}
                onClick={() => {
                  clearBankAccount(index);
                }}
              >
                Delete
              </Button>
            </Column>
          </Row>
        })}
      </>}
      <h2>Add new bank account</h2>
      <AddBankAccount addBankAccount={addBankAccount} banksList={banksList} />
      </div>
    </Col>
  );
}

export default SecurityOptions;
