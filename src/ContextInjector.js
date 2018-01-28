// libs
import React from 'react';
import PropTypes from 'prop-types';

// entities
import User from './entities/User';

class ContextInjector extends React.Component {
  getChildContext() {
    return {
      dispatch: this.props.dispatch,
      userData: this.props.userData,
    };
  }

  render() { return this.props.children; }
}

ContextInjector.childContextTypes = {
  dispatch: PropTypes.func.isRequired,
  userData: PropTypes.instanceOf(User).isRequired,
};

ContextInjector.propTypes = {
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
  userData: PropTypes.instanceOf(User).isRequired,
};

export default ContextInjector;
