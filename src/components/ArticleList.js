// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

// components
import ArticleCard from './ArticleCard';

// entities
import Article from '../entities/Article';

/* eslint react/prefer-stateless-function: 0 */

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasNext: true,
      cursor: '',
    };

    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    const self = this;

    let url = `${api.baseUrl}/users/8665091/favorites`;
    if (this.state.nextHref) {
      url = this.state.nextHref;
    }

    qwest.get(url, {
      client_id: api.client_id,
      linked_partitioning: 1,
      page_size: 10,
    }, {
      cache: true,
    })
      .then((xhr, resp) => {
        if (resp) {
          const tracks = self.state.tracks;
          resp.collection.map((track) => {
            if (track.artwork_url == null) {
              track.artwork_url = track.user.avatar_url;
            }

            tracks.push(track);
          });

          if (resp.next_href) {
            self.setState({
              tracks,
              nextHref: resp.next_href,
            });
          } else {
            self.setState({
              hasMoreItems: false,
            });
          }
        }
      });
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;

    const cards = this.props.articles.map(article => (
      <div className="l_article_card" key={article.id}>
        <ArticleCard
          article={article}
        />
      </div>
    ));

    return (
      <div className="article_list">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.handleLoad}
          hasMore={this.state.hasNext}
          loader={loader}
        >
          {cards}
        </InfiniteScroll>
        {
          this.props.articles.map(article => (
            <div className="l_article_card" key={article.id}>
              <ArticleCard
                article={article}
              />
            </div>
          ))
        }
      </div>
    );
  }
}

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.instanceOf(Article)).isRequired,
};

export default ArticleList;
