// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// // entities
import Article from '../entities/Article';

/* eslint react/prefer-stateless-function: 0 */

class ArticleCard extends Component {
  render() {
    return (
      <Link to={`/articles/${this.props.article.id}`}>
        <div className="article_card">
          <div className="article_header">
            <div className="c_header_img">
              <img
                src={this.props.article.imageUrl || '/images/logo/default_header.jpg'}
                alt="article header"
                className="header_img"
              />
            </div>
            <div className="reviews_count">
              <span className="reviews_count_number">{this.props.article.reviewsCount}</span>
              <span className="reviews_count_unit">reviews</span>
            </div>
          </div>
          <div className="article_body">
            <p className="article_title_text">{this.props.article.title}</p>
            <div className="article_categories">
              {
                this.props.article.categories.map(category => (
                  <span className="article_category" key={category.id}>#{category.name}</span>
                ))
              }
            </div>
            <div className="article_rating">
              <span className="article_rating_star_icon">★</span>
              <span className="article_average_rating">{this.props.article.averageRating}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

ArticleCard.propTypes = {
  article: PropTypes.instanceOf(Article).isRequired,
};

export default ArticleCard;
