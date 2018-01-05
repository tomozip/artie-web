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
import PostPanel from '../components/PostPanel';
import PostForm from '../components/PostForm';
// entities
import Post from '../entities/Post';

// repositories
import RootRepository from '../repositories/RootRepository';

class NewArrivalList extends Component {
  static fetch(dispatch, params = null) {
    const fetchNewArrivalPosts = () =>
      RootRepository.posts.fetch(
        'new_arrival',
        params.page,
      ).then(res => dispatch(newArrivalActions.fetchInitialNewArrivalPosts(res)));
    const fetchPosts = _.concat(fetchNewArrivalPosts());
    return Promise.all(fetchPosts);
  }

  constructor() {
    super();
    this.handleCreatePost = this.handleCreatePost.bind(this);
  }

  handleCreatePost(text, images = []) {
    const userId = 1;
    return RootRepository.posts.createPost(userId, text, images)
      .then(res => this.context.dispatch(newArrivalActions.fetchInitialNewArrivalPosts(res)));
  }

  handleDeletePost(postId) {
    return RootRepository.posts.deletePost(postId)
      .then(res => this.context.dispatch(newArrivalActions.fetchInitialNewArrivalPosts(res)))
  }

  render() {
    return (
      <div className="new_arrival_list">
        <Header />
        <div className="l-container">
          <Sidebar />
          <div className="l-content_block">
            <div className="l-post_block">
              <PostForm onClick={this.handleCreatePost} />
              {
                this.props.newArrival.posts.map(post => (
                  <div className="l-post_panel" key={post.id}>
                    <PostPanel post={post} handleDeletePost={this.handleDeletePost} />
                  </div>
                ))
              }
            </div>
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
