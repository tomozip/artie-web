// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// icons
import ArrowDownIcon from 'react-icons/lib/md/keyboard-arrow-down';
import BrightThumbsUpIcon from 'react-icons/lib/fa/thumbs-up';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/fontawesome-free-regular';

// entities
import Review from '../entities/Review';

/* eslint react/prefer-stateless-function: 0 */

class ReviewRow extends Component {
  render() {
    return (
      <div className="review_row">
        <div className="row_left_block">
          <img
            src={this.props.review.user.imageUrl}
            alt="review user profile"
            className="row_user_img"
          />
          {/* TODO: evaluationを実装 */}
          <div className="user_evaluation_point" />
        </div>
        <div className="row_right_block">
          <div className="row_meta_block">
            <div className="row_meta_left_block">
              <p className="user_name">{this.props.review.user.name}</p>
              <p className="review_posted_date">{this.props.review.publishedAt}</p>
            </div>
            <div className="row_meta_right_block">
              <ArrowDownIcon className="arrow_down_icon" />
            </div>
          </div>
          <div className="row_rating">
            <div className="c_row_rating_stars">
              <span className="row_rating_stars_track">★★★★★</span>
              <span className="row_rating_stars">★★★★★</span>
            </div>
            <span className="row_rating_point">{this.props.review.rating}</span>
          </div>
          <p className="review_text">{this.props.review.text}</p>
          <div className="row_bottom_block">
            <div className="row_like_block">
              <FontAwesomeIcon icon={faThumbsUp} className="thumbs_up_icon" />
              <span className="review_likes_count">{this.props.review.likes}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReviewRow.propTypes = {
  review: PropTypes.instanceOf(Review).isRequired,
}

export default ReviewRow;
