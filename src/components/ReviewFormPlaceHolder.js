// libs
import React from 'react';
import PropTypes from 'prop-types';

const ArticlePreviewPlaceHolder = props => (
  <div className="review_form_place_holder">
    <img
      src={props.bgColor === 'white' ? '/images/loader_white.gif' : '/images/loader_gray.gif'}
      alt="preloader"
      className="preloader"
    />
  </div>
);

ArticlePreviewPlaceHolder.propTypes = {
  bgColor: PropTypes.string.isRequired,
};

export default ArticlePreviewPlaceHolder;
