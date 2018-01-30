// libs
import React from 'react';
import PropTypes from 'prop-types';

class ContextInjector extends React.Component {
  getChildContext() {
    return {
      dispatch: this.props.dispatch,
    };
  }

  render() { return this.props.children; }
}

ContextInjector.childContextTypes = {
  dispatch: PropTypes.func.isRequired,
};

ContextInjector.propTypes = {
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ContextInjector;
