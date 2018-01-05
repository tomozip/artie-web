import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Root from './routes/Root';
import newArrivalList from './routes/newArrivalList';
// import NotFound from './routes/NotFound';

const route = (
  <Route path="/" component={Root} name="top_post_name">
    <IndexRoute component={newArrivalList} name="top_post_name" />
    {/* <Route path="recipes" component={RecipeList} name={contentTypes.RECIPE} /> */}
    {/* <Route path="*" component={NotFound} /> */}
  </Route>
);

export default route;
