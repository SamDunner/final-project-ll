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
      <div className="standard-nav-bar col-md-12 col-lg-12">
         <nav className="standard-nav-bar">
          <NavBar />
        </nav>
        <br/>
        <br/>
        <nav className="selection-nav-bar col-md-12 col-lg-12">

          <ul>
            <Link className="btn btn-danger  col-md-2 col-lg-2" to={"/users/" + this.getCookie() + "/collection"}>
              my collection
            </Link>

            <Link className="btn btn-danger  col-md-2 col-lg-2 col-md-offset-1" to={"/users/" + this.getCookie() + "/followers"}>
              followers
            </Link>

            <Link className="btn btn-danger  col-md-2 col-lg-2 col-md-offset-1" to={"/users/" + this.getCookie() + "/following"}>
              following
            </Link>

            <Link className="btn btn-danger  col-md-2 col-lg-2 col-md-offset-1" to={"/users/" + this.getCookie() + "/favorites"}>
              favorites
            </Link>
          </ul>

        </nav>
      </div>

    );
  }
});


export default ProfileNavBar;
