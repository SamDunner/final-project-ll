// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from './App.jsx';
import Signup from './signup/Signup.jsx';
import Login from './login/Login.jsx';
import Edit from './edit/Edit.jsx';
import Collection from './collection/Collection.jsx';
import NavBar from './navbar/NavBar.jsx';
import Profile from './profile/Profile.jsx';
import Followers from './followers/Followers.jsx';
import Following from './following/Following.jsx';
import Favorites from './favorites/Favorites.jsx';


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

    <Route path="/users/:user_id" component={Profile}>
    </Route>

    <Route path="/users/:user_id/create" component={Collection}>
    </Route>

    <Route path="/users/:user_id/collection" component={Collection}>
    </Route>

    <Route path="/users/:user_id/followers" component={Followers}>
    </Route>

    <Route path="/users/:user_id/following" component={Following}>
    </Route>

    <Route path="/users/:user_id/favorites" component={Favorites}>
    </Route>


  </Router>
), document.getElementById('react-root'))


