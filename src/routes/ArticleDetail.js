// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

// actions
import * as articleDetailActions from '../actions/articleDetail';

// components
import Header from '../components/Header';
import ReviewForm from '../components/ReviewForm';
import ReviewRow from '../components/ReviewRow';

// entities
import Article from '../entities/Article';

// repositories
import RootRepository from '../repositories/RootRepository';

class ArticleDetail extends Component {
  static fetch(dispatch, params = null) {
    const fetchArticle = () =>
      RootRepository.articles.fetchArticle(params.id)
        .then(res => dispatch(articleDetailActions.fetchArticle(res)));
    const fetchArticleReviews = () =>
      RootRepository.articles.fetchArticleReviews(params.id)
        .then(res => dispatch(articleDetailActions.fetchInitialArticleReviews(res)));
    const fetchPosts = _.concat(fetchArticle(), fetchArticleReviews());
    return Promise.all(fetchPosts);
  }

  // constructor() {
  //   super();
  //   this.handleChangeFocusedCurrency = this.handleChangeFocusedCurrency.bind(this);
  //   this.handleCreatePost = this.handleCreatePost.bind(this);
  //   this.handleCreatePost = this.handleDeletePost.bind(this);
  // }
  //
  componentDidMount() {
    const { dispatch } = this.context;

    const fetchedArticleId = this.props.articleDetail.article.id;
    const isFetched = this.props.routeParams.id === undefined ||
                      Number(this.props.routeParams.id) === fetchedArticleId;

    if (!isFetched) {
      RootRepository.articles.fetchArticle(this.props.routeParams.id)
        .then(res => dispatch(articleDetailActions.fetchArticle(res)))
        .then(() => {
          RootRepository.articles.fetchArticleReviews(this.props.routeParams.id)
            .then(res => dispatch(articleDetailActions.fetchInitialArticleReviews(res)));
        });
    }
    // this.handleChangeFocusedCurrency(match.params.id)
  }
  //
  // handleChangeFocusedCurrency(id) {
  //   const currency = articleDetail.currencies.find(elem => elem.id === id);
  //   this.context.dispatch(articleDetailActions.changeFocusedCurrency(currency));
  // }
  //
  // handleCreatePost(text, images = []) {
  //   const userId = 1;
  //   return RootRepository.posts.createPost(userId, text, images)
  //     .then(res => this.context.dispatch(articleDetailActions.fetchInitialNewArrivalPosts(res)));
  // }
  //
  // handleDeletePost(postId) {
  //   return RootRepository.posts.deletePost(postId)
  //     .then(res => this.context.dispatch(articleDetailActions.fetchInitialNewArrivalPosts(res)));
  // }

  render() {
    // console.log('Article', this.props.articleDetail.article);
    return (
      <div className="article_detail">
        <Header />
        <div className="l_container">
          <div className="l_content_wrapper">
            <div className="l_main_block">
              {
                this.props.articleDetail.isFetched && (
                  <div>
                    {/* ---Article Preview--- */}
                    <div className="article_preview">
                      <a className="preview_header" href={this.props.articleDetail.article.url}>
                        <div className="c_header_img">
                          <img
                            src={this.props.articleDetail.article.imageUrl}
                            alt="article header"
                            className="header_img"
                          />
                        </div>
                        <div className="review_count">
                          <span className="review_count_number">
                            {this.props.articleDetail.article.reviewCountNumber}
                          </span>
                          <span className="review_count_unit">reviews</span>
                        </div>
                      </a>
                      <div className="preview_body">
                        <a
                          className="preview_title_text"
                          href={this.props.articleDetail.article.url}
                        >
                          {this.props.articleDetail.article.title}
                        </a>
                        <div className="preview_categories">
                          {
                            this.props.articleDetail.article.categories.map(category => (
                              <span className="preview_category" key={category.id}>
                                #{category.name}
                              </span>
                            ))
                          }
                        </div>
                        <div className="preview_rating">
                          <span className="preview_rating_star">★</span>
                          <span className="preview_rating_score">
                            {this.props.articleDetail.article.ratingScore}
                          </span>
                        </div>
                        <a
                          className="preview_read_more_btn"
                          href={this.props.articleDetail.article.url}
                        >
                          続きを読む
                        </a>
                      </div>
                    </div>
                    {/* ---Review Form--- */}
                    <div className="l_review_form">
                      <ReviewForm />
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
                        this.props.articleDetail.article.reviews.map(review => (
                          <div className="l_review_row" key={review.id}>
                            <ReviewRow
                              review={review}
                            />
                          </div>
                        ))
                      }
                    </div>

                  </div>
                )
              }
            </div>
            <div className="l_right_sidebar_block">
              関連するツイート
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articleDetail: state.app.articleDetail,
});

ArticleDetail.contextTypes = {
  dispatch: PropTypes.func.isRequired,
};

ArticleDetail.propTypes = {
  articleDetail: PropTypes.shape({
    // TODO: articleではなく、reviewsを含んでいるので直書きして直す
    article: PropTypes.instanceOf(Article).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  routeParams: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(ArticleDetail);