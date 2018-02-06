import React from 'react';
import PropTypes from 'prop-types';

const ReviewBtn = props => (
  <button className="review_btn" onClick={props.onClick}>
    <img src="/images/logo/review_icon_white.png" alt="review icon" className="review_btn_icon" />
    <span className="review_btn_text">レビュー</span>
  </button>
);

ReviewBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ReviewBtn;
