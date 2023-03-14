import _ from 'lodash';

const bottomSheetStyles = (desktopStyles = {}) => {
  const getSelectStyles = (key, base, state) => {
    if (_.isFunction(desktopStyles[key])) {
      return desktopStyles[key](base, state);
    }

    return {};
  };

  return {
    ...desktopStyles,
    control: (base, state) => ({
      ...getSelectStyles('control', base, state),
      width: 63,

      p: {
        display: 'none',
      },
    }),
    dropdownIndicator: (base, state) => ({
      ...getSelectStyles('dropdownIndicator', base, state),
      padding: '0 10px',
    }),
    menu: (base, state) => ({
      ...getSelectStyles('menu', base, state),
      maxHeight: 225,
      margin: 0,
      position: 'static',
      width: '100%',
      borderRadius: '18px 18px 0px 0px',
    }),
    option: (base, state) => ({
      ...getSelectStyles('option', base, state),
      padding: '12px 12px 12px 16px',
    }),
  };
};

export default bottomSheetStyles;
