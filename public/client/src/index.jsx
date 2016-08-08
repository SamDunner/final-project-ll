// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");
require("../styles/navbar.scss");

// Render the top-level React component
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from './App.jsx';
import Signup from './signup/Signup.jsx';
import Login from './login/Login.jsx';
import Edit from './edit/Edit.jsx';
import Collection from './collection/Collection.jsx';
import NavBAr from './navbar/NavBar.jsx';

render((
  <Router history={browserHistory}>
     <Route path="/" component={App}>
    </Route>
    <Route path="/signup" component={Signup}>
    </Route>
    <Route path="/login" component={Login}>
    </Route>

    <Route path="/edit" component={Edit}>
    </Route>
    <Route path="/users/:user_id/collection" component={Collection}>
    </Route>
  </Router>
), document.getElementById('react-root'))


