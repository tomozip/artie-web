// libs
import React from 'react';
import { Link } from 'react-router';

// components
import ReviewBtn from './ReviewBtn';

// icons
import SearchIcon from 'react-icons/lib/md/search';

const header = {
  user: {
    name: 'tomozip',
    image_url: 'https://placehold.jp/150x150.png',
  }
}

const Header = props => (
  <div className="header">
    <div className="header_left_block">
      <div className="header_search_block">
        <input className="header_search_input" placeholder="検索" />
        <SearchIcon className="header_search_icon" />
      </div>
    </div>
    <div className="c_header_logo">
      <Link to="/" className="header_logo">Artie</Link>
    </div>
    <div className="header_right_block">
      <div className="header_user_block">
        <img className="header_user_image" src={header.user.image_url} alt="profile" />
        <p className="header_user_name">{header.user.name}</p>
      </div>
      <div className="l_review_btn">
        <ReviewBtn />
      </div>
    </div>
  </div>
);

export default Header;
