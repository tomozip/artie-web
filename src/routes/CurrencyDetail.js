// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

// actions
import * as currencyDetailActions from '../actions/currencyDetail';

// components
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PostList from '../components/PostList';

// entities
import Post from '../entities/Post';
import Currency from '../entities/Currency';

// repositories
import RootRepository from '../repositories/RootRepository';

class CurrencyDetail extends Component {
  static fetch(dispatch, params = null) {
    const fetchCurrencyPosts = () =>
      RootRepository.posts.fetchCurrencyPosts(
        this.props.currencyDetail.focusedCurrncy.id,
        params.page,
      ).then(res => dispatch(currencyDetailActions.fetchInitialCurrencyDetailPosts(res)));
    const fetchCurrencies = () =>
      RootRepository.currency.fetchCurrencies(params.page)
        .then(res => dispatch(currencyDetailActions.fetchCurrencies(res)));
    const fetchPosts = _.concat(fetchCurrencyPosts(), fetchCurrencies());
    return Promise.all(fetchPosts);
  }

  constructor() {
    super();
    this.handleChangeFocusedCurrency = this.handleChangeFocusedCurrency.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.handleCreatePost = this.handleDeletePost.bind(this);
  }

  componentDidMount() {
    this.handleChangeFocusedCurrency(this.props.match.params.id)
  }

  handleChangeFocusedCurrency(id) {
    const currency = this.props.currencyDetail.currencies.find(elem => elem.id === id);
    this.context.dispatch(currencyDetailActions.changeFocusedCurrency(currency));
  }

  handleCreatePost(text, images = []) {
    const userId = 1;
    return RootRepository.posts.createPost(userId, text, images)
      .then(res => this.context.dispatch(currencyDetailActions.fetchInitialNewArrivalPosts(res)));
  }

  handleDeletePost(postId) {
    return RootRepository.posts.deletePost(postId)
      .then(res => this.context.dispatch(currencyDetailActions.fetchInitialNewArrivalPosts(res)));
  }

  render() {
    return (
      <div className="new_arrival_list">
        <Header />
        <div className="l-container">
          <Sidebar
            currencies={this.props.currencyDetail.currencies}
            handleChangeFocusedCurrency={this.handleChangeFocusedCurrency}
          />
          <div className="l-content_block">
            <PostList
              posts={this.props.currencyDetail.posts}
              handleCreatePost={this.handleCreatePost}
              handleDeletePost={this.handleDeletePost}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currencyDetail: state.app.currencyDetail,
});

CurrencyDetail.contextTypes = {
  dispatch: PropTypes.func.isRequired,
};

CurrencyDetail.propTypes = {
  currencyDetail: PropTypes.shape({
    focusedCurrncy: PropTypes.instanceOf(Currency).isRequired,
    currencies: PropTypes.arrayOf(Currency).isRequired,
    posts: PropTypes.arrayOf(PropTypes.instanceOf(Post).isRequired).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      // TODO: ここstringなのか確かめる
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(CurrencyDetail);
