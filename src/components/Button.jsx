import React from "react";
import PropTypes from 'prop-types';
import "../index.css";

const Button = ({ onClick, isHidden }) => (
  <button
    type="button"
    className="Button"
    onClick={onClick} 
    style={{ display: isHidden ? 'none' : 'block' }}
  >
    Load more
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired, 
  // isHidden: PropTypes.bool.isRequired, 
};

export default Button;