// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import ReactModal from 'react-modal';

import _ from 'lodash';

// actions
import * as articleDetailActions from '../actions/articleDetail';
// TODO: コレは単一責任じゃなさすぎるから直す。
import * as headerActions from '../actions/header';

// components
import Header from '../components/Header';
import ReviewForm from '../components/ReviewForm';
import ReviewRow from '../components/ReviewRow';
import ArticlePreviewPlaceHolder from '../components/ArticlePreviewPlaceHolder';
import ReviewFormPlaceHolder from '../components/ReviewFormPlaceHolder';

// entities
import Article from '../entities/Article';
import User from '../entities/User';

// repositories
import RootRepository from '../repositories/RootRepository';

/* eslint no-undef: 0 */

class ArticleDetail extends Component {
  static fetch(dispatch, params = null) {
    const fetchArticle = () =>
      RootRepository().articles.fetchArticle(params.id)
        .then(res => dispatch(articleDetailActions.fetchArticle(res)));
    const fetchArticleReviews = () =>
      RootRepository().articles.fetchArticleReviews(params.id, false)
        .then(res => dispatch(articleDetailActions.fetchInitialArticleReviews(res)));
    const fetchPosts = _.concat(fetchArticle(), fetchArticleReviews());
    return Promise.all(fetchPosts);
  }

  constructor(props) {
    super(props);
    this.state = {
      likeSucceeded: false,
      isFetchingArticle: false,
      isFetchingReviews: false,
      isPostingReview: false,
      likedReviewId: 0,
      reviewSucceeded: false,
      postedReviewErrors: [],
      showReviewModal: false,
    };

    this.handleLoad = this.handleLoad.bind(this);
    this.handlePostRivew = this.handlePostRivew.bind(this);
    this.handlePostLike = this.handlePostLike.bind(this);
    this.handleDeleteLike = this.handleDeleteLike.bind(this);
    this.handleOpenReviewModal = this.handleOpenReviewModal.bind(this);
    this.handleCloseReviewModal = this.handleCloseReviewModal.bind(this);
  }

  componentDidMount() {
    /* eslint react/no-did-mount-set-state: 0 */
    const { dispatch } = this.context;

    const fetchedArticleId = this.props.articleDetail.article.id;
    const isFetched = this.props.routeParams.id === undefined ||
                      Number(this.props.routeParams.id) === fetchedArticleId;

    if (!isFetched) {
      this.setState({ isFetchingArticle: true }, () => {
        RootRepository(window).articles.fetchArticle(this.props.routeParams.id)
          .then((res) => {
            dispatch(articleDetailActions.fetchArticle(res));
            this.setState({ isFetchingArticle: false });
          });
      });
    }

    if (!this.props.articleDetail.isFetchedReviews || !isFetched) {
      this.setState({ isFetchingReviews: true }, () => {
        RootRepository(window).articles.fetchArticleReviews(this.props.routeParams.id)
          .then((res) => {
            dispatch(articleDetailActions.fetchInitialArticleReviews(res));
            this.setState({ isFetchingReviews: false });
          });
      });
    }
  }

  handleLoad() {
    RootRepository(window).articles.fetchArticleReviews(
      this.props.articleDetail.article.id,
      this.props.articleDetail.cursor,
      10,
    ).then((res) => {
      this.context.dispatch(articleDetailActions.fetchNextArticleReviews(res));
    });
  }

  handlePostRivew(text, rating) {
    if (this.props.tokenAuth.isSignedIn) {
      this.setState({ isPostingReview: true }, () => {
        RootRepository(window).articles.createReview(
          this.props.articleDetail.article.id,
          text,
          rating,
        )
          .then((res) => {
            if (res.success) {
              RootRepository(window).articles
                .fetchArticleReviews(this.props.articleDetail.article.id)
                .then(reviews =>
                  this.context.dispatch(articleDetailActions.fetchInitialArticleReviews(reviews)));
            }
            this.setState({
              isPostingReview: false,
              reviewSucceeded: res.success,
              postedReviewErrors: res.errors,
            });
          });
      });
    } else this.context.dispatch(headerActions.toggleAuthModal());
  }

  handlePostLike(reviewId, reviewerId) {
    if (!this.props.tokenAuth.isSignedIn) {
      this.context.dispatch(headerActions.toggleAuthModal());
    } else if (this.props.tokenAuth.currentUser.id !== reviewerId) {
      RootRepository(window).articles.createLike(reviewId)
        // TODO: errorハンドリング
        .then((res) => {
          if (res.success) {
            this.setState({ likeSucceeded: res.success, likedReviewId: reviewId });
          } else this.setState({ likeSucceeded: res.success, likedReviewId: 0 });
        });
    }
  }

  handleDeleteLike(reviewId) {
    RootRepository(window).articles.deleteLIke(reviewId)
      .then(res =>
        // エラー処理
        /* eslint arrow-parens: 0 */
        /* eslint class-methods-use-this: 0 */
        res);
  }

  handleOpenReviewModal() { this.setState({ showReviewModal: true }); }
  handleCloseReviewModal() { this.setState({ showReviewModal: false }); }

  render() {
    const loader = <div className="loader">Loading ...</div>;
    const reviewRows = this.props.articleDetail.article.reviews.map(review => (
      <div className="l_review_row" key={review.id}>
        <ReviewRow
          review={review}
          handlePostLike={() => this.handlePostLike(review.id, review.user.id)}
          handleDeleteLike={this.handleDeleteLike}
          success={this.state.likeSucceeded}
          likedReviewId={this.state.likedReviewId}
        />
      </div>
    ));

    return (
      <div className="article_detail">
        <Header />
        {/* Review Modal */}
        {
          <ReactModal
            isOpen={this.state.showReviewModal}
            onRequestClose={this.handleCloseReviewModal}
            className="review_form_modal modal"
            overlayClassName="overlay"
          >
            <div className="l_modal_title">
              <p className="modal_title">この記事をレビュー</p>
            </div>
            <div className="l_review_form">
              {
                this.state.isPostingReview ?
                  <ReviewFormPlaceHolder bgColor="white" /> :
                  <ReviewForm
                    handlePostRivew={this.handlePostRivew}
                    success={this.state.reviewSucceeded}
                    errors={this.state.postedReviewErrors}
                  />
              }
            </div>
          </ReactModal>
        }
        <div className="l_container">
          <div className="l_content_wrapper">
            <div className="l_main_block">
              <div>
                {/* ---Article Preview--- */}
                {
                  this.state.isFetchingArticle ?
                    <ArticlePreviewPlaceHolder /> :
                    <div className="article_preview">
                      <a
                        className="preview_header"
                        href={this.props.articleDetail.article.url}
                        target="_blank"
                      >
                        <div className="c_header_img">
                          <img
                            src={this.props.articleDetail.article.imageUrl || '/images/logo/default_header.jpg'}
                            alt="article header"
                            className="header_img"
                          />
                        </div>
                        <div className="reviews_count">
                          <span className="reviews_count_number">
                            {this.props.articleDetail.article.reviewsCount}
                          </span>
                          <span className="reviews_count_unit">reviews</span>
                        </div>
                      </a>
                      <div className="preview_body">
                        <a
                          className="preview_title_text"
                          href={this.props.articleDetail.article.url}
                          target="_blank"
                        >
                          {this.props.articleDetail.article.title}
                        </a>
                        <div className="preview_categories">
                          {
                            this.props.articleDetail.article.categories &&
                            this.props.articleDetail.article.categories.map(category => (
                              <span className="preview_category" key={category.id}>
                                #{category.name}
                              </span>
                            ))
                          }
                        </div>
                        <div className="preview_rating">
                          <span className="preview_rating_star">★</span>
                          <span className="preview_average_rating">
                            {this.props.articleDetail.article.averageRating}
                          </span>
                        </div>
                        <a
                          className="preview_read_more_btn"
                          href={this.props.articleDetail.article.url}
                          target="_blank"
                        >
                            続きを読む
                        </a>
                      </div>
                    </div>
                }
                {/* ---Review Form--- */}
                <div className="l_review_form">
                  {
                    this.state.isPostingReview ?
                      <ReviewFormPlaceHolder bgColor="gray" /> :
                      <ReviewForm
                        handlePostRivew={this.handlePostRivew}
                        success={this.state.reviewSucceeded}
                        errors={this.state.postedReviewErrors}
                      />
                  }
                </div>
                <div className="modal_review_form">
                  {
                    this.props.tokenAuth ?
                      <img
                        src={this.props.tokenAuth ? this.props.tokenAuth.currentUser.imageUrl : ''}
                        alt="user profile"
                        className="modal_review_form_user_img"
                      /> :
                      <span className="modal_review_form_user_img" />
                  }
                  <button className="modal_review_form_btn" onClick={this.handleOpenReviewModal}>
                    <img
                      src="/images/logo/review_icon_cyan.jpg"
                      alt="review icon"
                      className="modal_review_form_btn_icon"
                    />
                    <span className="modal_review_form_btn_text">この記事をレビュー</span>
                  </button>
                </div>
                {/* ---Review List--- */}
                <div className="review_list">
                  <div className="l_review_list_header">
                    <div className="review_list_header">
                      <p className="review_list_header_text">reviews</p>
                      <div className="review_list_header_border" />
                    </div>
                  </div>
                  {
                    this.state.isFetchingReviews ?
                      <img
                        src="/images/loader_gray.gif"
                        alt="preloader"
                        className="reviews_preload"
                      /> :
                      <InfiniteScroll
                        loadMore={this.handleLoad}
                        hasMore={this.props.articleDetail.hasNext}
                        loader={loader}
                        initialLoad={false}
                      >
                        {
                          reviewRows.length > 0 ?
                           reviewRows :
                           <p className="no_reviews">まだコメントがありません。</p>
                        }
                      </InfiniteScroll>
                  }
                </div>
              </div>
            </div>
            <div className="l_right_sidebar_block">
                関連するツイート
              <p className="soon">Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articleDetail: state.app.articleDetail,
  tokenAuth: state.app.tokenAuth,
});

ArticleDetail.contextTypes = {
  dispatch: PropTypes.func.isRequired,
};

ArticleDetail.propTypes = {
  articleDetail: PropTypes.shape({
    // TODO: articleではなく、reviewsを含んでいるので直書きして直す
    article: PropTypes.instanceOf(Article).isRequired,
    isFetchedArticle: PropTypes.bool.isRequired,
    isFetchedReviews: PropTypes.bool.isRequired,
    cursor: PropTypes.string.isRequired,
    hasNext: PropTypes.bool.isRequired,
  }).isRequired,
  tokenAuth: PropTypes.shape({
    isSignedIn: PropTypes.bool.isRequired,
    currentUser: PropTypes.instanceOf(User).isRequired,
  }).isRequired,
  routeParams: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(ArticleDetail);
