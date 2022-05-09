import React from 'react';

// Components
import { TableCell, TableColumn, Button, NumberFormat } from 'src/ui';
import DoubleWallets from 'src/index/components/cabinet/DoubleWallets/DoubleWallets';
import SVG from 'utils/svg-wrap';

// Styles
import './FarmingTableItem.less';

function FarmingTableItem({ dark, indicator }) {
  // Constants
  const [isActive, setIsActive] = React.useState(true);

  // Components
  const Indicator = ({ type, text }) => (
    <div className={`FarmingTableItem__indicator ${type}`}>{text}</div>
  );

  const DoubleText = ({ title, currency, first, second }) => (
    <div className="FarmingTableItem__doubleText">
      <span>
        {title} {currency.toUpperCase()}
      </span>
      <p>
        <span>
          <NumberFormat number={first} currency={currency} />
        </span>
        &nbsp;/&nbsp;
        <span>
          $<NumberFormat number={second} />
        </span>
      </p>
    </div>
  );

  // Handlers
  const handleActive = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <>
      <TableCell
        className="FarmingTableItem"
        dark={dark}
        onClick={handleActive}
      >
        <TableColumn>
          <span>
            <Indicator
              type={indicator === 'hot' ? 'red' : 'green'}
              text={indicator === 'hot' ? 'Hot' : 'Latest'}
            />
          </span>
        </TableColumn>
        <TableColumn>
          <DoubleWallets first="usd" second="usdt" />
        </TableColumn>
        <TableColumn>
          125,5%{' '}
          <span>
            <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
          </span>
        </TableColumn>
        <TableColumn>
          75,5%{' '}
          <span>
            <SVG src={require('src/asset/icons/cabinet/calculator-icon.svg')} />
          </span>
        </TableColumn>
        <TableColumn>
          $7 100 650{' '}
          <span>
            <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
          </span>
        </TableColumn>
        <TableColumn>—</TableColumn>
        <TableColumn>
          Pair info{' '}
          <span>
            <SVG src={require('src/asset/icons/export.svg')} />
          </span>
        </TableColumn>
        <TableColumn>details</TableColumn>
      </TableCell>
      {isActive && (
        <>
          <TableCell className="FarmingTableItem active">
            <TableColumn>
              <Button type="light">
                <SVG src={require('src/asset/icons/cabinet/add-icon.svg')} />{' '}
                Get LP
              </Button>
            </TableColumn>
            <TableColumn>
              <DoubleText
                first={12.21}
                second={21}
                currency="bnb"
                title="Aviable"
              />
            </TableColumn>
            <TableColumn colspan={2}>
              <Button type="lightBlue">asd</Button>
            </TableColumn>
            <TableColumn>
              <DoubleText first={0} second={0} currency="bnb" title="Staked" />
            </TableColumn>
            <TableColumn>
              <Button type="green-light" disabled>
                Harvest
              </Button>
            </TableColumn>
            <TableColumn>
              <DoubleText first={0} second={0} currency="bnb" title="Earned" />
            </TableColumn>
            <TableColumn></TableColumn>
          </TableCell>
          <TableCell>
            <TableColumn className="FarmingTableItem__separator" />
          </TableCell>
        </>
      )}
    </>
  );
}

export default FarmingTableItem;
