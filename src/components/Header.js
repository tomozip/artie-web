// libs
import React from 'react';
import PropTypes from 'prop-types';

// icons
import SearchIcon from 'react-icons/lib/md/search';

const Header = props => (
  <div className="header">
    <div className="header_search_block">
      <input className="header_search_input" placeholder="検索" />
      <SearchIcon className="header_search_icon" />
    </div>
    <div className="header_title_block">
      <p className="header_title">CoinNow</p>
    </div>
    <div className="header_user_block">
      <img className="header_user_image" src="https://placehold.jp/150x150.png" alt="profile" />
      <p className="header_user_name">kamex</p>
    </div>
  </div>
);

export default Header;
