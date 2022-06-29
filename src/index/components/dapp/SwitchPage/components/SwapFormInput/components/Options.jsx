import React from 'react';

// Utils
import { openCabinetModal } from 'src/index/components/dapp/Modals/ConnectToWalletModal/hooks/openCabinetModal';
import outRefClick from 'src/hooks/outRefClick';
import { classNames as cn } from 'src/utils';

const Options = ({ currencies, currency, onCurrencyChange, onClose }) => {
  const optionsRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(true);

  openCabinetModal();
  // Close select options when out options click.
  outRefClick(optionsRef, onClose);

  const changeHandler = (value) => {
    onCurrencyChange(value);
    setIsVisible(false);
  };

  React.useEffect(() => {
    if (!isVisible) {
      onClose();
    }
  }, [isVisible]);

  return (
    <>
      <div className="SwapFormInput__select__options__bg" />
      <div className="SwapFormInput__select__options" ref={optionsRef}>
        {currencies.map((item, index) => (
          <div
            className={cn('SwapFormInput__select__option', {
              active: item.abbr === currency,
            })}
            onClick={(e) => {
              e.stopPropagation();
              changeHandler(item.abbr);
            }}
            key={index}
          >
            {item.name} ({item.abbr.toUpperCase()})
            <div className="SwapFormInput__select__option__circle" />
          </div>
        ))}
      </div>
    </>
  );
};
export default Options;
