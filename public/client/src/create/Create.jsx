import React, {Component} from 'react';

import GoogleMap from 'google-map-react';
import Map, {GoogleApiWrapper} from 'google-maps-react';


function getCookie() {
	$(() => {
		  $.ajax({
		    method: "GET",
		    url: "http://localhost:8080/users/"

		  }).done((results) => {
		  	console.log(results)
		    console.log("user is logged in!")
	    	var id = results.user_id;
	    	this.setState({ user_id: id });
	    	cookie.save('id', id, { path: 'http://localhost:8080/login' });

		  });
		});

}


const Create = React.createClass({

	getInitialState: function() {
		
	},

	componentDidMount: function() {
		
	},

	render: function() {

		const style = {
      			width: '100vw',
      			height: '100vh'
    	}

		return (
			      <div className="map-edit-page">
			        
			      	<nav className="nav-bar">

			      	</nav>

			        
			      	<div style = {style}>
			        	<Map google={this.props.google}
			         	/>
			        </div>

			        <div className="pin-list">

			        </div>


			        <div className="panel-list">

			        </div>
			        

			      </div>

    	);
	}
});

export default GoogleApiWrapper({
  apiKey: "AIzaSyB0MRsGZWMHr07c_ttwaBSmcNcSqKxrPLA"
})(Edit)


export default Edit;
