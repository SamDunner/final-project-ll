import React, {Component} from 'react';
import NavBar from '../navbar/NavBar.jsx';
import cookie from 'react-cookie';
import App from '../App.jsx';


const Collection = React.createClass({

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
      <div className="collection-page">
        <div className="map-list">
        </div>

      </div>

    );
	}
});


export default Collection;
