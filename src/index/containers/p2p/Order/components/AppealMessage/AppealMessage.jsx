import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'ui';
import { Avatar } from 'src/index/components/p2p/components/UI';
import { FormattedText } from 'dapp';
import SVG from 'utils/svg-wrap';
import moment from 'moment';

import styles from './AppealMessage.module.less';

const Image = ({ src }) => {
  return (
    <div className={styles.AppealMessage__image__container}>
      <div className={styles.AppealMessage__image__add}>
        <SVG src={require('src/asset/icons/action/image-add.svg')} flex />
      </div>
      <img src={src} className={styles.AppealMessage__image} />
    </div>
  );
};

const AppealMessage = ({
  title,
  date,
  userName,
  paragraphs = [],
  files = [],
  isNew,
}) => {
  return (
    <div className={styles.AppealMessage}>
      <div className={styles.AppealMessage__date}>
        {moment(date).format('MM-DD HH:mm:ss')}
      </div>
      <Row className={styles.AppealMessage__user} alignItems="center">
        <Avatar size="small" />
        <span className={styles.AppealMessage__user__name}>{userName}</span>
      </Row>
      <div className={styles.AppealMessage__message}>
        {isNew && (
          <div className={styles.AppealMessage__marker}>
            <span>NEW</span>
          </div>
        )}
        {title && <div className={styles.AppealMessage__title}>{title}</div>}
        {!!paragraphs.length &&
          paragraphs.map(({ title, text }, key) => (
            <Col key={key}>
              <div className={styles.AppealMessage__subtitle}>{title}</div>
              <FormattedText tag="p" text={text} regularExpression={null} />
            </Col>
          ))}
        {!!files.length && (
          <Row className={styles.AppealMessage__files} wrap>
            {files.map(({ type, src }, key) => {
              if (type === 'image') {
                return <Image key={key} src={src} />;
              }

              return <React.Fragment key={key}></React.Fragment>;
            })}
          </Row>
        )}
      </div>
    </div>
  );
};

AppealMessage.propTypes = {
  title: PropTypes.string,
  date: PropTypes.oneOfType(PropTypes.instanceOf(Date), PropTypes.number),
  userName: PropTypes.string,
  paragraphs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  files: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['image']),
      src: PropTypes.string,
    })
  ),
  isNew: PropTypes.bool,
};

export default AppealMessage;
