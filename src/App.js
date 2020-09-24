import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Layout/Header';
import { useCountry } from './providers/CountryProvider';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePage from './containers/HomePage';
import NotFound from './containers/NotFoundPage';

function App(props) {
  const { state, loadCountry } = useCountry();
  useEffect(() => {
    loadCountry();
  }, []);

  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path={'/'} exact>
            <HomePage />
          </Route>
          <Route path={'*'}>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
