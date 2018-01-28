// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// icon
import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import Send from 'react-icons/lib/md/send';
import BrightThumbsUp from 'react-icons/lib/fa/thumbs-up';
import BrightThumbsDown from 'react-icons/lib/fa/thumbs-down';
import Share from 'react-icons/lib/ti/arrow-forward-outline';
import BrightShare from 'react-icons/lib/ti/arrow-forward';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/fontawesome-free-regular';

// entities
import Post from '../entities/Post';

class PostPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPostMenuModal: false,
    };

    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  handleToggleModal() {
    const toggled = !this.state.showPostMenuModal;
    this.setState({ showPostMenuModal: toggled });
  }

  render() {
    return (
      <div className="post_panel">
        <div className="post_left_block">
          <div className="l-post_user_img">
            <img className="post_user_img" src={this.props.post.user.imageUrl} alt="profile" />
          </div>
          <div className="evaluation_drop" />
          <div className="evaluation_drop" />
          <div className="evaluation_block">
            <span className="evalulation_text">{this.props.post.user.evaluation}</span>
          </div>
        </div>
        <div className="post_right_block">
          {this.state.showPostMenuModal && (
            <div className="post_menu_modal">
              <button
                className="post_menu_modal_row"
                onClick={() => this.props.handleDeletePost(this.props.post.id)}
              >
                <span className="post_menu_modal_row_text">投稿を削除</span>
              </button>
            </div>)}
          <div className="post_topbar">
            <div className="post_topbar_left">
              <span className="post_user_display_name">{this.props.post.user.displayName}</span>
              <span className="post_user_account_name">@{this.props.post.user.accountName}</span>
            </div>
            <div className="post_topbar_right">
              {
                this.props.post.hashtags.map(hashtag => (
                  <div className="post_hashtag_block" key={hashtag.id}>
                    <span className="post_hashtag">#{hashtag.name}</span>
                  </div>
                ))
              }
              <span className="post_date">{this.props.post.createdAt}</span>
              <button onClick={this.handleToggleModal}>
                <ArrowDown className="post_arrow_down_icon" />
              </button>
            </div>
          </div>
          <div className="post_body">
            <p className="post_body_text">{this.props.post.text}</p>
          </div>
          <div className="post_action_list">
            <div className="post_action_block">
              <FontAwesomeIcon icon={faThumbsUp} className="action_icon thumbs_up_icon" />
              <div className="l-post_action_amount">
                <span className="post_action_amount">{this.props.post.reaction.like}</span>
              </div>
            </div>
            <div className="post_action_block">
              <FontAwesomeIcon icon={faThumbsDown} className="action_icon thumbs_down_icon" />
              <div className="l-post_action_amount">
                <span className="post_action_amount">{this.props.post.reaction.dislike}</span>
              </div>
            </div>
            <div className="post_action_block">
              <Share className="action_icon share_square_icon" />
              <div className="l-post_action_amount">
                <span className="post_action_amount">{this.props.post.reaction.share}</span>
              </div>
            </div>
            {/* <BrightThumbsUp className="action_icon bright_thumbs_up_icon" />
            <BrightThumbsDown className="action_icon bright_thumbs_down_icon" /> */}
            {/* <BrightShare className="action_icon share_square_icon" /> */}
          </div>
          <div className="post_reply_area_container">
            <textarea className="post_reply_area" placeholder="返信する..." />
            <Send className="send_icon" />
          </div>
        </div>
      </div>
    );
  }
}

PostPanel.propTypes = {
  post: PropTypes.instanceOf(Post).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostPanel;
