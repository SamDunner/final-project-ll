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

      <div className="row">
        <a className="company-logo col-md-offset-1 col-md-2 col-lg-2"
           href="/">
         {/* <img src="/images/plotline.png" />
          <img src="http://allcartooncharacters.com/wp-content/uploads/2014/10/Garfield.jpg" /> */}
        </a>

        <Link className="btn btn-outline-primary col-md-2 col-lg-2 col-md-offset-2"
              to={"/users/" + this.getCookie() }>
                 My Profile
        </Link>

        <Link className="fa fa-plus-square-o fa-3x col-md-1 col-lg-1 col-md-offset-1"
              aria-hidden="true"
              to={"/users/" + this.getCookie() + "/create"}
              data-toggle="tooltip"
              data-placement="top"
              title="Create new map!"
              id="example">
        </Link>

        <Link className="btn btn-outline-primary col-md-2 col-lg-2"
              to="/"
              onClick={this.onLogout}>
          Log out
        </Link>

      </div>

    );
  }
});


export default NavBar;
