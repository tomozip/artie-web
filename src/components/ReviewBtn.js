import React from 'react';
import PropTypes from 'prop-types';

const ReviewBtn = props => (
  <button className="review_btn" onClick={props.onClick}>
    <span className="review_btn_text">review</span>
  </button>
);

ReviewBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ReviewBtn;
