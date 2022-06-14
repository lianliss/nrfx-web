import React from 'react';

// Styles
import './FarmingInstruction.less';

function FarmingInstruction() {
  return (
    <div className="FarmingInstruction__wrap">
      <div className="FarmingInstruction">
        <h1>NARFEX FARMING IS ON THE TESTNET NOW</h1>
        <h2>What is a Farming (liquidity mining) and why is it lucrative?</h2>
        <p>
          Narfex Farms offer multiple farming opportunities to our users. You
          can stake your LP tokens and earn NRFX tokens in return. We will
          incentivize many liquidity pairs by offering our Liquidity Providers
          the chance to stake their LP tokens in our farms.
        </p>
        <p>
          When a person adds liquidity to the pool, he/she will receive LP
          tokens. For example, if a person added liquidity to a $NRFX / $BUSD
          pair, he/she received NRFX-BUSD LP tokens. In addition to transaction
          fee rewards, the user can go to “Farms”, stake these LP tokens, and
          earn NRFX tokens in return.
        </p>
        <h2>How Narfex Yield Farming works?</h2>
        <h3>Main info</h3>
        <ul>
          <li> Tokens are not minted, but distributed from the contract.</li>
          <li> Allocated number of tokens for farming — 13M NRFX.</li>
          <li>
            You can easily check the balance of the contract, how many rewards
            are left here.
          </li>
          <li>
            It is possible to add LP tokens from different exchanges to our
            farming.
          </li>
          <li> Farming start date — 15.08.2022.</li>
        </ul>
        <h3>Referral system</h3>
        <p>
          Our platform gives you an opportunity to maximize your rewards. Hence,
          you can invite your friends to register via the referral link and
          receive rewards from our farming referral program. You can expect a 5%
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
          This means that harvest is only available after 14 days since the last
          staking. This is a protection against bots and whales so that they do
          not drain NRFX with frequent withdrawals of profit.
        </p>
        <h3>Early harvest</h3>
        <p>
          A 10% fee will be deducted from rewards if withdrawal occurs within 8
          hours of the last harvest. Each withdrawal resets the timer for 8
          hours. These 10% withdrawal fees are automatically burned.
        </p>
        <h3>Anti-Whale system</h3>
        <p>
          A transfer of more than 0.1% of the total supply will be forbidden.
          This maximum ratio will be adjusted as the total supply grows.
        </p>
        <h3>Changeable parameters (DAO)</h3>
        <ul>
          <li> Early harvest fee.</li>
          <li> Amount of distributions of NRFX per block.</li>
          <li> Update rewards.</li>
        </ul>
        <h2>Help us test Narfex</h2>
        <p>
          Narfex is entering the stage of the public beta on testnet. We welcome
          you to take part on it.
        </p>
        <p>Help us make this product better for the mainnet release.</p>
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
              manage your assets. Report errors or weird behavior. Tell us
              which.
            </p>
            features are missing and which can be improved.
          </li>
          <li>
            <p>
              <strong>Ask questions.</strong> If anything pertaining to the
              platform’s features and inner workings is not clear enough, it
              means
            </p>
            we can further smoothen the flow of information.
          </li>
        </ul>
        <h3>How to send the feedback?</h3>
        <p>
          We have a neat Google form for all your bug reports and feature
          requests:{' '}
          <a href="https://forms.gle/TrbXUjcsnCoTxYwB6">
            https://forms.gle/TrbXUjcsnCoTxYwB6
          </a>
        </p>
        <p>
          Or talk to us directly in the telegram group:{' '}
          <a href="https://t.me/Narfex_EN">https://t.me/Narfex_EN</a>
        </p>
        <h3>What is a Testnet?</h3>
        <p>
          The testnet is a test environment for BNB Smart Chain network, run by
          the BNB Chain development community, which is open to developers. The
          validators on the testnet are from the development team. Testnet is
          good for developing BNB Smart Chain applications and trial guides
          without the risk of losing your own assets, as well as for testing and
          analyzing applications before releasing the main network.
        </p>
        <h3>How to get Testnet Fund?</h3>
        <p>Steps to claim testnet BNB:</p>
        <ol>
          <li>
            <h4>
              Create a new{' '}
              <strong>
                <a href="https://metamask.io/">MetaMask</a>
              </strong>{' '}
              Wallet
            </h4>
            <p>
              We recommend using a metamask for the easiest and fastest use of
              the testnet. <a href="https://mathwallet.org/">MathWallet</a> is
              also available.
            </p>
          </li>
          <li>
            <h4>Add testnet chain.</h4>
            <p>
              When you go to the farming page, Narfex will prompt you to add a
              test network to your metamask and start working with the site.
              Just click “Approve” in the popup.
            </p>
            <div className="image-container">
              <img src={require('./asset/0.png')} />
            </div>
            <h4>Manual way:</h4>
            <p>2.1 Open the list of networks and click “Add Network”.</p>
            <div className="image-container">
              <img src={require('./asset/1.png')} />
            </div>
            <p>2.2</p>
            <p>Fill in all required fields:</p>
            <ul>
              <li>
                <p>
                  <strong>Network name:</strong> BSC web3 test
                </p>
              </li>
              <li>
                <p>
                  <strong>RPC URL:</strong>{' '}
                  <a href="https://bsc-testnet.web3api.com/v1/KBR2FY9IJ2IXESQMQ45X76BNWDAW2TT3Z3">
                    https://bsc-testnet.web3api.com/v1/KBR2FY9IJ2IXESQMQ45X76BNWDAW2TT3Z3
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <strong>Chain ID:</strong> 97
                </p>
              </li>
              <li>
                <p>
                  <strong>Currency Symbol:</strong> tBNB
                </p>
              </li>
            </ul>
            <p>Click “Save”.</p>
            <p>Done.</p>
            <div className="image-container">
              <img src={require('./asset/2.png')} />
            </div>
          </li>
          <li>
            <h4>Get Testnet Fund</h4>
            <p>Open the website:</p>
            <a href="https://testnet.binance.org/faucet-smart">
              https://testnet.binance.org/faucet-smart
            </a>
            <p>
              Paste your wallet address.
              <br />
              Click “Give me BNB”&gt;”0.2BNBs: buttons.
              <br />
              Done. BNB on the testnet have been sent to your wallet and you can
              start testing!
            </p>
            <em>
              You can copy your wallet address in the metamask extension just
              below the list of networks.
            </em>
            <div className="image-container">
              <img src={require('./asset/3.png')} />
            </div>
            <p>Thank you in advance for your goodwill and help!</p>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default FarmingInstruction;
