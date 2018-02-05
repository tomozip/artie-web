// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import _ from 'lodash';

// actions
import * as featuredArticleActions from '../actions/featuredArticle';
import * as newArrivalArticleActions from '../actions/newArrivalArticle';

// components
import Header from '../components/Header';
// import ArticleList from '../components/ArticleList';
import ArticleCard from '../components/ArticleCard';

// constants
import * as contentTypes from '../constants/contentTypes';

// entities
import Article from '../entities/Article';

// repositories
import RootRepository from '../repositories/RootRepository';

// TODO: rename this class to 'Feed'?
class TopArticleList extends Component {
  static fetch(dispatch, params = null) {
    const fetchFeaturedArticles = () =>
      RootRepository().articles.fetchNewArrivalArticles()
        .then((res) => {
          dispatch(newArrivalArticleActions.fetchInitialNewArrivalArticles(res));
        });
    const fetchPosts = _.concat(fetchFeaturedArticles());
    return Promise.all(fetchPosts);
  }

  constructor(props) {
    super(props);
    this.state = {
      currentContentType: contentTypes.NEW_ARRIVAL_ARTICLE,
      isFetchingArticles: false,
    };

    this.currentContentType = this.currentContentType.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleChangeCurrentContentType = this.handleChangeCurrentContentType.bind(this);
  }

  componentDidMount() {
    if (this.props.newArrivalArticle.isFetched) return;
    this.setState({ isFetchingArticles: true }, () => {
      RootRepository(window).articles.fetchFeaturedArticles()
        .then((res) => {
          this.context.dispatch((newArrivalArticleActions.fetchInitialNewArrivalArticles(res)));
          this.setState({ isFetchingArticles: false });
        });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentContentType !== prevState.currentContentType &&
      !this.currentContentType().data.isFetched) {
      this.setState({ isFetchingArticles: true }, () => {
        this.currentContentType().fetch()
          .then((res) => {
            this.context.dispatch(this.currentContentType().actions.initial(res));
            this.setState({ isFetchingArticles: false });
          });
      });
    }
  }

  currentContentType() {
    const w = this.props.tokenAuth ? window : undefined;
    switch (this.state.currentContentType) {
      case contentTypes.NEW_ARRIVAL_ARTICLE:
        return {
          data: {
            articles: this.props.newArrivalArticle.articles,
            cursor: this.props.newArrivalArticle.cursor,
            hasNext: this.props.newArrivalArticle.hasNext,
            isFetched: this.props.newArrivalArticle.isFetched,
          },
          fetch: RootRepository(w).articles.fetchNewArrivalArticles,
          actions: {
            initial: newArrivalArticleActions.fetchInitialNewArrivalArticles,
            next: newArrivalArticleActions.fetchNextNewArrivalArticles,
          },
        };
      case contentTypes.FEATURED_ARTICLE:
        return {
          data: {
            articles: this.props.featuredArticle.articles,
            cursor: this.props.featuredArticle.cursor,
            hasNext: this.props.featuredArticle.hasNext,
            isFetched: this.props.featuredArticle.isFetched,
          },
          fetch: RootRepository(w).articles.fetchFeaturedArticles,
          actions: {
            initial: featuredArticleActions.fetchInitialFeaturedArticles,
            next: featuredArticleActions.fetchNextFeaturedArticles,
          },
        };
      default:
    }
  }

  handleLoad() {
    this.currentContentType().fetch(this.currentContentType().data.cursor, 6)
      .then((res) => {
        this.context.dispatch(this.currentContentType().actions.next(res));
      });
  }

  handleChangeCurrentContentType(contentType) {
    this.setState({ currentContentType: contentType });
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;
    const cards = this.currentContentType().data.articles.map(article => (
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
          <div className="list_header">
            <div className="title_border" />
            <button
              className={`list_header_title ${this.state.currentContentType === contentTypes.NEW_ARRIVAL_ARTICLE ? 'focused' : ''}`}
              onClick={() => this.handleChangeCurrentContentType(contentTypes.NEW_ARRIVAL_ARTICLE)}
            >ホーム
            </button>
            <div className="title_border" />
            <button
              className={`list_header_title ${this.state.currentContentType === contentTypes.FEATURED_ARTICLE ? 'focused' : ''}`}
              onClick={() => this.handleChangeCurrentContentType(contentTypes.FEATURED_ARTICLE)}
            >オススメ
            </button>
            <div className="title_border" />
          </div>
          {
            this.state.isFetchingArticles ?
              <img src="/images/loader_gray.gif" alt="preloader" className="preloader" /> :
              <InfiniteScroll
                className="article_list"
                loadMore={this.handleLoad}
                hasMore={this.currentContentType().data.hasNext}
                loader={loader}
                initialLoad={false}
              >
                {cards}
              </InfiniteScroll>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  newArrivalArticle: state.app.newArrivalArticle,
  featuredArticle: state.app.featuredArticle,
  tokenAuth: state.app.tokenAuth,
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
  newArrivalArticle: PropTypes.shape({
    articles: PropTypes.arrayOf(PropTypes.instanceOf(Article)).isRequired,
    cursor: PropTypes.string.isRequired,
    hasNext: PropTypes.bool.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  tokenAuth: PropTypes.shape({
    isSignedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(TopArticleList);
