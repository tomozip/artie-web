// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

// actions
import * as newArrivalActions from '../actions/newArrival';

// components
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PostList from '../components/PostList';

// entities
import Post from '../entities/Post';

// repositories
import RootRepository from '../repositories/RootRepository';

// FIXME: rename this class to 'Feed'
class NewArrivalList extends Component {
  // ここからrenderまでかなりCurrencyDetailとかぶる部分が多い。
  // FIXME: refactoring
  static fecth(dispatch, params = null) {
    const fetchFeedPosts = () =>
      RootRepository.posts.fetchFeedPosts(params.page)
        .then(res => dispatch(newArrivalActions.fetchInitialNewArrivalPosts(res)));
    const fetchPosts = _.concat(fetchFeedPosts());
    return Promise.all(fetchPosts);
  }

  constructor() {
    super();
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.handleCreatePost = this.handleDeletePost.bind(this);
  }

  handleCreatePost(text, images = []) {
    const userId = 1;
    return RootRepository.posts.createPost(userId, text, images)
      .then(res => this.context.dispatch(newArrivalActions.fetchInitialNewArrivalPosts(res)));
  }

  handleDeletePost(postId) {
    return RootRepository.posts.deletePost(postId)
      .then(res => this.context.dispatch(newArrivalActions.fetchInitialNewArrivalPosts(res)));
  }

  render() {
    return (
      <div className="new_arrival_list">
        <Header />
        <div className="l-container">
          <Sidebar />
          <div className="l-content_block">
            <PostList
              posts={this.props.newArrival.posts}
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
  newArrival: state.app.newArrival,
});

NewArrivalList.contextTypes = {
  dispatch: PropTypes.func.isRequired,
};

NewArrivalList.propTypes = {
  newArrival: PropTypes.shape({
    posts: PropTypes.arrayOf(PropTypes.instanceOf(Post).isRequired).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(NewArrivalList);
