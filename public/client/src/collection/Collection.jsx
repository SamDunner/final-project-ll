import React, {Component} from 'react';
import NavBar from '../navbar/NavBar.jsx';
import cookie from 'react-cookie';
import App from '../App.jsx';
import $ from 'jquery';

const Collection = React.createClass({

	getInitialState: function() {
		console.log(this.props.params)

		return this.props.params
	},

	componentDidMount: function() {

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
