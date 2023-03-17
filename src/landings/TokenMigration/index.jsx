import React from 'react';
import { useSelector } from 'react-redux';

// Components
import Form from './components/Form';
import FormattedText from 'dapp/FormattedText/FormattedText';
import { Container, Button, Row } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import regexes from 'src/index/constants/regexes';
import rightArrowIcon from 'src/asset/24px/arrow_right_alt.svg';
import { adaptiveSelector } from 'src/selectors';

// Styles
import './index.less';

function TokenMigration() {
  const adaptive = useSelector(adaptiveSelector);

  return (
    <Container
      className="TokenMigrationLanding"
      maxWidth={1260}
      padding={adaptive ? 0 : 70}
    >
      <Row justifyContent="space-between">
        <div className="TokenMigrationLanding__blocks">
          <div className="TokenMigrationLanding__block">
            <FormattedText
              lang="main_landing_title"
              className="blue"
              regularExpression={regexes.betweenCharacters}
              tag="h1"
            />
            <h2>Migrate your Narfex tokens to Narfex V2 tokens</h2>
            <p className="TokenMigrationLanding__description">
              We have upgraded our Narfex Token contract to V2, and it will be
              necessary to convert your balance to NRFX (v2) in order to fully
              benefit from our protocol and smart contract going forward.
            </p>
          </div>
          {adaptive && <Form />}
          <div className="TokenMigrationLanding__block">
            <h2>What Is V2 Narfex Token?</h2>
            <p>
              We aspire to improve the utility, safety, and accessibility of the
              existing Narfex token by implementing novel features that expand
              the usage of NRFX within our protocol. Through this upgrade, the
              Narfex Token will become the heart of the Narfex Protocol.\n\n
              Important to note, there will be NO charge for converting to NRFX
              V2. After conversion, the total amount of NRFX V2 that you hold
              will be equal in value to your original V1 NRFX balance
            </p>
            <Button
              type="secondary-lightBlue"
              size="ultra_large"
              className="TokenMigrationLanding__more"
            >
              <Row alignItems="center">
                More info about V2 Narfex Token
                <SVG
                  src={rightArrowIcon}
                  style={{ marginLeft: adaptive ? 10 : 13 }}
                  flex
                />
              </Row>
            </Button>
          </div>
          <div className="TokenMigrationLanding__block">
            <h2>What are the required steps?</h2>
            <ol>
              <li>
                Please make sure to have enough ETH in your wallet to cover the
                "gas fee". Unfortunately, as token developers, this is a
                blockchain cost that we cannot control.
              </li>
              <li>
                To begin, you will need to approve the new contract for trading.
              </li>
              <li>
                After that, you can proceed to "Swap" your V1 NRFX for V2 NRFX.
              </li>
            </ol>
            <p>
              Once redeemed, you will be able to review the transaction of your
              NRFX tokens being migrated from the V1, and the NRFX V2 tokens
              being sent to your wallet.
            </p>
          </div>
        </div>
        {!adaptive && <Form />}
      </Row>
    </Container>
  );
}

export default TokenMigration;
