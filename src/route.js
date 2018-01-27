// libs
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// routes/components
import Root from './routes/Root';
import TopArticleList from './routes/TopArticleList';
import ArticleDetail from './routes/ArticleDetail';

// import NotFound from './routes/NotFound';

const route = (
  <Route path="/" component={Root} name="top_article_name">
    <IndexRoute component={TopArticleList} name="top_article_name" />
    <Route path="/articles/:id" component={ArticleDetail} name="article_detail" />
    {/* <Route path="/currencies/:symbol" component={CurrencyDetail} name="currency_detail" /> */}
    {/* <Route path="*" component={NotFound} /> */}
  </Route>
);

export default route;
