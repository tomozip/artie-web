import React from 'react';

import Header from '../components/Header';

// TODO Recreate when design created.
// https://fincconf.atlassian.net/browse/TW-120

const NotFound = () => (
  <div className="not_found">
    <Header />
    <div className="l_container">
      <div className="not_found_wrapper">
        <div className="l_not_found_title">
          <p className="not_found_title">404 Not Found</p>
        </div>
        <div className="l_not_found_description">
          <p className="not_found_description">指定されたURLは存在しませんでした。</p>
          <p className="not_found_description">URLが正しく入力されていないか、このページが削除された可能性があります。</p>
        </div>
        <a className="not_found_link" href="/">
          <span className="not_found_link_text">TOPページへ</span>
        </a>
      </div>
    </div>
  </div>
);

export default NotFound;
