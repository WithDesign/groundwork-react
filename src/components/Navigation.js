import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
};

const defaultProps = {
  className: '',
  buttonClassName: '',
};

function Navigation({ className, buttonClassName }) {
  return (
    <nav className={`nav ${className}`}>
      <ul className="list-plain no-pad no-mar">
        <li><Link className={buttonClassName} to="/">Home</Link></li>
      </ul>
    </nav>
  );
}

Navigation.PropTypes = propTypes;
Navigation.defaultProps = defaultProps;

export default Navigation;
