import React from 'react';

// Components
import { Col } from 'ui';
import { CustomButton } from 'dapp';
import CabinetTable, { TD, TR } from 'dapp/CabinetTable/CabinetTable';
import { PaymentItem } from 'src/index/components/p2p';

// Styles
import styles from './PaymentMethodsTable.module.less';

function PaymentMethodsTable() {
  return (
    <div className={styles.PaymentMethodsTable}>
      <CabinetTable>
        <TR>
          <TD>
            <Col>
              <span className={styles.PaymentMethodsTable__title}>
                Full name
              </span>
              <span className={styles.PaymentMethodsTable__value}>
                Name Surname
              </span>
            </Col>
          </TD>
          <TD>
            <Col>
              <span className={styles.PaymentMethodsTable__title}>
                Bank name
              </span>
              <span className={styles.PaymentMethodsTable__value}>
                <PaymentItem title="Monobank" />
              </span>
            </Col>
          </TD>
          <TD>
            <Col>
              <span className={styles.PaymentMethodsTable__title}>
                Bank Account Number
              </span>
              <span className={styles.PaymentMethodsTable__value}>
                12345678901
              </span>
            </Col>
          </TD>
          <TD>
            <Col>
              <span className={styles.PaymentMethodsTable__title}>
                Payment Details
              </span>
              <span className={styles.PaymentMethodsTable__value}>
                Name Surname
              </span>
            </Col>
          </TD>
          <TD>
            <div className={styles.PaymentMethodsTable__buttons}>
              <CustomButton>
                <span className="light-blue-gradient-color">Edit</span>
              </CustomButton>
              <CustomButton>
                <span className="cool-gray-color">Delete</span>
              </CustomButton>
            </div>
          </TD>
        </TR>
      </CabinetTable>
    </div>
  );
}

export default PaymentMethodsTable;
