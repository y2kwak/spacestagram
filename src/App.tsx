import * as React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider, Frame } from '@shopify/polaris';

import Home from './views/Home';
import SingleCard from './views/SingleCard';
import './App.css';

function App() {
 return (
    <AppProvider i18n={enTranslations}>
      <Frame>
        <Router basename="/spacestagram" hashType="slash">
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path ="/image/:id">
            <SingleCard/>
          </Route>
        </Router>
      </Frame>
    </AppProvider>
  );
}

export default App;
