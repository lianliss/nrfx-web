const commonStyles = {
  control: (base, state) => ({
    height: '100%',
    backgroundColor: 'transparent',
    borderSize: '1px',
    borderStyle: 'solid',
    boxShadow: 'none',
    borderColor: state.isFocused ? '#d7ddee' : '#dfe3f0',
    '&:hover': {
      borderColor: '#d7ddee',
    },
  }),
  dropdownIndicator: () => ({
    padding: '0 15px',
  }),
  menu: (base) => ({
    display: 'flex',
    background: '#fff',
  }),
  menuList: (base) => ({
    padding: '0 3px 0 0',
    marginRight: 3,
    overflowY: 'scroll',

    '&::-webkit-scrollbar': {
      width: '4px',
    },

    '&::-webkit-scrollbar-track': {
      borderRadius: '2px',
      backgroundColor: '#f7f9fc',
    },

    '&::-webkit-scrollbar-thumb': {
      borderRadius: '2px',
      backgroundColor: '#e5ebfc',
    },
  }),
};

const desktopStyles = {
  bold: {
    control: (base, state) => ({
      ...base,
      ...commonStyles.control(base, state),
      borderRadius: 10,
    }),
    singleValue: (base) => ({
      ...base,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      ...commonStyles.dropdownIndicator(base),
    }),
    menu: (base) => ({
      ...base,
      ...commonStyles.menu(base),
      marginTop: 12,
      boxShadow: '0px 25px 55px rgba(188, 188, 188, 0.25)',
      borderRadius: '18px',
    }),
    menuList: (base) => ({
      ...base,
      ...commonStyles.menuList(base),
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
  },
  average: {
    control: (base, state) => ({
      ...base,
      ...commonStyles.control(base, state),
      borderBottom: state.selectProps.menuIsOpen && 'none',
      borderRadius: state.selectProps.menuIsOpen ? '10px 10px 0 0' : 10,
    }),
    singleValue: (base) => ({
      ...base,
      overflow: 'visible',
    }),
    dropdownIndicator: (base) => ({
      ...base,
    }),
    menu: (base, state) => ({
      ...base,
      ...commonStyles.menu(base),
      marginTop: 0,
      borderRadius: '0 0 10px 10px',
      border: '1px solid #dfe3f0',
      boxShadow: 'none',
    }),
    menuList: (base) => ({
      ...base,
      ...commonStyles.menuList(base),
      marginTop: 10,
    }),
    option: (base, state) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
      padding: state.isSelected ? '8px 12px 8px 9px' : '7px 27.4px 9px 11px',
      minHeight: 35,

      '&:not(:hover)': {
        background: 'transparent',
      },

      '&:hover': {
        background: !state.isSelected ? '#dce5fd' : 'transparent',
      },
    }),
  },
};

export default desktopStyles;
