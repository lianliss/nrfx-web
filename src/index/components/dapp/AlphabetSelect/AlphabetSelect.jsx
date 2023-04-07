import React from 'react';

// Components
import { CustomButton } from 'dapp';

// Utils
import letters from './constants/letters';
import { classNames as cn } from 'utils';

// Styles
import styles from './AlphabetSelect.module.less';

function AlphabetSelect({ value, onChange, className }) {
  const [selected, setSelected] = React.useState(value || 'All');
  const buttons = ['All', ...letters['en']];

  const handleButtonClick = (value) => {
    setSelected(value);

    if (onChange instanceof Function) {
      onChange(value);
    }
  };

  React.useEffect(() => {
    if (!value) return;

    setSelected(value);
  }, [value]);

  return (
    <div className={cn(styles.alphabetSelect, className)}>
      {buttons.map((letter) => (
        <CustomButton
          type="lightBlue"
          key={letter}
          className={cn(styles.lettersButton, { active: selected === letter })}
          onClick={() => handleButtonClick(letter)}
        >
          {letter}
        </CustomButton>
      ))}
    </div>
  );
}

export default AlphabetSelect;
