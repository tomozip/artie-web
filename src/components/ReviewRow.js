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

class ReviewRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: this.props.review.isLiked,
      likesCount: this.props.review.likesCount,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success && nextProps.likedReviewId === this.props.review.id) {
      this.setState({
        isLiked: true,
        likesCount: this.state.likesCount + 1,
      });
    }
    // serverでは無かったlikedを表示用
    if (nextProps.review.isLiked !== this.state.isLiked) {
      this.setState({ isLiked: nextProps.review.isLiked });
    }
  }

  handleClick() {
    if (this.state.isLiked) {
      this.props.handleDeleteLike(this.props.review.id);
      this.setState({
        isLiked: false,
        likesCount: this.state.likesCount - 1,
      });
    } else this.props.handlePostLike();
  }

  render() {
    const style = {
      width: `${this.props.review.rating * 20}%`,
    };
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
              <p className="user_name">{this.props.review.user.fullName}</p>
              <p className="review_posted_date">{this.props.review.postedAt}</p>
            </div>
            <div className="row_meta_right_block">
              <ArrowDownIcon className="arrow_down_icon" />
            </div>
          </div>
          <div className="row_rating">
            <div className="c_row_rating_stars">
              <span className="row_rating_stars_track">★★★★★</span>
              <span
                className="row_rating_stars"
                style={style}
              >
                ★★★★★
              </span>
            </div>
            <span className="row_rating_point">{this.props.review.rating}</span>
          </div>
          <p className="review_text">{this.props.review.text}</p>
          <div className="row_bottom_block">
            <div className="row_like_block">
              {
                this.state.isLiked ?
                  <BrightThumbsUpIcon
                    className="bright_thumbs_up_icon"
                    onClick={this.handleClick}
                  /> :
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className="thumbs_up_icon"
                    onClick={this.handleClick}
                  />
              }
              <span className="review_likes_count">{this.state.likesCount}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReviewRow.propTypes = {
  review: PropTypes.instanceOf(Review).isRequired,
  handlePostLike: PropTypes.func.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  likedReviewId: PropTypes.number.isRequired,
};

export default ReviewRow;
