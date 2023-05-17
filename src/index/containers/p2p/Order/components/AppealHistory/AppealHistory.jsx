import React from 'react';

import { CabinetBlock } from 'dapp';
import AppealMessage from '../AppealMessage/AppealMessage';

import styles from './AppealHistory.module.less';

const AppealHistory = () => {
  return (
    <CabinetBlock className={styles.AppealHistory}>
      <h3>Appeal History</h3>
      <AppealMessage
        date={987098283 * 1000}
        userName="Customer support's comment"
        paragraphs={[
          {
            title: 'Comment',
            text: 'Dear buyer, we noticed that you marked the order a pad However, the sell has not received the money Please upload valid proot of payment ere (should include source or sender name, card number, amount\n\ndate and recipient account) and reply to this message as soon as possible. This order wil be cancoled inthe next 1 HOURf there i no reply from you. Please note that clicking "Transferred, natty seller” without ‘making the payment will lead to your account suspension it you attempt todo so muttipitimes. Dear both partes please maintain communication using chatbox. Kindly check with your bank and update the progress ofthe payment tothe other party, Please do NOT release the crypto unless you actually received the payment. Noe: Customer Support DOES NOT contact users va phone call, messenger or other platforms, {and 00 NOT ask tor personal information, nor scanning of QR Code. Be aware of FAKE payment receipts and payment notifications via SMS/email Binance Team',
          },
        ]}
        isNew
      />
      <AppealMessage
        date={987098283 * 1000}
        title="Appeal filed by user"
        userName="mail****@gmail.com"
        paragraphs={[
          {
            title: 'Reason(s)',
            text: 'I did not receive paymnt from the buyer.',
          },
          {
            title: 'Description',
            text: 'впвпвпвп',
          },
        ]}
        files={[
          {
            type: 'image',
            src: require('../AppealMessage/assets/test-file-image.png'),
          },
        ]}
      />
    </CabinetBlock>
  );
};

export default AppealHistory;
