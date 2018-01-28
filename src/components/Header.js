// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactModal from 'react-modal';

// icons
import SearchIcon from 'react-icons/lib/md/search';

// components
import ReviewForm from './ReviewForm';
import ReviewBtn from './ReviewBtn';

// entities
import User from '../entities/User';

// repositories
import RootRepository from '../repositories/RootRepository';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleUrlTextChange = this.handleUrlTextChange.bind(this);
    this.handlePostArticle = this.handlePostArticle.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleUrlTextChange(e) {
    this.setState({ url: e.target.value });
  }

  handlePostArticle(text, rating) {
    RootRepository.articles.createArticle(this.state.url, text, rating)
      .then(() => {
        // TODO: エラー処理
        this.handleCloseModal();
        this.setState({ url: '' });
      });
  }

  render() {
    return (
      <div className="header">
        <ReactModal
          isOpen={this.state.showModal}
          // contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className="review_modal"
          overlayClassName="review_modal_overlay"
        >
          <div className="l_modal_title">
            <p className="modal_title">review</p>
          </div>
          <div className="l_modal_url_input">
            <input
              className="modal_url_input"
              placeholder="おすすめ記事のURLを入力..."
              value={this.state.url}
              onChange={this.handleUrlTextChange}
            />
            <div className="modal_url_input_border" />
          </div>
          <div className="l_review_form">
            <ReviewForm
              handlePostRivew={this.handlePostArticle}
            />
          </div>
        </ReactModal>
        <div className="header_left_block">
          <div className="header_search_block">
            <input className="header_search_input" placeholder="検索" />
            <SearchIcon className="header_search_icon" />
          </div>
        </div>
        <div className="c_header_logo">
          <Link to="/" className="header_logo">Artie</Link>
        </div>
        <div className="header_right_block">
          <div className="header_user_block">
            <img className="header_user_image" src={this.context.userData.imageUrl} alt="profile" />
            <p className="header_user_name">{this.context.userData.fullName}</p>
          </div>
          <div className="l_review_btn">
            <ReviewBtn
              onClick={this.handleOpenModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

Header.contextTypes = {
  userData: PropTypes.instanceOf(User).isRequired,
};

export default Header;
