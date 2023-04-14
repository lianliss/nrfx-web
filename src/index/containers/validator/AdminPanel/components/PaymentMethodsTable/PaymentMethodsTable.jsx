import React from 'react';

// Components
import { Col, Row } from 'ui';
import { CustomButton } from 'dapp';
import CabinetTable, { TD, TR } from 'dapp/CabinetTable/CabinetTable';
import { PaymentItem } from 'src/index/components/p2p';

// Utils
import testPayments from '../../../../p2p/constants/testPayments';

// Styles
import styles from './PaymentMethodsTable.module.less';

/**
 * PaymentMethodType {
 *  id: string | number,
 *  name: string,
 *  payment: object,
 *  bankAccountNumber?: string,
 *  email?: string,
 *  paymentDetails?: string,
 * }
 */
const testItems = [
  {
    id: 0,
    name: 'Name Surname',
    payment: testPayments[1],
    bankAccountNumber: '12345678901',
    paymentDetails: '',
  },
  {
    id: 1,
    name: 'Name Surname',
    payment: testPayments[2],
    bankAccountNumber: '12345678901',
    paymentDetails: 'Name Surname',
  },
  {
    id: 2,
    name: 'Name Surname',
    payment: testPayments[3],
    bankAccountNumber: '12345678901',
    paymentDetails: 'Name Surname',
  },
  {
    id: 3,
    name: 'Name Surname',
    payment: testPayments[3],
    email: 'mail****@gmail.com',
    paymentDetails: 'Name Surname',
  },
  {
    id: 4,
    name: 'Name Surname',
    payment: testPayments[4],
    bankAccountNumber: '122144219',
    paymentDetails: 'Name Surname',
  },
];

const TableItem = ({ title, value, disabledTitle }) => {
  if (!value) {
    return <></>;
  }

  return (
    <Col>
      {!disabledTitle && (
        <span className={styles.PaymentMethodsTable__title}>{title}</span>
      )}
      <div className={styles.PaymentMethodsTable__value}>{value}</div>
    </Col>
  );
};

const TableFullName = ({ name }) => (
  <TableItem title="Full name" value={name} />
);

const TableBankName = ({ payment, disabledTitle }) => (
  <TableItem
    title="Bank name"
    value={<PaymentItem title={payment.title} />}
    disabledTitle={disabledTitle}
  />
);

const TableBankAccountNumber = ({ number }) => (
  <TableItem title="Bank Account Number" value={number} />
);

const TableEmail = ({ email }) => (
  <TableItem title="Email Address" value={email} />
);

const TablePaymentDetails = ({ detailsText }) => (
  <TableItem title="Payment Details" value={detailsText} />
);

const TableButtons = ({ onEdit, onDelete, onBlock }) => (
  <div className={styles.PaymentMethodsTable__buttons}>
    {onBlock && (
      <CustomButton onClick={onEdit}>
        <span className="light-blue-gradient-color">Block</span>
      </CustomButton>
    )}
    {onEdit && (
      <CustomButton onClick={onEdit}>
        <span className="light-blue-gradient-color">Edit</span>
      </CustomButton>
    )}
    {onDelete && (
      <CustomButton onClick={onDelete}>
        <span className="cool-gray-color">Delete</span>
      </CustomButton>
    )}
  </div>
);

const DesktopTR = (props) => (
  <TR>
    <TD>
      <TableFullName name={props.name} />
    </TD>
    <TD>
      <TableBankName payment={props.payment} />
    </TD>
    <TD>
      <TableEmail email={props.email} />
      <TableBankAccountNumber number={props.bankAccountNumber} />
    </TD>
    <TD>
      <TablePaymentDetails detailsText={props.paymentDetails} />
    </TD>
    <TD>
      <TableButtons onEdit={props.onEdit} onDelete={props.onDelete} />
    </TD>
  </TR>
);

const AdaptiveTR = (props) => (
  <TR>
    <TD>
      <Row alignItems="center" justifyContent="space-between">
        <TableBankName payment={props.payment} disabledTitle />
        <TableButtons onDelete={props.onDelete} onBlock={props.onBlock} />
      </Row>
    </TD>
    <TD>{props.name && <TableFullName name={props.name} />}</TD>
    <TD>
      <TableBankAccountNumber number={props.bankAccountNumber} />
      <TableEmail email={props.email} />
    </TD>
    <TD>
      {props.paymentDetails && (
        <TablePaymentDetails detailsText={props.paymentDetails} />
      )}
    </TD>
  </TR>
);

// Main component
function PaymentMethodsTable({ adaptive, items = testItems }) {
  const handleDelete = () => {};
  const handleEdit = () => {};
  const handleBlock = () => {};

  return (
    <div className={styles.PaymentMethodsTable}>
      <CabinetTable type="columnWithHeader">
        {items.map((item) => {
          const Component = adaptive ? AdaptiveTR : DesktopTR;

          return (
            <Component
              {...item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onBlock={handleBlock}
              key={item.id}
            />
          );
        })}
      </CabinetTable>
    </div>
  );
}

export default PaymentMethodsTable;
