import React, {Component} from 'react';
import NavBar from '../navbar/NavBar.jsx';
import cookie from 'react-cookie';
import App from '../App.jsx';


import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import ProfileNavBar from '../navbar/ProfileNavBar.jsx';



const Collection = React.createClass({

  getInitialState: function() {
    console.log(this.props.params)

    return this.props.params
  },

  componentDidMount: function() {

  },

  render: function() {
    return (
        <div className="profile-page">
          <div className="nav-bar">
            <nav className="double-nav-bar">
              <ProfileNavBar />
            </nav>
          </div>
  collection test
        </div>
    );
  }
});


export default Collection;
