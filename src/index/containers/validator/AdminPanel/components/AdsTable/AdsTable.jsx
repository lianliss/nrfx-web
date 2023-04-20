import React from 'react';
import PropTypes from 'prop-types';

import CabinetTable, { TR, TD } from 'dapp/CabinetTable/CabinetTable';
import { CustomButton } from 'dapp';
import { Col, Row } from 'ui';
import SVG from 'utils/svg-wrap';
import Pagination from 'src/index/components/p2p/components/UI/components/Pagination/Pagination';
import { PaymentItem } from 'src/index/components/p2p';

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
}) => {
  const orderLimitNumbers = `${orderLimit.start}-${orderLimit.end}`;

  const actionButtons = (
    <Row gap={12} className={styles.AdsTable__action__buttons}>
      <IconButton icon={require('src/asset/icons/action/download.svg')} />
      <IconButton icon={require('src/asset/icons/action/edit-pencil.svg')} />
      <IconButton icon={require('src/asset/icons/action/copy-plus.svg')} />
      <IconButton icon={require('src/asset/icons/action/close-circle.svg')} />
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
        <AdaptiveTD title="Order Limit" value={orderLimitNumbers} />
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
          <span className="green-color">{orderType.toUpperCase()}</span>
          <span>
            {asset} / {fiat}
          </span>
        </Col>
      </TD>
      <TD>
        <Col>
          <span>{availableAmount}</span>
          <span>{qty}</span>
          <span>{orderLimitNumbers} UAH</span>
        </Col>
      </TD>
      <TD>
        <Col>
          <span>{price}</span>
          <span>{exchangeRate}</span>
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
        <span className="green-color">{status}</span>
      </TD>
      <TD>{actionButtons}</TD>
    </TR>
  );
};

TableRow.propTypes = {
  adaptive: PropTypes.bool,
  asset: PropTypes.string,
  fiat: PropTypes.string,
  qty: PropTypes.number,
  availableAmount: PropTypes.number,
  orderLimit: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
  }),
  orderType: PropTypes.oneOf(['buy', 'sell']),
  adNumber: PropTypes.number,
  price: PropTypes.number,
  exchangeRate: PropTypes.string,
  paymentMethods: PropTypes.array,
  // Can be changed to Date type.
  createTime: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
  }),
  lastUpdated: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
  }),
  // ---
  status: PropTypes.string,
};

const AdsTable = ({ adaptive }) => {
  return (
    <div className={styles.AdsTable}>
      <CabinetTable
        header={
          <TR>
            <TD>Ad Number Type Asset/Fiat</TD>
            <TD>Total Amount Completed Trade QTY. Limit</TD>
            <TD>Price Exchange Rate</TD>
            <TD>Payment Method</TD>
            <TD>Last Updated Create Time</TD>
            <TD>Status</TD>
            <TD>Actions</TD>
          </TR>
        }
        type="column"
      >
        {testItems.map((item) => (
          <TableRow {...item} key={item.adNumber} adaptive={adaptive} />
        ))}
      </CabinetTable>
      <Pagination style={{ marginTop: 30 }} />
    </div>
  );
};

export default AdsTable;
