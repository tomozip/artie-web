// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// icon
import AddImages from 'react-icons/lib/fa/image';
import Send from 'react-icons/lib/md/send';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleClick(e) {
    this.props.onClick(this.state.text, this.state.rating);
    e.preventDefault();
  }

  render() {
    return (
      <div className="post_form">
        <div className="post_left_block">
          {/* <img className="post_user_img" src={context.user.imageUrl} alt="profile" /> */}
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
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default PostForm;
