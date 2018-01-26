// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import ArticleCard from './ArticleCard';

// entities
import Article from '../entities/Article';

class ArticleList extends Component {
  render() {
    return (
      <div className="article_list">
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
}

export default ArticleList;
