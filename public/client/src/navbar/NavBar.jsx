import React, {Component} from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';

const NavBar = React.createClass({

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
        <div className="button-parent">
          <a className="company-logo" href="/">
            Logo/Home Link
          </a>
          <div className="profile-info">
            <a className="my-profile" href="/user/:id/profile">
              My Profile
            </a>
            <Link to={"users/" + this.getCookie() }>
              My Profile
            </Link>
            <Link to="/" onClick={this.onLogout}>
              Log out
            </Link>
          </div>
          <div className="fix-parent-collapser">
          </div>
        </div>
      </div>

    );
  }
});


export default NavBar;
