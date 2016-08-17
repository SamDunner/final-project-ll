import React, { Component} from 'react';
//import {GoogleMapLoader, GoogleMap, Marker, InfoWindow, Circle, DirectionsRenderer, DrawingManager} from "react-google-maps";
// import GoogleMap from 'google-map-react';
//import Map, {GoogleApiWrapper} from 'google-maps-react';
//import MapOptions from './MapOptions.jsx'

import {GoogleMapLoader, GoogleMap, Marker, InfoWindow, SearchBox} from "react-google-maps";
//import MarkerContent from './MarkerContent.jsx'
import $ from 'jquery';

export default class Map extends Component {

	constructor(props) {
	    super(props);

	    console.log(this.props.map_location.centre)

	    this.state = {
	      new_markers: []
	    }

	    // this.onMapClick = this.onMapClick.bind(this);
	    // this.handleMarkerClick = this.handleMarkerClick.bind(this);
	    // this.handleMarkerRightclick = this.handleMarkerRightclick.bind(this);
	    // this.handlePinTitle = this.handlePinTitle.bind(this);
	    // this.handlePinDescription = this.handlePinDescription.bind(this);
	    // this.onInfoWindowButtonSubmit = this.onInfoWindowButtonSubmit.bind(this);

  	}

  	render() {


	    return (

	        <div style={{height: "100%"}} >
	        <GoogleMapLoader
	          query={{ libraries: "geometry,drawing,places,visualization" }}
	          containerElement={
	            <div
	              //{...this.props}
	              style={{
	                height: "100%"
	              }}
	            />
	          }

	          googleMapElement={
	            <GoogleMap

	              ref="mapCanvas"
	              defaultZoom={10}
	              center={{lat: this.props.map_location.centre.latitude, lng: this.props.map_location.centre.longitude}}
	              
	            >

	            </GoogleMap>
	          }
	        />
	        </div>
	      
	    );

	  }



}