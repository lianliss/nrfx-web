import React from 'react';

// Components
import { Row, Col, NumberFormat, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import FormattedText from '../../../FormattedText/FormattedText';
import { Web3Context } from 'src/services/web3Provider';
import * as actions from 'src/actions';
import { classNames, getLang } from 'src/utils';

// Utils
import { openModal } from 'src/actions';

// Styles
import './Header.less';

function Header({
  title,
  subtitle,
  link,
  willGetNumber,
  friendsWillGetNumber,
  adaptive,
  hashLink,
}) {
  const context = React.useContext(Web3Context);
  const { chainId, accountAddress, isConnected } = context;

  const FriendsWillGet = () => {
    const Wrapper = adaptive ? Row : Col;

    return (
      <Wrapper
        className="Referral__information__future-secondary"
        alignItems="center"
      >
        <span className="strong">
          {getLang('dapp_referral_friends_will_get')}
        </span>
        <span className="Referral__information_procent blue-gradient-text">
          <NumberFormat number={friendsWillGetNumber} percent />
        </span>
        {adaptive && (
          <span style={{ marginLeft: 'auto' }}>
            <SVG src={require('src/asset/icons/action/share.svg')} />
          </span>
        )}
      </Wrapper>
    );
  };

  const ShareButton = () => (
    <Col
      className="Referral__share"
      alignItems="center"
      justifyContent="center"
    >
      <SVG src={require('src/asset/icons/action/share.svg')} />
    </Col>
  );

  return (
    <div className="Referral__header">
      <Col>
        <h1>{title}</h1>
        <p className="subtitle">
          <FormattedText text={subtitle} className="blue" />
        </p>
        <span className="link blue-gradient-text">
          {getLang('site__technologyReadMore')} ›
        </span>
      </Col>
      <Col className="Referral__information">
        <CabinetBlock>
          <Row alignItems="center" justifyContent="space-between">
            <h2>Copy Referral Link</h2>
            {adaptive && <ShareButton />}
            {/*<Col>*/}
            {/*<Row*/}
            {/*alignItems="center"*/}
            {/*className="create-new-link"*/}
            {/*onClick={() => openModal('create_referral_link')}*/}
            {/*>*/}
            {/*<span className="strong">Create new link</span>*/}
            {/*<SVG*/}
            {/*src={require('src/asset/icons/cabinet/add-icon-blue.svg')}*/}
            {/*/>*/}
            {/*</Row>*/}
            {/*</Col>*/}
          </Row>
          <div className="Referral__information__header">
            {isConnected ? (
              <>
                {!!hashLink && (
                  <Col className="Referral__copy">
                    <Row alignItems="center" justifyContent="space-between">
                      <span>{hashLink}</span>
                      <SVG src={require('src/asset/icons/action/copy.svg')} />
                    </Row>
                  </Col>
                )}
                {!adaptive && <ShareButton />}
              </>
            ) : (
              <Button onClick={() => actions.openModal('connect_to_wallet')}>
                {getLang('dapp_global_connect_wallet')}
              </Button>
            )}
          </div>
          <Row justifyContent="space-between" wrap={adaptive}>
            {/* {adaptive && <FriendsWillGet />} */}
            <Row
              className="Referral__information__future"
              justifyContent="space-between"
              alignItems="stretch"
            >
              <Col justifyContent="center" alignItems="center">
                <span className="strong">
                  {getLang('dapp_referral_you_will_get')}
                </span>
                <span className="Referral__information_procent blue-gradient-text">
                  <NumberFormat number={willGetNumber} percent />
                </span>
              </Col>
              <Col justifyContent="center" alignItems="center">
                {/*<span className="secondary-text">*/}
                {/*<FormattedText text="NRFX purchases 5%" className="blue" />*/}
                {/*</span>*/}
                <Col>
                  <span>{getLang('dapp_from_the_commission')}</span>
                </Col>
              </Col>
            </Row>
            {/*{!adaptive && <FriendsWillGet />}*/}
          </Row>
        </CabinetBlock>
      </Col>
    </div>
  );
}

export default Header;
