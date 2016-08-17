import React, {Component} from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import NavBar from './NavBar.jsx';
import Collection from '../collection/Collection.jsx';
import $ from 'jquery';

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

  // getCollection: function(event) {
  //   console.log("getCollection")

  //   const collectionURL = "http://localhost:8080/users/" + this.getCookie('user_id') + "/maps"

  //     $.ajax({
  //       method: "GET",
  //       url: collectionURL
  //     }).then((results) => {
  //       console.log("map is being generated", results)
  //     })
  // },

  getFollowers: function(event) {
    console.log("getFollowers")

    const followerURL = "http://localhost:8080/users/" + this.getCookie('user_id') + "/followers"

      $.ajax({
        method: "GET",
        url: followerURL
      }).then((results) => {
        console.log("followers are being generated", results)
      })
  },

  getFollowing: function(event) {
    console.log("getFollowing")

    const followingURL = "http://localhost:8080/users/" + this.getCookie('user_id') + "/following"

      $.ajax({
        method: "GET",
        url: followingURL
      }).then((results) => {
        console.log("following is being generated", results)
      })
  },

  getFavorites: function(event) {
    console.log("getFavorites")

    const favoritesURL = "http://localhost:8080/users/" + this.getCookie('user_id') + "/favorites"

      window.ajax = $.ajax({
        method: "GET",
        url: favoritesURL
      }).then((results) => {
        console.log("favorites are being generated", results)
      })
  },

  onLogout: function() {
    cookie.remove('user_id', { path: 'http://localhost:8080/logout' });

  },

  render: function() {
    return (
      <div className="profile">
        <div className="custom-margin-top">
          <NavBar />
        </div>
          <div className="row custom-profile-nav custom-element-margin-top">
            <nav className="selection-nav-bar col-md-12 col-lg-12">
              <Link className="profile-tab col-md-offset-4 col-lg-offset-4 col-md-1 col-lg-1"
                    to={"/users/" + this.getCookie() + "/collection"}
                    onClick={this.getCollection}>
                collection
              </Link>

              <Link className="profile-tab col-md-1 col-lg-1"
                    to={"/users/" + this.getCookie() + "/followers"}
                    onClick={this.getFollowers}>
                followers
              </Link>

              <Link className="profile-tab col-md-1 col-lg-1"
                    to={"/users/" + this.getCookie() + "/following"}
                    onClick={this.getFollowing}>
                following
              </Link>

              <Link className="profile-tab col-md-1 col-lg-1"
                    to={"/users/" + this.getCookie() + "/favorites"}
                    onClick={this.getFavorites}>
                favorites
              </Link>
            </nav>
          </div>
        </div>
    );
  }
});


export default ProfileNavBar;
