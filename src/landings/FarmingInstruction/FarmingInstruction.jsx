import React from 'react';
import DocumentContainer from '../components/DocumentContainer/DocumentContainer';
import company from '../../index/constants/company';
import { default as useAdaptive } from '../../hooks/adaptive';

function FarmingInstruction() {
  const adaptive = useAdaptive();
  const instructionTitleRef = React.useRef(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const getSocialUrl = (social) => {
    return 'https://' + social;
  };

  React.useEffect(() => {
    if (isScrolled) return;
    if (typeof adaptive === undefined) return;
    if (window.location.hash !== '#instruction') return;

    const rect = instructionTitleRef.current.getBoundingClientRect();
    const topPosition = rect.top;

    setTimeout(() => {
      window.scrollTo({
        top: adaptive ? topPosition - 80 : topPosition - 20,
      });
      setIsScrolled(true);
    });
  }, [adaptive]);

  return (
    <DocumentContainer>
      <DocumentContainer.Title>
        NARFEX FARMING IS NOW LIVE ON THE TESTNET
      </DocumentContainer.Title>
      <a href="https://testnet.narfex.com/dapp/farming">
        &gt;&gt; I know how to work with it, go directly to the farming page
        &gt;&gt;
      </a>
      <h2>What is a Farming (liquidity mining) and why is it lucrative?</h2>
      <p>
        Narfex Farms offer multiple farming opportunities to our users. You can
        stake your LP tokens and earn NRFX tokens in return. We will incentivize
        many liquidity pairs by offering our Liquidity Providers the chance to
        stake their LP tokens in our farms.
      </p>
      <p>
        When a person adds liquidity to the pool, he/she will receive LP tokens.
        For example, if a person added liquidity to a $NRFX / $USDC pair, he/she
        received NRFX-USDC LP tokens. In addition to transaction fee rewards,
        the user can go to “Farms”, stake these LP tokens, and earn NRFX tokens
        in return.
      </p>
      <h2>How Narfex Yield Farming works?</h2>
      <h3>Main info</h3>
      <DocumentContainer.CustomList separator="–">
        <li>
          Tokens are not minted, but distributed from the contract. Reward token
          – NRFX
        </li>
        <li>Allocated number of tokens for farming – ~13M NRFX.</li>
        <li>
          You can easily check the balance of the contract, how many rewards are
          left here.
        </li>
        <li>
          It is possible to add LP tokens of other projects to our
          farming,&nbsp;
          <a href="mailto:partnership@narfex.com">contact us</a> for
          partnerships.
        </li>
        <li>Testnet launch date – 28.03.2023</li>
        <li>Supported Chains: Ethereum, Arbitrum, Polygon</li>
      </DocumentContainer.CustomList>
      <h3>Referral system</h3>
      <p>
        Our platform gives you an opportunity to maximize your rewards. Hence,
        you can invite your friends to register via the referral link and
        receive rewards from our farming referral program. You can expect a
        <strong>&nbsp;5%&nbsp;</strong>
        return from your friends' earnings. Your referral rewards will be
        visible and ready for withdrawal from your referral accounts when your
        invited friends will withdraw NRFX tokens to the wallet.
      </p>
      <p>
        <q>
          <em>
            <strong>
              Let’s say, you invited a friend and he/she earned 5 NRFX from
              “Farms". As a result, you will receive 5% from 5 NRFX, which
              accounts for 0.25 NRFX.
            </strong>
          </em>
        </q>
      </p>
      <p>
        All your referral rewards will be sent to your wallets in NRFX tokens.
        All the fees will also be charged in NRFX tokens.
      </p>
      <h3>Harvest lock-up timer</h3>
      <p>
        There are no restrictions on unstaking, but harvest is only available
        after 8 hours since the last staking. This is a protection against bots
        and whales so that they do not drain NRFX with frequent withdrawals of
        profit.
      </p>
      <h3>Early harvest</h3>
      <p>
        A 10% fee will be deducted from rewards if withdrawal occurs within 14
        days of the last harvest or staking. Each withdrawal resets the timer
        for 14 hours. These 10% withdrawal fees are automatically burned.
      </p>
      <br />
      <DocumentContainer.Title>
        Narfex Competition Campaign
      </DocumentContainer.Title>
      <br />
      <p>
        We launched Farming on the Polygon testnet! To celebrate this exciting
        milestone and show our appreciation for your incredible support, we're
        giving away a massive amount of tokens to our amazing community!
      </p>
      <h3>Here's what you need to know:</h3>
      <p>
        <strong>Event Duration:</strong>&nbsp; The Competition Campaign will run
        from March 27th to April 14th, 2023.
      </p>
      <p>
        <strong>Total Tokens Up for Grabs:</strong>&nbsp; 200,000 $NRFX will be
        distributed among all eligible participants!
      </p>
      <h3>How to Participate:</h3>
      <p>
        Connect your account and complete the quests on Crew³ —{' '}
        <DocumentContainer.LongText>
          <a href="https://crew3.xyz/c/narfex/questboard">
            crew3.xyz/c/ narfex/questboard
          </a>
        </DocumentContainer.LongText>
      </p>
      <h3>Rules & Eligibility:</h3>
      <DocumentContainer.CustomList separator="-">
        <li>Duplicate or fake accounts will be disqualified</li>
        <li>
          Tokens will be distributed according to leadership board within two
          weeks after the campaign ends.
        </li>
      </DocumentContainer.CustomList>
      <DocumentContainer.Title>Help us test Narfex</DocumentContainer.Title>
      <br />
      <p>
        Help us make this product better for the mainnet release and get chance
        to win $NRFX 200,000 reward.
      </p>
      <h3>What sort of feedback do we need?</h3>
      <ul>
        <li>
          <p>
            <strong>Acquaint yourself with the UI.</strong> Tap buttons, read
            docs, check everything, and tell us what we can make better.
          </p>
        </li>
        <li>
          <p>
            <strong>Use the platform.</strong> Trade, Stake/Unstake, Harvest,
            manage your assets. Report errors or weird behavior. Tell us which
            features are missing and which can be improved.
          </p>
        </li>
        <li>
          <p>
            <strong>Ask questions.</strong> If anything pertaining to the
            platform’s features and inner workings is not clear enough, it means
            we can further smoothen the flow of information.
          </p>
        </li>
      </ul>
      <h3>How to send the feedback?</h3>
      <p>
        We have a neat Google form for all your bug reports and feature
        requests:&nbsp;
        <DocumentContainer.LongText>
          <a href="https://forms.gle/TrbXUjcsnCoTxYwB6">
            https://forms.gle/TrbXUjcsnCoTxYwB6
          </a>
        </DocumentContainer.LongText>
      </p>
      <p>
        Or talk to us directly in the telegram group:&nbsp;
        <a href="https://t.me/Narfex_EN">https://t.me/Narfex_EN</a>
      </p>
      <DocumentContainer.Title ref={instructionTitleRef}>
        Instructions
      </DocumentContainer.Title>
      <h3>What is a Mumbai Testnet?</h3>
      <p>
        The testnet is a test environment for Polygon network, run by the
        Polygon development community, which is open to developers. The
        validators on the testnet are from the development team. Testnet is good
        for developing applications and trial guides without the risk of losing
        your own assets, as well as for testing and analyzing applications
        before releasing the main network.
      </p>
      <h3>Add Polygon Network</h3>
      <p>
        <i>
          We recommend using a metamask for the easiest and fastest use of the
          testnet.
        </i>
      </p>
      <p>
        <strong>
          Please follow the steps to add Polygon's Mumbai-Testnet:
        </strong>
      </p>
      <ol>
        <li>
          <p>
            Navigate to&nbsp;
            <a href="https://mumbai.polygonscan.com/">mumbai.polygonscan.com</a>
          </p>
        </li>
        <li>
          <p>
            Scroll down to the bottom of the page and click on the button Add
            Mumbai Network
          </p>
          <div className="image-container">
            <img src={require('./asset/image-000.png')} />
          </div>
        </li>
        <li>
          <p>
            Once you click the button you will see a MetaMask Notification, now
            click on Approve.
          </p>
          <div className="image-container">
            <img src={require('./asset/image-001.png')} />
          </div>
          <p>
            You will be directly switched to Polygon’s Mainnet now in the
            network dropdown list. You can now close the dialog.
          </p>
          <p>
            If you are facing any issue, add the network manually according to
            the steps given below.
          </p>
        </li>
      </ol>
      <h2>Add the Polygon network manually</h2>
      <p>
        To add Polygon's Mumbai-Testnet, open the list of networks and click
        “Add Network”.
      </p>
      <div className="image-container">
        <img src={require('./asset/image-002.png')} />
      </div>
      <p>Fill in all required fields in the Networks tab.</p>
      <p>
        you can add in the Network Name field, URL
        https://rpcmumbai.maticvigil.com/ in the New RPC URL field, 80001 in
        Chain ID field, MATIC in Currency Symbol field and https://
        mumbai.polygonscan.com/ in Block Explorer URL field.
      </p>
      <DocumentContainer.CustomList separator="-">
        <li>
          <p>
            <strong>Network name:</strong>&nbsp; Matic Mumbai
          </p>
        </li>
        <li>
          <p>
            <strong>RPC URL:</strong>&nbsp;
            <a
              style={{ color: '#000' }}
              href="https://rpc-mumbai.maticvigil.com/"
            >
              https://rpc-mumbai.maticvigil.com/
            </a>
          </p>
        </li>
        <li>
          <p>
            <strong>Chain ID:</strong>&nbsp;80001
          </p>
        </li>
        <li>
          <p>
            <strong>Currency Symbol:</strong>&nbsp;MATIC
          </p>
        </li>
        <li>
          <p>
            <strong>Block Explorer URL:</strong>&nbsp;
            <a style={{ color: '#000' }} href="https://mumbai.polygonscan.com/">
              https://mumbai.polygonscan.com/
            </a>
          </p>
        </li>
      </DocumentContainer.CustomList>
      <p>Click “Save”.</p>
      <h2>Get Testnet Funds</h2>
      <p>In order to get free MATIC on the testnet, you need:</p>
      <ol>
        <li>
          <p>
            <strong>Visit Faucet Polygon website</strong>
            <br />
            <a href="https://faucet.polygon.technology/">
              https://faucet.polygon.technology/
            </a>
          </p>
        </li>
        <li>
          <p>
            <strong>Select the network</strong> - Mumbai and&nbsp;
            <strong>select the token</strong> - MATIC in the form.
          </p>
        </li>
        <li>
          <p>
            <strong>Paste</strong> your wallet address and click&nbsp;
            <strong>Submit</strong> button.
          </p>
        </li>
      </ol>
      <div className="image-container">
        <img src={require('./asset/image-003.png')} />
      </div>
      <h2>Start farming</h2>
      <p>Once you have MATIC, you can start farming directly.</p>
      <h3>Buy NRFX and USDC on the Narfex DEX</h3>
      <DocumentContainer.CustomList separator="-">
        <li>
          <p>
            Open{' '}
            <a href="https://narfex.com/dapp/exchange?coin=BNB&currency=USD">
              Narfex DEX
            </a>
          </p>
        </li>
        <li>
          <p>Connect your Wallet</p>
        </li>
        <li>
          <p>Select Testnet network</p>
          <div className="image-container">
            <img src={require('./asset/image-004.png')} />
          </div>
        </li>
        <li>
          <p>
            Swap your MATIC to NRFX and USDC at a 50/50 ratio. Leave 0.02 MATIC
            for the gas fee coverage.
          </p>
          <p>0.08 MATIC to NRFX, 0.08 MATIC to USDC</p>
          <div className="image-container">
            <img src={require('./asset/image-005.png')} />
          </div>
        </li>
      </DocumentContainer.CustomList>
      <h3>
        Get LP tokens. Select Liquidity page and provide NRFX liquidity with
        USDC.
      </h3>
      <DocumentContainer.CustomList separator="-">
        <li>
          <p>
            Go to&nbsp;
            <a href="https://narfex.com/dapp/liquidity">Liquidity section</a>
          </p>
        </li>
        <li>
          <p>Click “Add Liquidity” button.</p>
        </li>
        <li>
          <p>Select NRFX + USDC pair.</p>
        </li>
        <li>
          <p>Enter the max amount.</p>
        </li>
        <li>
          <p>Enable NRFX and USDC for liquidity providing.</p>
          <i>(max amount)</i>
          <div className="image-container">
            <img src={require('./asset/image-006.png')} />
          </div>
        </li>
        <li>
          <p>Click Supply button and Confirm your Supply.</p>
        </li>
      </DocumentContainer.CustomList>
      <p>Done! Now you can stake your LP tokens.</p>
      <div className="image-container">
        <img src={require('./asset/image-007.png')} />
      </div>
      <h3>
        Stake your LP tokens on the&nbsp;
        <a href="https://testnet.narfex.com/dapp/farming">
          Narfex Farming page
        </a>
        .
      </h3>
      <DocumentContainer.CustomList separator="-">
        <li>
          <p>Select NRFX-USDC pool and click “Stake”.</p>
          <div className="image-container">
            <img src={require('./asset/image-008.png')} />
          </div>
        </li>
        <li>
          <p>
            Enter the max amount, approve the transaction and stake your LPs.
          </p>
          <div className="image-container">
            <img src={require('./asset/image-009.png')} />
          </div>
        </li>
      </DocumentContainer.CustomList>
      <p>
        Done! In a few minutes you can see your rewards. Click Harvest to get
        rewards to your wallet
      </p>
      <br />
      <div className="image-container">
        <img src={require('./asset/image-010.png')} />
      </div>
      <p style={{ fontSize: 20 }}>
        Thank you in advance for your goodwill and help!
      </p>
      <br />
      <p>
        <strong>Stay on touch with Narfex</strong>
      </p>
      <p>
        Narfex Token:&nbsp;
        <DocumentContainer.LongText>
          <a href={company.url + 'token'}>{company.url + 'token'}</a>
        </DocumentContainer.LongText>
      </p>
      <p>
        Discord:&nbsp;
        <DocumentContainer.LongText>
          <a href={getSocialUrl(company.social.discord)}>
            {getSocialUrl(company.social.discord)}
          </a>
        </DocumentContainer.LongText>
      </p>
      <p>
        Telegram:&nbsp;
        <DocumentContainer.LongText>
          <a href={getSocialUrl(company.social.telegram)}>
            {getSocialUrl(company.social.telegram)}
          </a>
        </DocumentContainer.LongText>
      </p>
      <p>
        Twitter:&nbsp;
        <DocumentContainer.LongText>
          <a href="https://twitter.com/narfexglobal">
            https://twitter.com/narfexglobal
          </a>
        </DocumentContainer.LongText>
      </p>
    </DocumentContainer>
  );
}

export default FarmingInstruction;
