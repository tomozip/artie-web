// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

// actions
// import * as topArticleActions from '../actions/topArticle';

// components
import Header from '../components/Header';
import ArticleList from '../components/ArticleList';

// entities
// import Post from '../entities/Post';

// repositories
// import RootRepository from '../repositories/RootRepository';

// FIXME: rename this class to 'Feed'
class TopArticleList extends Component {
  // ここからrenderまでかなりCurrencyDetailとかぶる部分が多い。
  // FIXME: refactoring
  // static fecth(dispatch, params = null) {
    // const fetchFeedPosts = () =>
    //   RootRepository.posts.fetchFeedPosts(params.page)
    //     .then(res => dispatch(topArticleActions.fetchInitialNewArrivalPosts(res)));
    // const fetchPosts = _.concat(fetchFeedPosts());
    // return Promise.all(fetchPosts);
  // }

  // constructor() {
    // super();
    // this.handleCreatePost = this.handleCreatePost.bind(this);
    // this.handleCreatePost = this.handleDeletePost.bind(this);
  // }

  // handleCreatePost(text, images = []) {
    // const userId = 1;
    // return RootRepository.posts.createPost(userId, text, images)
    //   .then(res => this.context.dispatch(topArticleActions.fetchInitialNewArrivalPosts(res)));
  // }

  // handleDeletePost(postId) {
    // return RootRepository.posts.deletePost(postId)
    //   .then(res => this.context.dispatch(topArticleActions.fetchInitialNewArrivalPosts(res)));
  // }

  render() {
    const articles = [
      {
        id: 1,
        reviewCountNumber: 128,
        title: '大寒波到来！気象庁による緊急勧告、5年ぶりああああああああああああああああああああ',
        imageUrl: 'https://placehold.jp/500x120.png',
        categories: [
          {
            id: 1,
            name: '技術',
          },
          {
            id: 2,
            name: '初心者向け',
          },
        ],
        ratingScore: 4.2,
      },
      {
        id: 2,
        reviewCountNumber: 128,
        title: '大寒波到来！気象庁による緊急勧告、5年ぶりああああああああああああああああああああ',
        imageUrl: 'https://placehold.jp/500x120.png',
        categories: [
          {
            id: 1,
            name: '技術',
          },
          {
            id: 2,
            name: '初心者向け',
          },
        ],
        ratingScore: 4.2,
      },
      {
        id: 3,
        reviewCountNumber: 128,
        title: '大寒波到来！気象庁による緊急勧告、5年ぶりああああああああああああああああああああ',
        imageUrl: 'https://placehold.jp/500x120.png',
        categories: [
          {
            id: 1,
            name: '技術',
          },
          {
            id: 2,
            name: '初心者向け',
          },
        ],
        ratingScore: 4.2,
      },
      {
        id: 4,
        reviewCountNumber: 128,
        title: '大寒波到来！気象庁による緊急勧告、5年ぶりああああああああああああああああああああ',
        imageUrl: 'https://placehold.jp/500x120.png',
        categories: [
          {
            id: 1,
            name: '技術',
          },
          {
            id: 2,
            name: '初心者向け',
          },
        ],
        ratingScore: 4.2,
      },
    ]

    return (
      <div className="top_article_list">
        <Header />
        <div className="l_container">
          <ArticleList
            articles={articles}
            // posts={this.props.topArticle.posts}
            // handleCreatePost={this.handleCreatePost}
            // handleDeletePost={this.handleDeletePost}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  topArticle: state.app.topArticle,
});
//
// TopArticleList.contextTypes = {
//   dispatch: PropTypes.func.isRequired,
// };
//
// TopArticleList.propTypes = {
//   topArticle: PropTypes.shape({
//     posts: PropTypes.arrayOf(PropTypes.instanceOf(Post).isRequired).isRequired,
//   }).isRequired,
// };

export default connect(mapStateToProps)(TopArticleList);
