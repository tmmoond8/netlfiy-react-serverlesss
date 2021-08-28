import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import dotenv from 'dotenv';

dotenv.config();

function App() {
  return (
    <>
      <Router>
        {process.env.REACT_APP_ENV}
        <ul>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/">home</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
