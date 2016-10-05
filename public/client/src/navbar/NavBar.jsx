  import React, {Component} from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';

const NavBar = React.createClass({

  getInitialState: function(){
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

  getCookie: function(){
    return document.cookie.substring(document.cookie.length - 1, document.cookie.length);
  },

  render: function() {
    return (

      <div className="standard-nav-bar col-md-12 col-lg-12" >

        <Link className="get-started col-md-1 col-lg-1" to={"/users/" + this.getCookie() + "/create"}>
          new project:
        </Link>

        <Link className="fa fa-plus-square-o fa-4x col-md-1 col-lg-1"
              aria-hidden="true"
              to={"/users/" + this.getCookie() + "/create"}
              data-toggle="tooltip"
              data-placement="top"
              title="Create new map!"
              id="example">
        </Link>

        <a className="thumbnail col-md-offset-2 col-md-1 col-lg-1"
           href="/">
        <img src="/images/plotline.png" />
        </a>

        <a className="site-name col-md-2 col-lg-2"
           href="/">
           plotline
        </a>

        <Link className="btn btn-outline-primary col-md-1 col-lg-1 col-md-offset-2"
              to={"/users/" + this.getCookie() + "/collection" }>
              profile
        </Link>

        <Link className="btn btn-outline-primary-logout col-md-1 col-lg-1 col-md-offset-1"
              to="/"
              onClick={this.onLogout}>
          log out
        </Link>

      </div>

    );
  }
});


export default NavBar;
