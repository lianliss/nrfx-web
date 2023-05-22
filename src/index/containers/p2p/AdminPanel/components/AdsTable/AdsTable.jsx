import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';
import wait from 'utils/wait';
import _ from 'lodash';
import router from 'src/router';

import CabinetTable, { TR, TD } from 'dapp/CabinetTable/CabinetTable';
import { CustomButton } from 'dapp';
import { Col, Row } from 'ui';
import SVG from 'utils/svg-wrap';
import Pagination from 'src/index/components/p2p/components/UI/components/Pagination/Pagination';
import { PaymentItem } from 'src/index/components/p2p';
import { VALIDATOR_CREATE_TRADE, VALIDATOR_EDIT_TRADE } from 'src/index/constants/pages';

import styles from './AdsTable.module.less';
import testItems from './testItems';
import { classNames as cn } from 'utils';

const IconButton = ({ icon, onClick }) => (
  <CustomButton className={styles.AdsTable__action__button} onClick={onClick}>
    <SVG src={icon} flex />
  </CustomButton>
);

const AdaptiveTD = ({ title, children, value, className }) => (
  <TD className={styles.adaptiveTD}>
    <Row justifyContent="space-between">
      <span className={styles.adaptiveTD__title}>{title}</span>
      {typeof value !== undefined && (
        <span className={cn(styles.adaptiveTD__value, className)}>{value}</span>
      )}
      {children}
    </Row>
  </TD>
);

const TableRow = ({
  adaptive,
  asset,
  fiat,
  qty,
  availableAmount,
  orderLimit,
  orderType,
  adNumber,
  price,
  exchangeRate,
  paymentMethods = [],
  createTime,
  lastUpdated,
  status,
  updateOffers,
}) => {
  
  const context = React.useContext(Web3Context);
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
  const [isActivityProcess, setActivityProcess] = React.useState(false);
  
  const isActive = status !== 'Disabled';
  const onToggleActivity = async () => {
    try {
      setActivityProcess(true);
      const isBuy = orderType !== 'sell';
      const contract = isBuy
        ? new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/buy'),
          adNumber,
        )
        : new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/sell'),
          adNumber,
        );
      const tx = await transaction(contract, 'setActiveness', [
        !isActive
      ]);
      console.log('transaction hash', tx, getBSCScanLink(tx));
      const receipt = await getTransactionReceipt(tx);
      console.log('transaction receipt', receipt);
      await wait(3000);
      updateOffers();
    } catch (error) {
      console.error('[onToggleActivity]', error);
    }
    setActivityProcess(false);
  };
  
  const actionButtons = (
    <Row gap={12} className={styles.AdsTable__action__buttons}>
      <IconButton icon={require('src/asset/icons/action/download.svg')} />
      <IconButton icon={require('src/asset/icons/action/edit-pencil.svg')}
                  onClick={() => {
                    router.navigate(VALIDATOR_EDIT_TRADE, {
                      offerAddress: adNumber,
                    });
                  }} />
      <IconButton icon={require('src/asset/icons/action/copy-plus.svg')} />
      <IconButton icon={
        isActivityProcess ?
          require(`src/ui/asset/spinner.svg`)
          : isActive
            ? require('src/asset/icons/action/close-circle.svg')
            : require('src/asset/icons/action/play-circle.svg')
      } onClick={onToggleActivity} />
    </Row>
  );

  if (adaptive) {
    return (
      <TR className={styles.adaptiveTR}>
        <TD>
          <Row gap={16}>
            <span className="green-color">{orderType.toUpperCase()}</span>
            <span className={styles.cutText}>{adNumber}</span>
          </Row>
        </TD>
        <AdaptiveTD title="Asset/Fiat" value={`${asset}/${fiat}`} />
        <AdaptiveTD title="Completed Trade QTY." value={qty} />
        <AdaptiveTD title="Available Amount" value={availableAmount} />
        <AdaptiveTD title="Price" value={price} />
        <AdaptiveTD title="Exchange Rate" value={exchangeRate} />
        <AdaptiveTD title="Payment Method">
          <Col gap={8} alignItems="flex-end">
            {paymentMethods.map((item, key) => (
              <PaymentItem
                title={item.title}
                color={null}
                className={styles.paymentItem}
                key={key}
              />
            ))}
          </Col>
        </AdaptiveTD>
        <AdaptiveTD title="Status" value={status} className="green-color" />
        <AdaptiveTD
          title="Create Time:"
          value={`${createTime.date} ${createTime.time}`}
        />
        <AdaptiveTD
          title="Last Updated"
          value={`${lastUpdated.date} ${lastUpdated.time}`}
        />
        <AdaptiveTD title="Actions">{actionButtons}</AdaptiveTD>
      </TR>
    );
  }

  return (
    <TR>
      <TD>
        <Col>
          <span className={styles.cutText}>{adNumber}</span>
          <span className={orderType === 'buy' ? 'green-color' : 'red-color'}>{orderType.toUpperCase()}</span>
          <span>
            {asset} / {fiat}
          </span>
        </Col>
      </TD>
      <TD>
        <Col>
          <span>{availableAmount}</span>
          <span>{qty}</span>
        </Col>
      </TD>
      <TD>
        <Col>
          <span>{price}%</span>
          <span>{exchangeRate}%</span>
        </Col>
      </TD>
      <TD>
        <Col>
          {paymentMethods.map((paymentMethod, key) => (
            <PaymentItem title={paymentMethod.title} key={key} />
          ))}
        </Col>
      </TD>
      <TD>
        <Col>
          <Col>
            <span>{createTime.date}</span>
            <span>{createTime.time}</span>
          </Col>
          <Col>
            <span>{lastUpdated.date}</span>
            <span>{lastUpdated.time}</span>
          </Col>
        </Col>
      </TD>
      <TD className={styles.TD__published}>
        <span className={
          isActive
            ? 'green-color'
            : 'red-color'
        }>{status}</span>
      </TD>
      <TD>{actionButtons}</TD>
    </TR>
  );
};

const AdsTable = ({ adaptive }) => {
  const context = React.useContext(Web3Context);
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
  
  const [offers, setOffers] = React.useState([]);
  const updateOffers = () => {
    const {p2p} = network.contractAddresses;
    if (!p2p || !accountAddress) return;
  
    const fiatsAddresses = {};
    const fiatsSymbols = {};
    getFiatsArray().map(fiat => {
      fiatsAddresses[fiat.symbol] = fiat.address;
      fiatsSymbols[fiat.address] = fiat.symbol;
    });
  
    backendRequest({}, null, 'offers/validator', 'get').then(data => {
      console.log('VALIDATOR OFFERS', data);
      setOffers(data.map(offer => {
        let settings = {};
        try {
          settings = JSON.parse(offer.settings);
        } catch (error) {
        
        }
        return {
          adaptive,
          fiat: fiatsSymbols[offer.currency],
          qty: 0,
          availableAmount: offer.maxTrade,
          orderLimit: {
            start: offer.minTrade,
            end: offer.maxTrade,
          },
          orderType: offer.side,
          adNumber: offer.address,
          price: offer.commission * 100,
          exchangeRate: offer.commission * 100,
          paymentMethods: _.get(settings, 'banks', []),
          createTime: {
            date: (new Date(offer.created * 1000)).toLocaleDateString(),
            time: (new Date(offer.created * 1000)).toLocaleTimeString(),
          },
          lastUpdated: {
            date: (new Date(offer.updated * 1000)).toLocaleDateString(),
            time: (new Date(offer.updated * 1000)).toLocaleTimeString(),
          },
          status: offer.isActive ? 'Active' : 'Disabled',
        }
      }));
    }).catch(error => {
      console.error('[AdsTable]', error);
    });
  };
  React.useEffect(() => {
    updateOffers();
  }, [chainId, accountAddress]);
  
  
  return (
    <div className={styles.AdsTable}>
      <CabinetTable
        header={
          <TR>
            <TD>Ad Number Type Asset/Fiat</TD>
            <TD>Current trades</TD>
            <TD>Commission</TD>
            <TD>Payment Method</TD>
            <TD>Last Updated Create Time</TD>
            <TD>Status</TD>
            <TD>Actions</TD>
          </TR>
        }
        type="column"
      >
        {offers.map((item) => (
          <TableRow {...item} key={item.adNumber} updateOffers={updateOffers} adaptive={adaptive} />
        ))}
      </CabinetTable>
      <Pagination style={{ marginTop: 30 }} />
    </div>
  );
};

export default AdsTable;
