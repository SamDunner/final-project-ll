import React, {Component} from 'react';

import GoogleMap from 'google-map-react';
import Map, {GoogleApiWrapper} from 'google-maps-react';
import MapOptions from './MapOptions.jsx'

const Edit = React.createClass({

	getInitialState: function() {
		console.log(params)
		// return {map: null, marker: null, infowindow: null};
	},

	componentDidMount: function() {


	},

	render: function() {

		if (!this.props.loaded) {
		      return <div>Loading...</div>
		}

		const map_style = {
      			width: '100vw',
      			height: '100vh'
    	}

		return (
      <div className="map-edit-page">
        <div className="nav-bar-wrapper">
          <nav className="nav-bar">
          </nav>
        </div>

        <div className="map-edit">

      	  <div style = {map_style}>
          	<Map google={this.props.google} />
          </div>

        <div className="pin-list">
        </div>

        <div className="panel-list">
        </div>

      </div>

    </div>

    	);
	}
});

export default GoogleApiWrapper({
  apiKey: "AIzaSyB0MRsGZWMHr07c_ttwaBSmcNcSqKxrPLA"
})(Edit)


export default Edit;
