// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import _ from 'lodash';

// actions
import * as featuredArticleActions from '../actions/featuredArticle';

// components
import Header from '../components/Header';
// import ArticleList from '../components/ArticleList';
import ArticleCard from '../components/ArticleCard';

// entities
import Article from '../entities/Article';

// repositories
import RootRepository from '../repositories/RootRepository';

// TODO: rename this class to 'Feed'?
class TopArticleList extends Component {
  static fetch(dispatch, params = null) {
    const fetchFeaturedArticles = () =>
      RootRepository().articles.fetchFeaturedArticles()
        .then((res) => {
          dispatch(featuredArticleActions.fetchInitialFeaturedArticles(res));
        });
    const fetchPosts = _.concat(fetchFeaturedArticles());
    return Promise.all(fetchPosts);
  }

  constructor(props) {
    super(props);

    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.context;

    if (!this.props.featuredArticle.isFetched) {
      RootRepository(window).articles.fetchFeaturedArticles()
        .then((res) => {
          dispatch((featuredArticleActions.fetchInitialFeaturedArticles(res)));
        });
    }
  }

  handleLoad() {
    RootRepository(window).articles.fetchFeaturedArticles(this.props.featuredArticle.cursor, 6)
      .then((res) => {
        this.context.dispatch(featuredArticleActions.fetchNextFeaturedArticles(res));
      });
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;

    const cards = this.props.featuredArticle.articles.map(article => (
      <div className="l_article_card" key={article.id}>
        <ArticleCard
          article={article}
        />
      </div>
    ));

    return (
      <div className="top_article_list">
        <Header />
        <div className="l_container">
          <InfiniteScroll
            loadMore={this.handleLoad}
            hasMore={this.props.featuredArticle.hasNext}
            loader={loader}
            initialLoad={false}
          >
            <div className="article_list">
              {cards}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  featuredArticle: state.app.featuredArticle,
});

TopArticleList.contextTypes = {
  dispatch: PropTypes.func.isRequired,
};

TopArticleList.propTypes = {
  featuredArticle: PropTypes.shape({
    articles: PropTypes.arrayOf(PropTypes.instanceOf(Article)).isRequired,
    cursor: PropTypes.string.isRequired,
    hasNext: PropTypes.bool.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(TopArticleList);
