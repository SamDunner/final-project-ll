import React, {Component} from 'react';
import NavBar from '../navbar/NavBar.jsx';
import cookie from 'react-cookie';
import App from '../App.jsx';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';


const Profile = React.createClass({

  getInitialState: function() {
    console.log(this.props.params)

    return this.props.params
  },

  componentDidMount: function() {

  },

  getCookie: function(){
    return document.cookie.substring(document.cookie.length - 1, document.cookie.length);
  },

  render: function() {
    return (
      <div className="profile-page">

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

export default Profile;
