// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// icon
// import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
// import BrightThumbsUp from 'react-icons/lib/fa/thumbs-up';
// import BrightThumbsDown from 'react-icons/lib/fa/thumbs-down';
// import Share from 'react-icons/lib/ti/arrow-forward-outline';
// import BrightShare from 'react-icons/lib/ti/arrow-forward';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import { faThumbsUp, faThumbsDown } from '@fortawesome/fontawesome-free-regular';
//
// // entities
import Article from '../entities/Article';

/* eslint react/prefer-stateless-function: 0 */

class ArticleCard extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showPostMenuModal: false,
  //   };
  //
  //   this.handleToggleModal = this.handleToggleModal.bind(this);
  // }
  //
  // handleToggleModal() {
  //   const toggled = !this.state.showPostMenuModal;
  //   this.setState({ showPostMenuModal: toggled });
  // }

  render() {
    return (
      <Link to={`/articles/${this.props.article.id}`}>
        <div className="article_card">
          <div className="article_header">
            <div className="c_header_img">
              <img src={this.props.article.imageUrl} alt="article header" className="header_img" />
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
