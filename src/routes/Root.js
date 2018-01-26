import React from 'react';
import PropTypes from 'prop-types';

const Root = props => (
  <div className="l_wrapper">
    {props.children}
  </div>
);

Root.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Root;
