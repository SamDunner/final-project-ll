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

	    console.log(props)

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

    
	    { console.log("from render method Map.js, getting pins from DB", this.props)

	      var markers = []
	      

	      if(this.props.pins){
	      for(var i = 0; i < this.props.pins.length; i++){
	        
	        console.log("render mapshow.jsx", this.props.pins[i])
	        let marker = {
	          title: this.props.pins[i].title,
	          rating: this.props.pins[i].rating,
	          address: this.props.pins[i].formatted_address || this.props.pins[i].address,
	          position: {lat: this.props.pins[i].latitude, lng: this.props.pins[i].longitude},
	          pin_id: this.props.pins[i].pin_id,
	          description: this.props.pins[i].description,
	          showInfo: false,
	          defaultAnimation: 2
	        }

	        markers.push(marker);

	      }
	      console.log(markers)
	    }}

	    { console.log("from render method Map.js, searching for pins", this.props)

	      var markers_search = []
	      

	      if(this.props.map_places){
	      for(var i = 0; i < this.props.map_places.length; i++){
	        
	        console.log("render mapshow.jsx", this.props.pins[i])
	        let marker = {
	          name: this.props.map_places[i].name,
	          rating: this.props.map_places[i].rating,
	          address: this.props.map_places[i].formatted_address || this.props.map_places[i].address,
	          position: this.props.map_places[i].geometry.location,
	          key: this.props.map_places[i].id,
	          content: this.props.infoWindowContent,
	          showInfo: false,
	          defaultAnimation: 2
	        }

	        markers_search.push(marker);

	      }
	      console.log(markers_search)
	    }}


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

	            {markers &&
	              markers.map((marker, index) => {

	                const ref=`marker_${index}`
	                
	                return (
	                    
	                     <Marker
	                      key={marker.pin_id}
	                      ref={ref}
	                      {...marker} 
	                        >

	                        

	                    </Marker>
	                    
	                )

	              })
	              
	            }

	             {markers_search &&
	              markers_search.map((marker, index) => {

	                const ref=`marker_${index}`
	                
	                return (
	                    
	                     <Marker
	                      key={marker.pin_id}
	                      ref={ref}
	                      {...marker} 
	                        >

	                        

	                    </Marker>
	                    
	                )

	              })
	              
	            }



	            </GoogleMap>
	          }
	        />
	        </div>
	      
	    );

	  }



}