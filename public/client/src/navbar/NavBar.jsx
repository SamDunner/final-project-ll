import React, {Component} from 'react';
import { Link } from 'react-router'

const Collection = React.createClass({

  getInitialState: function(){
    console.log(this.props)
    return this.props;
  },

  componentDidMount: function() {

  },

  onLogout: function() {
    this.props.removeCookie()

  },

  render: function() {
    return (
      <div className="standard-nav-bar">
        <div className="button-parent">
          <a className="company-logo" href="/">
            Logo/Home Link
          </a>
          <div className="profile-info">
            <a className="my-profile" href="/user/:id/profile">
              My Profile
            </a>
            <Link to={"users/" + this.props.cookie + "/collection"}>
              My Collection
            </Link>
            <Link to="/" onClick={this.onLogout}>
              Log out
            </Link>
          </div>
          <div className="fix-parent-collapser">
          </div>
        </div>
      </div>

    );
  }
});


export default Collection;
