import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Router>
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
