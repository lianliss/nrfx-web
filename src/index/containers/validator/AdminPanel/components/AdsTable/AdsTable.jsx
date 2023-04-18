import React from 'react';

import CabinetTable, { TR, TD } from 'dapp/CabinetTable/CabinetTable';
import { CustomButton } from 'dapp';
import { Col, Row } from 'ui';
import SVG from 'utils/svg-wrap';

import styles from './AdsTable.module.less';
import PaymentItem from 'src/index/components/p2p/components/PaymentItem';

const IconButton = ({ icon, onClick }) => (
  <CustomButton className={styles.AdsTable__action__button} onClick={onClick}>
    <SVG src={icon} flex />
  </CustomButton>
);

const AdsTable = (props) => {
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
        <TR>
          <TD>
            <Col>
              <span className={styles.cutText}>24868475625292182139</span>
              <span className="green-color">BUY</span>
              <span>USDT / UAH</span>
            </Col>
          </TD>
          <TD>
            <Col>
              <span>100.00</span>
              <span>0.00</span>
              <span>500.00-600.00 UAH</span>
            </Col>
          </TD>
          <TD>
            <Col>
              <span>30.92</span>
              <span>- -</span>
            </Col>
          </TD>
          <TD>
            <Col>
              <PaymentItem title="Privat Bank" />
              <PaymentItem title="Privat Monobank bank text" />
              <PaymentItem title="Privat Bank" />
            </Col>
          </TD>
          <TD>
            <Col>
              <Col>
                <span>2023-04-04</span>
                <span>05:03:59</span>
              </Col>
              <Col>
                <span>2023-04-04</span>
                <span>05:03:59</span>
              </Col>
            </Col>
          </TD>
          <TD className={styles.TD__published}>
            <span className="green-color">Published</span>
          </TD>
          <TD>
            <Row gap={12}>
              <IconButton
                icon={require('src/asset/icons/action/download.svg')}
              />
              <IconButton
                icon={require('src/asset/icons/action/edit-pencil.svg')}
              />
              <IconButton
                icon={require('src/asset/icons/action/copy-plus.svg')}
              />
              <IconButton
                icon={require('src/asset/icons/action/close-circle.svg')}
              />
            </Row>
          </TD>
        </TR>
      </CabinetTable>
    </div>
  );
};

export default AdsTable;
