// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

// actions
import * as featuredArticleActions from '../actions/featuredArticle';

// components
import Header from '../components/Header';
import ArticleList from '../components/ArticleList';

// entities
import Article from '../entities/Article';

// repositories
import RootRepository from '../repositories/RootRepository';

// FIXME: rename this class to 'Feed'
class TopArticleList extends Component {
  static fetch(dispatch, params = null) {
    const fetchFeaturedArticles = () =>
      RootRepository.articles.fetchFeaturedArticles(params.page)
        .then((res) => {
          dispatch((featuredArticleActions.fetchInitialFeaturedArticles(res)));
        });
    const fetchPosts = _.concat(fetchFeaturedArticles());
    return Promise.all(fetchPosts);
  }

  // constructor() {
  //   super();
  //   this.handleCreatePost = this.handleCreatePost.bind(this);
  //   this.handleCreatePost = this.handleDeletePost.bind(this);
  // }

  // handleCreatePost(text, images = []) {
  // const userId = 1;
  // return RootRepository.articles.createPost(userId, text, images)
  //   .then(res => this.context.dispatch(featuredArticleActions.fetchInitialFeaturedArticles(res)));
  // }

  // handleDeletePost(postId) {
  // return RootRepository.articles.deletePost(postId)
  //   .then(res => this.context.dispatch(featuredArticleActions.fetchInitialFeaturedArticles(res)));
  // }

  render() {
    return (
      <div className="top_article_list">
        <Header />
        <div className="l_container">
          <ArticleList
            // articles={articles}
            articles={this.props.featuredArticle.articles}
            // handleCreatePost={this.handleCreatePost}
            // handleDeletePost={this.handleDeletePost}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  featuredArticle: state.app.featuredArticle,
});
//
// TopArticleList.contextTypes = {
//   dispatch: PropTypes.func.isRequired,
// };
//
TopArticleList.propTypes = {
  featuredArticle: PropTypes.shape({
    articles: PropTypes.arrayOf(PropTypes.instanceOf(Article).isRequired).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(TopArticleList);
