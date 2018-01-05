import React from 'react';
import PropTypes from 'prop-types';

const Root = props => (
  <div className="l-wrapper">
    {props.children}
  </div>
);

Root.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Root;
