import React, {Component} from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';

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
          <NavBar cookie={this.getCookie()} />
        </nav>
        <br/>
        <br/>
        <div className="selection-nav-bar">

          <ul>
            <Link to={"/users/" + this.getCookie() + "/collection"}>
              my collection
            </Link>

            <a className="followers-list">
              followers
            </a>

            <a className="followers-list">
              following
            </a>

            <a className="favorites-list">
              favorites
            </a>
          </ul>

        </div>
      </div>

    );
  }
});


export default ProfileNavBar;
