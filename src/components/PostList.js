// libs
import React from 'react';
import PropTypes from 'prop-types';

// components
import PostPanel from '../components/PostPanel';
import PostForm from '../components/PostForm';

// entities
import Post from '../entities/Post';

const PostList = props => (
  <div className="l-post_block">
    <PostForm onClick={props.handleCreatePost} />
    {
      props.posts.map(post => (
        <div className="l-post_panel" key={post.id}>
          <PostPanel post={post} handleDeletePost={props.handleDeletePost} />
        </div>
      ))
    }
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.instanceOf(Post).isRequired).isRequired,
  handleCreatePost: PropTypes.func.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostList;
