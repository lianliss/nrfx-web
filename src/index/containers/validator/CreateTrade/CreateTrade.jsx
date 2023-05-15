import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routeParams } from 'src/selectors';

// Components
import { Message, CabinetBlock, SocialLinks } from 'dapp';
import { Container } from 'ui';
import TradeForm from '../../../components/validator/TradeForm/TradeForm';

// Styles
import './CreateTrade.less';

function CreateTrade() {
  const {offerAddress} = useSelector(routeParams);
  const [isWarning, setIsWarning] = React.useState(true);

  return (
    <div className="ValidatorCreateTrade">
      <Container>
        {!!offerAddress
          ? <CabinetBlock>
            <h1>Edit a trade advertisement</h1>
            <TradeForm offerAddress={offerAddress} />
          </CabinetBlock>
          : <><CabinetBlock>
          <h1>Create a trade advertisement</h1>
          {isWarning && (
            <Message
              type="warning"
              border
              maxWidth={620}
              onClose={() => setIsWarning(false)}
            >
              Before creating an advertisement please read through our terms of
              service and the online sale advertisement guide.
            </Message>
          )}
          <h2>Advertisement rules and requirements</h2>
          <ul>
            <li>
              For your ads to display you need to have Bitcoins in your
              LocalBitcoins wallet.
            </li>
            <li>
              The advertiser pays the <a href="">service fee</a>. The user who
              posts an ad is charged 1% of the total trade volume for each
              completed trade.
            </li>
            <li>
              Once a trade is opened the price is final, except when there is a
              clear mistake in the pricing.
            </li>
            <li>
              You are not allowed to buy or sell Bitcoin on behalf of someone
              else (brokering).
            </li>
            <li>
              You may only send and receive payment using accounts that are
              registered in your own name. Third party payments are not allowed.
            </li>
            <li>
              You must provide your payment details in the advertisement or in
              the trade chat.
            </li>
            <li>All communication must happen on LocalBitcoins.com.</li>
            <li>
              Payment methods marked <span className="dark">High Risk</span>{' '}
              have a <span className="dark">significant risk of fraud</span>. Be
              careful and always ID verify your trading partners when using high
              risk payment methods.
            </li>
          </ul>
        </CabinetBlock>
        <CabinetBlock>
          <TradeForm />
        </CabinetBlock></>}
      </Container>
      <SocialLinks />
    </div>
  );
}

export default CreateTrade;
