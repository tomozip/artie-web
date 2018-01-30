// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactModal from 'react-modal';

// icons
import SearchIcon from 'react-icons/lib/md/search';
import TwitterIcon from 'react-icons/lib/fa/twitter';

// actions
import * as headerActions from '../actions/header';
import * as tokenAuthActions from '../actions/tokenAuth';

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
      showReviewModal: false,
    };

    this.handleOpenReviewModal = this.handleOpenReviewModal.bind(this);
    this.handleCloseReviewModal = this.handleCloseReviewModal.bind(this);
    this.handleUrlTextChange = this.handleUrlTextChange.bind(this);
    this.handlePostArticle = this.handlePostArticle.bind(this);
    this.handleToggleAuthModal = this.handleToggleAuthModal.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleOpenReviewModal() {
    if (this.props.tokenAuth.isSignedIn) {
      this.setState({ showReviewModal: true });
    } else {
      this.handleToggleAuthModal();
    }
  }

  handleCloseReviewModal() {
    this.setState({ showReviewModal: false });
  }

  handleUrlTextChange(e) {
    this.setState({ url: e.target.value });
  }

  handleToggleAuthModal() {
    this.context.dispatch(headerActions.toggleAuthModal());
  }

  handlePostArticle(text, rating) {
    RootRepository(window)
      .articles.createArticle(this.state.url, text, rating)
      .then(() => {
        // TODO: エラー処理
        this.handleCloseReviewModal();
        this.setState({ url: '' });
      });
  }

  handleSignIn() {
    // TODO: refactor
    const windowLogin = window.open('http://localhost:3001/auth/twitter', null, '');
    let count = 0;
    const repeatPost = setInterval(() => {
      windowLogin.postMessage('requestCredentials', '*');
      count += 1;
      if (windowLogin.closed || count > 60) {
        clearInterval(repeatPost);
        windowLogin.close();
      }
    }, 1000);

    window.addEventListener('message', (ev) => {
      if (ev.origin === 'http://localhost:3001') {
        const data = {
          id: ev.data.id,
          imageUrl: ev.data.image_data,
          fullName: ev.data.fullname,
          uId: '872072265785106432',
          client: '99T2ZmGilrD9tlRiTallCA',
          accessToken: 'BuAThl1dq6At_bHEogvc4A',
        };
        this.context.dispatch(tokenAuthActions.signIn(data));
        this.handleToggleAuthModal();
      }
    });
  }

  render() {
    return (
      <div className="header">
        <ReactModal
          isOpen={this.props.header.showAuthModal}
          onRequestClose={this.handleToggleAuthModal}
          className="auth_modal modal"
          overlayClassName="overlay"
        >
          <div className="l_modal_title">
            <p className="modal_title">ログインしてArtieに参加</p>
          </div>
          <div className="l_modal_description">
            <p className="modal_description">ログインすることで、レビューやいいねなどが可能になります！</p>
          </div>
          <div className="btn_list">
            <button className="twitter_btn" onClick={this.handleSignIn}>
              <TwitterIcon className="twitter_icon" />
              <span className="btn_text">Twitterでログイン</span>
            </button>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={this.state.showReviewModal}
          onRequestClose={this.handleCloseReviewModal}
          className="review_modal modal"
          overlayClassName="overlay"
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
            <img
              className="header_user_image"
              src={this.props.tokenAuth.currentUser.imageUrl}
              alt="profile"
            />
            <p className="header_user_name">{this.props.tokenAuth.currentUser.fullName}</p>
          </div>
          <div className="l_review_btn">
            <ReviewBtn
              onClick={this.handleOpenReviewModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  header: state.app.header,
  tokenAuth: state.app.tokenAuth,
});

Header.contextTypes = {
  dispatch: PropTypes.func.isRequired,
};

Header.propTypes = {
  header: PropTypes.shape({
    showAuthModal: PropTypes.bool.isRequired,
  }).isRequired,
  tokenAuth: PropTypes.shape({
    isSignedIn: PropTypes.bool.isRequired,
    currentUser: PropTypes.instanceOf(User).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
