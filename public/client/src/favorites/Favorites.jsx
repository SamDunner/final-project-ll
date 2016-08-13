import React, {Component} from 'react';
import NavBar from '../navbar/NavBar.jsx';
import cookie from 'react-cookie';
import App from '../App.jsx';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import ProfileNavBar from '../navbar/ProfileNavBar.jsx';


const Favorites = React.createClass({

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
      <div>
        <div className="profile-page">
          <div className="nav-bar">
            <nav className="double-nav-bar">
              <ProfileNavBar />
            </nav>
          </div>
          favorites test
        </div>

        <div>
          <label className="custom-file">
            <input type="file" id="file" className="custom-file-input" />
            <span className="custom-file-control"></span>
          </label>
        </div>
      </div>
    );
  }
});


export default Favorites;


