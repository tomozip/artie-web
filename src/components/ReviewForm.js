// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from 'material-ui/Slider';

// components
import ReviewBtn from './ReviewBtn';

// entities
import User from '../entities/User';

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
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSliderChange(event, value) {
    this.setState({ rating: value });
  }

  handleClick(e) {
    this.props.handlePostRivew(this.state.text, this.state.rating.toFixed(1));
    e.preventDefault();
    this.setState({ text: '', rating: 1.0 });
  }

  render() {
    return (
      <div className="review_form">
        <div className="form_left_block">
          {
            this.props.tokenAuth ?
              <img
                src={this.props.tokenAuth.currentUser.imageUrl}
                alt="user profile"
                className="form_user_img"
              /> :
              <div className="form_user_img" />
          }
        </div>
        <div className="form_right_block">
          <textarea
            className="form_area"
            placeholder="コメントを入力...（任意）"
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          <div className="form_bottom_block">
            <div className="c_form_rating">
              <MuiThemeProvider>
                <span className="form_average_rating">{this.state.rating.toFixed(1)}</span>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tokenAuth: state.app.tokenAuth,
});

ReviewForm.contextTypes = {
  dispatch: PropTypes.func.isRequired,
};

ReviewForm.propTypes = {
  handlePostRivew: PropTypes.func.isRequired,
  tokenAuth: PropTypes.shape({
    isSignedIn: PropTypes.bool.isRequired,
    currentUser: PropTypes.instanceOf(User).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(ReviewForm);
