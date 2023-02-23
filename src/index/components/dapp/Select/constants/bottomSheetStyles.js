export const styles = {
  control: (base, state) => ({
    ...base,
    width: 150,
    height: '100%',
    backgroundColor: 'transparent',
    borderSize: '1px',
    borderStyle: 'solid',
    borderColor: state.isFocused ? '#d7ddee' : '#dfe3f0',
    borderRadius: 10,
    boxShadow: 'none',

    '&:hover': {
      borderColor: '#d7ddee',
    },
  }),
  singleValue: (base) => ({
    ...base,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: '0 15px',
  }),
  menu: (base) => ({
    ...base,
    display: 'flex',
    background: '#fff',
    marginTop: 12,
    boxShadow: '0px 25px 55px rgba(188, 188, 188, 0.25)',
    borderRadius: '18px',
    maxHeight: 195,
  }),
  menuList: (base) => ({
    ...base,
    padding: '0',
    maxHeight: 156,
  }),
  option: (base, state) => ({
    ...base,
    padding: state.isSelected ? '8px 12px 8px 9px' : '7px 27.4px 9px 11px',

    '&:not(:hover)': {
      background: state.isSelected ? '#dce5fd' : 'transparent',
    },

    '&:hover': {
      background: '#dce5fd',
    },
  }),
};

export const adaptiveStyles = {
  ...styles,
  control: (base, state) => ({
    ...styles.control(base, state),
    width: 63,

    p: {
      display: 'none',
    },
  }),
  dropdownIndicator: (base, state) => ({
    ...styles.dropdownIndicator(base, state),
    padding: '0 10px',
  }),
  menu: (base, state) => ({
    ...styles.menu(base, state),
    maxHeight: 225,
    margin: 0,
    position: 'static',
    width: '100%',
    borderRadius: '18px 18px 0px 0px',
  }),
  option: (base, state) => ({
    ...styles.option(base, state),
    padding: '12px 12px 12px 16px',
  }),
};