import React, {Component} from 'react';

const Collection = React.createClass({

  componentDidMount: function() {

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
            <a className="my-collection" href="user/:id/collection">
              My Collection
            </a>
          </div>
          <div className="fix-parent-collapser">
          </div>
        </div>
      </div>

    );
  }
});


export default Collection;
