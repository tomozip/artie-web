// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

// actions
// import * as currencyDetailActions from '../actions/articleDetail';

// components
import Header from '../components/Header';
import ReviewForm from '../components/ReviewForm';
import ReviewRow from '../components/ReviewRow';

// entities
import Article from '../entities/Article';

// repositories
// import RootRepository from '../repositories/RootRepository';

/* eslint react/prefer-stateless-function: 0 */

class ArticleDetail extends Component {
  // static fetch(dispatch, params = null) {
  //   const fetchCurrencyPosts = () =>
  //     RootRepository.posts.fetchCurrencyPosts(
  //       articleDetail.focusedCurrncy.id,
  //       params.page,
  //     ).then(res => dispatch(currencyDetailActions.fetchInitialCurrencyDetailPosts(res)));
  //   const fetchCurrencies = () =>
  //     RootRepository.currency.fetchCurrencies(params.page)
  //       .then(res => dispatch(currencyDetailActions.fetchCurrencies(res)));
  //   const fetchPosts = _.concat(fetchCurrencyPosts(), fetchCurrencies());
  //   return Promise.all(fetchPosts);
  // }

  // constructor() {
  //   super();
  //   this.handleChangeFocusedCurrency = this.handleChangeFocusedCurrency.bind(this);
  //   this.handleCreatePost = this.handleCreatePost.bind(this);
  //   this.handleCreatePost = this.handleDeletePost.bind(this);
  // }
  //
  // componentDidMount() {
  //   this.handleChangeFocusedCurrency(match.params.id)
  // }
  //
  // handleChangeFocusedCurrency(id) {
  //   const currency = articleDetail.currencies.find(elem => elem.id === id);
  //   this.context.dispatch(currencyDetailActions.changeFocusedCurrency(currency));
  // }
  //
  // handleCreatePost(text, images = []) {
  //   const userId = 1;
  //   return RootRepository.posts.createPost(userId, text, images)
  //     .then(res => this.context.dispatch(currencyDetailActions.fetchInitialNewArrivalPosts(res)));
  // }
  //
  // handleDeletePost(postId) {
  //   return RootRepository.posts.deletePost(postId)
  //     .then(res => this.context.dispatch(currencyDetailActions.fetchInitialNewArrivalPosts(res)));
  // }

  render() {
    const article = {
      id: 1,
      url: "",
      reviewCountNumber: 128,
      title: "大寒波到来！気象庁による緊急勧告、5年ぶりああああああああああああああああああああ",
      imageUrl: "https://placehold.jp/500x120.png",
      categories: [{
          id: 1,
          name: "技術",
          created_at: "1998-02-25",
          updated_at: "1998-02-25"
        },
        {
          id: 2,
          name: "初心者向け",
          created_at: "1998-02-25",
          updated_at: "1998-02-25"
        }
      ],
      ratingScore: 4.2,
      reviews: [
        {
          id: 1,
          user: {
            id: 1,
            name: "shimatomo",
            imageUrl: "https://placehold.jp/100x100.png",
            evaluation: 3,
          },
          rating: 4.2,
          text: "外資系コンサルティング会社にいた頃から、経営陣に近い立場で仕事をする機会が多かったが、その理由が良く分かった。",
          likes: 72,
          publishedAt: "3時間前",
        },
        {
          id: 2,
          user: {
            id: 1,
            name: "shimatomo",
            imageUrl: "https://placehold.jp/100x100.png",
            evaluation: 3,
          },
          rating: 4.2,
          text: "外資系コンサルティング会社にいた頃から、経営陣に近い立場で仕事をする機会が多かったが、その理由が良く分かった。",
          likes: 72,
          publishedAt: "3時間前",
        },
      ]
    }

    return (
      <div className="article_detail">
        <Header />
        <div className="l_container">
          <div className="l_content_wrapper">
            <div className="l_main_block">
              {/* Article Preview */}
              <div className="article_preview">
                <a className="preview_header" href={article.url}>
                  <div className="c_header_img">
                    <img src={article.imageUrl} alt="article header" className="header_img" />
                  </div>
                  <div className="review_count">
                    <span className="review_count_number">{article.reviewCountNumber}</span>
                    <span className="review_count_unit">reviews</span>
                  </div>
                </a>
                <div className="preview_body">
                  <a className="preview_title_text" href={article.url}>{article.title}</a>
                  <div className="preview_categories">
                    {
                        article.categories.map(category => (
                          <span className="preview_category" key={category.id}>#{category.name}</span>
                        ))
                      }
                  </div>
                  <div className="preview_rating">
                    <span className="preview_rating_star">★</span>
                    <span className="preview_rating_score">{article.ratingScore}</span>
                  </div>
                  <a className="preview_read_more_btn" href={article.url}>続きを読む</a>
                </div>
              </div>
              {/* Review Form */}
              <div className="l_review_form">
                <ReviewForm />
              </div>
              {/* Review List */}
              <div className="review_list">
                <div className="l_review_list_header">
                  <div className="review_list_header">
                    <p className="review_list_header_text">reviews</p>
                    <div className="review_list_header_border" />
                  </div>
                </div>
                {
                  article.reviews.map(review => (
                    <div className="l_review_row" key={review.id}>
                      <ReviewRow
                        review={review}
                      />
                    </div>
                  ))
                }
              </div>
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

// ArticleDetail.contextTypes = {
//   dispatch: PropTypes.func.isRequired,
// };
//
ArticleDetail.propTypes = {
  articleDetail: PropTypes.shape({
    article: PropTypes.instanceOf(Article).isRequired,
  }).isRequired,
  // match: PropTypes.shape({
  //   params: PropTypes.shape({
  //     // TODO: ここstringなのか確かめる
  //     id: PropTypes.string.isRequired,
  //   }).isRequired,
  // }).isRequired,
};

export default connect(mapStateToProps)(ArticleDetail);
