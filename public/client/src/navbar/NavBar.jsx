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
      <div className="standard-nav-bar col-md-12 col-lg-12">
        <a className="company-logo col-md-offset-1 col-md-2 col-lg-2 btn btn-danger" href="/">
          Home(future logo)
        </a>
        <Link className="btn btn-danger col-md-2 col-lg-2 col-md-offset-4" to={"/users/" + this.getCookie() }>
          My Profile
        </Link>
        <Link className="btn btn-danger col-md-2 col-lg-2" to="/" onClick={this.onLogout}>
          Log out
        </Link>
      </div>

    );
  }
});


export default NavBar;
