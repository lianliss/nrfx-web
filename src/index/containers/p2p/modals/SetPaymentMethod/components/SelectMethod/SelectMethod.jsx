import React from 'react';

// Components
import { PaymentItem } from 'src/index/components/p2p';
import { ScrollBox, DappInput, AlphabetSelect } from 'dapp';
import SVG from 'utils/svg-wrap';

// Utils
import searchIcon from 'src/asset/icons/action/search-small.svg';

// Styles
import styles from './SelectMethod.module.less';

const testItems = Array(50)
  .fill({ title: 'Bank Transfer' })
  .map((item, index) => (index < 16 ? { ...item, recommended: true } : item));

function SelectMethod({ adaptive, onSelect }) {
  const [selectedLetter, setSelectedLetter] = React.useState('All');

  const MethodItem = ({ item }) => (
    <div className={styles.item} onClick={() => onSelect(item)}>
      <PaymentItem title={item.title} />
    </div>
  );

  return (
    <div className={styles.selectMethod}>
      <h2>Select a Payment Method</h2>
      <ScrollBox
        padding={!adaptive && '0 9px 0 0'}
        maxHeight={!adaptive && 590}
        customizedScroll={!adaptive}
      >
        <div>
          <div className={styles.recommendedMethods}>
            <h3>Recommended</h3>
            <div className={styles.items}>
              {testItems
                .filter((item) => item.recommended)
                .map((item, index) => (
                  <MethodItem item={item} key={index} />
                ))}
            </div>
          </div>
          <div className={styles.allMethods}>
            <h3>All Payment Methods</h3>
            <DappInput
              indicator={<SVG src={searchIcon} flex />}
              placeholder="Search"
              textPosition="left"
              indicatorPosition="left"
            />
            <AlphabetSelect
              className={styles.alphabet}
              value={selectedLetter}
              onChange={setSelectedLetter}
            />
            <div className={styles.items}>
              {testItems.map((item, index) => (
                <MethodItem item={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </ScrollBox>
    </div>
  );
}

export default SelectMethod;
