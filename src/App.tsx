import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
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
        <Router>
          <Switch>
            <Route exact path="/spacestagram">
              <Home/>
            </Route>
            <Route exact path ="/spacestagram/image/:id">
              <SingleCard/>
            </Route>
          </Switch>
        </Router>
      </Frame>
    </AppProvider>
  );
}

export default App;
