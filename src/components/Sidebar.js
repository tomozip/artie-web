// libs
import React from 'react';
import PropTypes from 'prop-types';

// entities
import Currency from '../entities/Currency';

// icon
// import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
// import Send from 'react-icons/lib/md/send';
// import BrightThumbsUp from 'react-icons/lib/fa/thumbs-up';
// import BrightThumbsDown from 'react-icons/lib/fa/thumbs-down';
// import Share from 'react-icons/lib/ti/arrow-forward-outline';
// import BrightShare from 'react-icons/lib/ti/arrow-forward';

const Sidebar = props => (
  <div className="sidebar">
    <div className="sidebar_feed_row clickable_row">
      <p className="sidebar_feed_row_title">Feed</p>
    </div>
    <div className="sidebar_title_row">
      <p className="sidebar_title">Following Hashtags</p>
    </div>
    {
      props.currencies.map(currency => (
        <button
          key={currency.id}
          onClick={() => props.handleChangeFocusedCurrency(currency.id)}
          className="sidebar_channel_row clickable_row"
        >
          <p className="sidebar_channel_row_title"># {currency.name}</p>
        </button>
      ))
    }
    {/* <div className="sidebar_channel_row clickable_row">
      <p className="sidebar_channel_row_title"># BIT</p>
    </div>
    <div className="sidebar_channel_row clickable_row">
      <p className="sidebar_channel_row_title"># XRP</p>
    </div>
    <div className="sidebar_channel_row clickable_row">
      <p className="sidebar_channel_row_title"># ETH</p>
    </div> */}
  </div>
);

Sidebar.propTypes = {
  currencies: PropTypes.arrayOf(Currency).isRequired,
  handleChangeFocusedCurrency: PropTypes.func.isRequired,
}

export default Sidebar;
