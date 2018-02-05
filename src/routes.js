import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SideProject from './containers/SideProjects';
import ContactPage from './containers/Contact';
import CasesPage from './containers/Cases';
import ServicesPage from './containers/Services';
import ThanksPage from './containers/Thanks';

const routes = (
  <Route onUpdate={() => window.scrollTo(0, 0)} path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="thanks" component={ThanksPage} />
  </Route>
);

export default routes;
