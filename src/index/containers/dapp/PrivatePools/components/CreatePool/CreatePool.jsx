import React from 'react';
import PropTypes from 'prop-types';
import {Web3Context} from "services/web3Provider";
import wei from 'utils/wei';

// Components
import * as UI from 'src/ui';

// Utils
import { steps } from '../../constants/steps';

// Styles
import './CreatePool.less';

function CreatePool({ setStep, setPoolAddress, deletePoolAddress, poolAddress }) {
  const context = React.useContext(Web3Context);
  const {
    web3, transaction, getTransactionReceipt, network, accountAddress,
    getContract,
  } = context;
  const { saleFactory } = network.contractAddresses;
  const [value, setValue] = React.useState('');
  const [isCreated, setIsCreated] = React.useState(false);
  const [isProcess, setIsProcess] = React.useState(false);

  const amount = Number(value) || 0;

  const inputHandler = newValue => {
    let value = `${newValue}`;
    if (value.length >= 2 && value[0] === '0' && value[1] !== '.') {
      value = _.trimStart(value, '0');
    }
    if (!_.isNaN(Number(value)) || value === '.') {
      setValue(newValue);
    }
  };

  const createPoolTransaction = async () => {
    try {
      setIsProcess(true);
      const contract = getContract(
        require('src/index/constants/ABI/saleFactory'),
        saleFactory
      );
      //const result = await contract.methods.getPoolsCount().call();
      // const result = await contract.methods.createPool(wei.to(amount)).send({from: accountAddress});
      // console.log('[createPoolTransaction]', result);
      try {
        const txHash = await transaction(contract, 'createPool', [wei.to(amount)]);
        const receipt = await getTransactionReceipt(txHash);
        console.log('[createPoolTransaction]', txHash, receipt);
      } catch (error) {
        if (error.message.indexOf('You can create a pool only once') >= 0) {
          console.warn('[createPoolTransaction] Pool already created before.');
        } else {
          throw error;
        }
      }
      const pool = await contract.methods.pools(accountAddress).call();
      console.log('[createPoolTransaction] Pool address', pool);
      setIsCreated(true);
      setPoolAddress(pool.poolAddress);
    } catch (error) {
      console.error('[createPoolTransaction]', error);
    }
    setIsProcess(false);
  };

  return (
    <div className="PrivatePools__CreatePool">
      {poolAddress ? (
        <div>
          <h3>Pool Address:</h3>
          <UI.CopyText
            className="PrivatePools__address"
            text={poolAddress}
          ></UI.CopyText>
          <p className="default-text">
            Save and share your pool address with friends
          </p>
        </div>
      ) : (
        <>
          <div className="row">
            <label>
              <span>Pool amount BUSD (30k-100k)</span>
              <UI.Input
                disabled={isProcess}
                placeholder="Pool amount"
                value={value}
                onTextChange={inputHandler}
              />
            </label>
          </div>
          <div className="row">
            <UI.Button
              type="lightBlue"
              disabled={!amount}
              state={isProcess ? 'loading' : ''}
              onClick={createPoolTransaction}
            >
              Create pool
            </UI.Button>
          </div>
        </>
      )}
      <div className="row">
        <UI.Button
          type="secondary"
          onClick={() => {
            if (isCreated) {
              setStep(steps.information);
            } else {
              setStep(steps.main);
            }
          }}
        >
          {isCreated ? 'Information' : 'Back'}
        </UI.Button>
      </div>
    </div>
  );
}

CreatePool.propTypes = {
  setStep: PropTypes.func,
  setPoolAddress: PropTypes.func,
  poolAddress: PropTypes.string,
};

CreatePool.defaultProps = {
  setStep: () => {},
  setPoolAddress: () => {},
  poolAddress: null,
};

export default CreatePool;
