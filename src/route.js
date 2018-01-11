// libs
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// routes/components
import Root from './routes/Root';
import NewArrivalList from './routes/NewArrivalList';
import CurrencyDetail from './routes/CurrencyDetail';
// import NotFound from './routes/NotFound';

const route = (
  <Route path="/" component={Root} name="top_post_name">
    <IndexRoute component={NewArrivalList} name="top_post_name" />
    <Route path="/currencies/:symbol" component={CurrencyDetail} name="currency_detail" />
    {/* <Route path="*" component={NotFound} /> */}
  </Route>
);

export default route;
