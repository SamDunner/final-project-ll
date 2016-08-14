import React, {Component} from 'react';
import cookie from 'react-cookie';
import App from '../App.jsx';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import ProfileNavBar from '../navbar/ProfileNavBar.jsx';


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
          <ProfileNavBar />
      </div>

    );
  }
});

export default Profile;
