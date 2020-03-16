// styles
import "./SwitchTabs.less";
// external
import React, { useEffect, useState, useRef } from "react";
import { classNames as cn } from "../../utils/index";
import PropTypes from "prop-types";
// internal
import { classNames } from "../../../utils";

export default function SwitchTabs({
  tabs,
  selected,
  onChange,
  currency,
  size,
  type,
  disabled
}) {
  const getSelectedIndex = () => {
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].value === selected) {
        return i;
      }
    }
    return 0;
  };

  const [animation, setAnimation] = useState(false);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      setAnimation(true);
      setTimeout(() => {
        setAnimation(false);
      }, 400);
    } else {
      didMountRef.current = true;
    }
  }, [selected]);

  const { gradient, color } = currency;

  const fillIndicatorStyle = {
    background: gradient
      ? `linear-gradient(45deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`
      : null
  };

  const indicatorWidth = 100 / tabs.length;
  return (
    <div
      className={classNames("SwitchTabs", size, type, { disabled })}
      style={{ color, borderColor: color }}
    >
      {tabs.map(tab => {
        return (
          <div
            key={tab.value}
            className={classNames({
              SwitchTabs__item: true,
              active: tab.value === selected
            })}
            onClick={tab.onClick || (() => onChange(tab.value))}
          >
            <span>{tab.label}</span>
          </div>
        );
      })}
      {selected && (
        <div
          className={cn("SwitchTabs__indicator", { animation })}
          style={{
            width: `calc(${indicatorWidth}% + 2px)`,
            transform: `translateX(calc((100% - 2px) * ${getSelectedIndex()}))`
          }}
        >
          <span style={fillIndicatorStyle} />
        </div>
      )}
    </div>
  );
}

SwitchTabs.defaultProps = {
  currency: {}
};

SwitchTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string
    })
  ).isRequired,
  selected: PropTypes.any,
  currency: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string
};
