import "./Select.less";
import React from "react";
import Select from "react-select";
import { getCssVar } from "../../../utils";
import SVG from "react-inlinesvg";
import hexToRgba from "hex-to-rgba";

const customStyles = {
  control: provided => ({
    ...provided,
    border: "none",
    borderRadius: 8,
    boxShadow: getCssVar("--main-shadow"),
    minHeight: 48
  }),
  indicatorSeparator: () => ({
    display: "none",
    marginRight: 12
  }),
  indicatorsContainer: provided => ({
    ...provided,
    marginRight: 12
  }),
  dropdownIndicator: () => ({
    padding: 0
  }),
  valueContainer: provided => ({
    ...provided,
    padding: "12px 16px",
    margin: "-4px 0",
    fontSize: 14,
    minHeight: 48,
    lineHeight: "16px"
  }),
  multiValue: provided => ({
    ...provided,
    margin: 4,
    marginRight: 8,
    marginLeft: 0,
    borderRadius: 4,
    backgroundColor: "#EDF0F5"
  }),
  multiValueLabel: provided => ({
    ...provided,
    fontWeight: 500,
    fontSize: 11,
    lineHeight: "16px",
    padding: "4px 8px"
  }),
  noOptionsMessage: provided => ({
    ...provided,
    fontSize: 14,
    lineHeight: "16px",
    color: getCssVar("--gray")
  }),
  input: provided => ({
    ...provided
  }),
  menu: provided => ({
    ...provided,
    border: "none",
    boxShadow: getCssVar("--main-shadow")
  }),
  option: (provided, state) => {
    let bg = null;
    if (state.isFocused) bg = hexToRgba(getCssVar("--light-gray"), 0.2);
    if (state.isSelected) bg = hexToRgba(getCssVar("--primary-orange"), 0.3);

    return {
      ...provided,
      color: getCssVar("--black"),
      padding: "12px 16px",
      fontSize: 14,
      backgroundColor: bg,
      lineHeight: "16px"
    };
  },
  placeholder: provider => ({
    ...provider,
    color: getCssVar("--dark-gray")
  })
};

export default props => {
  return (
    <Select
      {...props}
      components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
      className="Select"
      styles={customStyles}
    />
  );
};

const MultiValueRemove = props => {
  return (
    <div className="Select__remove" onClick={props.innerProps.onClick}>
      <SVG src={require("src/asset/24px/close-xs.svg")} />
    </div>
  );
};

const ClearIndicator = props => {
  return (
    <div className="Select__arrow" onClick={props.clearValue}>
      <SVG src={require("src/asset/24px/close-small.svg")} />
    </div>
  );
};

const DropdownIndicator = props => {
  return (
    <div className="Select__arrow">
      <SVG src={require("src/asset/24px/angle-down-small.svg")} />
    </div>
  );
};
