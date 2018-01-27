// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import ReviewBtn from './ReviewBtn';

// icons
// import AddImages from 'react-icons/lib/fa/image';

class ReviewForm extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     text: '',
  //   };
  //
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleClick = this.handleClick.bind(this);
  // }
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
    const user = {
      image_url: "https://placehold.jp/100x100.png"
    };
    const form = {
      score: 4.2
    };

    return (
      <div className="review_form">
        <div className="form_left_block">
          <img src={user.image_url} alt="user profile" className="form_user_img" />
        </div>
        <div className="form_right_block">
          <textarea className="form_area" placeholder="コメントを入力（任意）" />
          <div className="form_bottom_block">
            <div className="c_form_rating">
              <span className="form_rating_score">{form.score}</span>
            </div>
            <div className="c_form_post">
              <ReviewBtn />
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

// ReviewForm.propTypes = {
//   onClick: PropTypes.func.isRequired,
// }

export default ReviewForm;
