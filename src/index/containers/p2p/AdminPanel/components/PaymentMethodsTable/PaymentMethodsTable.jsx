import React from 'react';
import { Web3Context } from 'services/web3Provider';
import _ from 'lodash';

// Components
import { Col, Row } from 'ui';
import { CustomButton } from 'dapp';
import CabinetTable, { TD, TR } from 'dapp/CabinetTable/CabinetTable';
import { PaymentItem } from 'src/index/components/p2p';
import { Pagination } from 'src/index/components/p2p/components/UI';

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

const TableBankName = ({ title, code, bankName, disabledTitle }) => {
  console.log('TableBankName', title, code, bankName);
  return <TableItem
    title="Bank name"
    value={!!bankName ? <PaymentItem title={`${title}: ${bankName}`} /> : <PaymentItem title={title} />}
    disabledTitle={disabledTitle}
  />
};

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

const DesktopTR = (props) => {
  const {banksList} = props;
  const bank = banksList.find(b => b.code === props.code);
  return <TR>
    <TD>
      <TableFullName name={props.holder} />
    </TD>
    <TD>
      <TableBankName {...{...props, ...bank}} />
    </TD>
    <TD>
      <TableBankAccountNumber number={props.account} />
    </TD>
    {/*<TD>*/}
      {/*<TablePaymentDetails detailsText={'asd'} />*/}
    {/*</TD>*/}
    <TD>
      <TableButtons onEdit={props.onEdit} onDelete={props.onDelete} />
    </TD>
  </TR>
};

const AdaptiveTR = (props) => {
  const {banksList} = props;
  const bank = banksList.find(b => b.code === props.code);
  return <TR>
    <TD>
      <Row alignItems="center" justifyContent="space-between">
        <TableBankName {...{...props, ...bank}} />
        <TableButtons onDelete={props.onDelete} onBlock={props.onBlock} />
      </Row>
    </TD>
    <TD>{props.name && <TableFullName name={props.holder} />}</TD>
    <TD>
      <TableBankAccountNumber number={props.account} />
    </TD>
    {/*<TD>*/}
      {/*{props.paymentDetails && (*/}
        {/*<TablePaymentDetails detailsText={props.paymentDetails} />*/}
      {/*)}*/}
    {/*</TD>*/}
  </TR>
};

// Main component
function PaymentMethodsTable({ adaptive, timestamp, items = testItems }) {
  const context = React.useContext(Web3Context);
  const {getFiatsArray, accountAddress, backendRequest} = context;
  const [banksList, setBanksList] = React.useState([]);
  console.log('banksList', banksList);
  
  const key = `dh-key-${accountAddress}`;
  const [settings, setSettings] = React.useState({});
  React.useEffect(() => {
    (async () => {
      if (!accountAddress) return;
      const banksList = await backendRequest({}, ``, 'offers/banks', 'get');
      setBanksList(banksList);
      let settings;
      try {
        settings = JSON.parse(window.localStorage.getItem(key));
      } catch (error) {}
      if (!settings) {
        try {
          settings = JSON.parse(await this.backendRequest({}, ``, 'user/p2p/settings', 'get'));
        } catch (error) {
          settings = {};
        }
      }
      setSettings(settings);
    })()
  }, [accountAddress, timestamp]);
  const userBankAccounts = _.get(settings, 'bankAccounts', []);
  console.log('userBankAccounts', userBankAccounts);
  
  const handleDelete = () => {};
  const handleEdit = () => {};
  const handleBlock = () => {};

  return (
    <div className={styles.PaymentMethodsTable}>
      <CabinetTable type="columnWithHeader">
        {userBankAccounts.map((item, index) => {
          const Component = adaptive ? AdaptiveTR : DesktopTR;

          return (
            <Component
              {...item}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
              onBlock={() => handleBlock(index)}
              key={item.id}
              banksList={banksList}
            />
          );
        })}
      </CabinetTable>
      <Pagination style={{ marginTop: 30 }} />
    </div>
  );
}

export default PaymentMethodsTable;
