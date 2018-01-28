// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from 'material-ui/Slider';

// components
import ReviewBtn from './ReviewBtn';

// icons
// import AddImages from 'react-icons/lib/fa/image';

/* eslint react/prefer-stateless-function: 0 */

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      rating: 1.0,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSliderChange(event, value) {
    this.setState({ rating: value });
  }

  handleClick(e) {
    this.props.handlePostRivew(this.state.text, this.state.rating);
    e.preventDefault();
  }

  //
  // handleChange(e) {
  //   this.setState({ text: e.target.value });
  // }
  //
  // handleClick(e) {
  //   this.props.onClick(this.state.text);
  //   e.preventDefault();
  // }

  render() {
    return (
      <div className="review_form">
        <div className="form_left_block">
          <img src={this.context.userData.imageData} alt="user profile" className="form_user_img" />
        </div>
        <div className="form_right_block">
          <textarea
            className="form_area"
            placeholder="コメントを入力（任意）"
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          <div className="form_bottom_block">
            <div className="c_form_rating">
              <MuiThemeProvider>
                <span className="form_rating_score">{this.state.rating.toFixed(1)}</span>
                <Slider
                  className="slider"
                  min={1}
                  max={5}
                  step={0.1}
                  value={this.state.rating}
                  defaultValue={1.0}
                  onChange={this.handleSliderChange}
                />
              </MuiThemeProvider>
            </div>
            <div className="c_form_post">
              <ReviewBtn
                onClick={this.handleClick}
              />
            </div>
          </div>
        </div>
        {/* <div className="post_left_block">
          <img className="post_user_img" src="https://placehold.jp/150x150.png" alt="profile" />
        </div>
        <div className="post_right_block">
          <textarea
            className="post_form_text_area"
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="You're feeding..."
          />
          <div className="post_right_block_bottom">
            <AddImages className="add_images_icon" />
            <button className="submit_btn" onClick={this.handleClick}>
              <Send className="send_icon" />
              <span className="send_text">Post</span>
            </button>
          </div>
        </div> */}
      </div>
    );
  }
}

ReviewForm.propTypes = {
  handlePostRivew: PropTypes.func.isRequired,
};

ReviewForm.contextTypes = {
  userData: PropTypes.shape({
    imageData: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReviewForm;
