// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// icon
// import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import StarIcon from 'react-icons/lib/md/star';
// import BrightThumbsUp from 'react-icons/lib/fa/thumbs-up';
// import BrightThumbsDown from 'react-icons/lib/fa/thumbs-down';
// import Share from 'react-icons/lib/ti/arrow-forward-outline';
// import BrightShare from 'react-icons/lib/ti/arrow-forward';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import { faThumbsUp, faThumbsDown } from '@fortawesome/fontawesome-free-regular';
//
// // entities
import Article from '../entities/Article';

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
      <div className="article_card">
        <div className="article_header">
          <div className="c_header_img">
            <img src={this.props.article.imageUrl} alt="article header" className="header_img" />
          </div>
          <div className="review_count">
            <span className="review_count_number">{this.props.article.reviewCountNumber}</span>
            <span className="review_count_unit">reviews</span>
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
            <StarIcon className="article_rating_star_icon" />
            <span className="article_rating_score">{this.props.article.ratingScore}</span>
          </div>
        </div>
      </div>
    );
  }
}

ArticleCard.propTypes = {
  article: PropTypes.instanceOf(Article).isRequired,
};

export default ArticleCard;