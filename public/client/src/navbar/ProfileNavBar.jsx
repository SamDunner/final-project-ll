import React, {Component} from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import NavBar from './NavBar.jsx';

const ProfileNavBar = React.createClass({

  getInitialState: function(){
    console.log(this.props)
    return this.props;
  },

  componentDidMount: function() {

  },

  getCookie: function(){
    return document.cookie.substring(document.cookie.length - 1, document.cookie.length);
  },

  onLogout: function() {
    cookie.remove('user_id', { path: 'http://localhost:8080/logout' });

  },

  render: function() {
    return (
      <div className="standard-nav-bar">
         <nav className="standard-nav-bar">
          <NavBar />
        </nav>
        <br/>
        <br/>
        <nav className="selection-nav-bar">

          <ul>
            <Link to={"/users/" + this.getCookie() + "/collection"}>
              my collection
            </Link>

            <Link to={"/users/" + this.getCookie() + "/followers"}>
              followers
            </Link>

            <Link to={"/users/" + this.getCookie() + "/following"}>
              following
            </Link>

            <Link to={"/users/" + this.getCookie() + "/favorites"}>
              favorites
            </Link>
          </ul>

        </nav>
      </div>

    );
  }
});


export default ProfileNavBar;
