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

// FIXME: rename this class to 'Feed'
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
    this.state = {
      hasNext: true,
      cursor: '',
    };

    // this.handleLoad = this.handleLoad.bind(this);
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

  // handleLoad() {
  //   const self = this;
  //
  //   let url = `${api.baseUrl}/users/8665091/favorites`;
  //   if (this.state.nextHref) {
  //     url = this.state.nextHref;
  //   }
  //
  //   qwest.get(url, {
  //     client_id: api.client_id,
  //     linked_partitioning: 1,
  //     page_size: 10,
  //   }, {
  //     cache: true,
  //   })
  //     .then((xhr, resp) => {
  //       if (resp) {
  //         const tracks = self.state.tracks;
  //         resp.collection.map((track) => {
  //           if (track.artwork_url == null) {
  //             track.artwork_url = track.user.avatar_url;
  //           }
  //
  //           tracks.push(track);
  //         });
  //
  //         if (resp.next_href) {
  //           self.setState({
  //             tracks,
  //             nextHref: resp.next_href,
  //           });
  //         } else {
  //           self.setState({
  //             hasMoreItems: false,
  //           });
  //         }
  //       }
  //     });
  // }

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
          <div className="article_list">
            {/* <InfiniteScroll
              pageStart={0}
              loadMore={this.handleLoad}
              hasMore={this.state.hasNext}
              loader={loader}
            > */}
            {cards}
            {/* </InfiniteScroll> */}
          </div>
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
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(TopArticleList);
