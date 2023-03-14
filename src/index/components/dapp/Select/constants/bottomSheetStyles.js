
const bottomSheetStyles = (desktopStyles) => ({
  ...desktopStyles,
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
});

export default bottomSheetStyles;
