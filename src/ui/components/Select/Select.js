import "./Select.less";
import React from "react";
import Select from "react-select";
import { getCssVar } from "../../../utils";
import { classNames as cn } from "../../utils";
import SVG from "react-inlinesvg";

export const customStyles = {
  control: (provided, { isDisabled }) => ({
    ...provided,
    border: "none",
    borderRadius: 8,
    boxShadow: getCssVar("--main-shadow"),
    backgroundColor: isDisabled ? "#FAFAFA" : getCssVar("--white"),
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
    if (state.isFocused) bg = getCssVar("--cloudy");
    if (state.isSelected) bg = getCssVar("--cloudy");

    return {
      ...provided,
      color: getCssVar("--black"),
      padding: "12px 16px",
      fontSize: 14,
      backgroundColor: bg,
      lineHeight: "16px",
      ":hover": {
        backgroundColor: getCssVar("--alice-blue")
      },
      ":active": {
        backgroundColor: getCssVar("--cloudy")
      }
    };
  },
  placeholder: provider => ({
    ...provider,
    color: getCssVar("--text-black")
  })
};

const formatOptionLabel = ({ value, label, icon }) => (
  <div className="Select__option" style={{ display: "flex" }}>
    {icon && <div className="Select__option__icon">{icon}</div>}
    <span className="Select__option__label">{label}</span>
  </div>
);

export default props => {
  return (
    <Select
      {...props}
      formatOptionLabel={formatOptionLabel}
      components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
      className={cn("Select", props.className)}
      value={
        typeof props.value === "object"
          ? props.value
          : props.options.find(o => o.value === props.value)
      }
      styles={{
        ...customStyles,
        ...props.styles
      }}
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
