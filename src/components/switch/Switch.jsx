import React from "react";
import PropTypes from "prop-types";

import "./switch.scss";

const Switch = ({
  check,
  isChecked = false,
  leftTitle = "",
  rightTitle = "",
}) => {
  const trackStyles = { left: isChecked ? "calc(100% - 23px)" : "0" };
  const switchClassName = isChecked ? "switch switch-on" : "switch switch-off";

  return (
    <div onClick={check} aria-hidden="true" className={switchClassName}>
      <div className="switch__title switch__title-left">{leftTitle}</div>
      <div className="switch__title switch__title-right">{rightTitle}</div>
      <div style={trackStyles} className="switch__track"></div>
    </div>
  );
};

Switch.propTypes = {
  check: PropTypes.func,
  isChecked: PropTypes.bool,
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
};

export default Switch;
