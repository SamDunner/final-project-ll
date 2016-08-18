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

	handleMarker(marker, event){

	  console.log('from handleMarkerClick', marker, event)

	  marker.info = true;

	  console.log("Handle Marker Click state: ", this.state);

	  this.setState(this.state)
	}


	renderInfo(ref, marker) {

	  return (

	    <InfoWindow
	        key={`${ref}_info_window`}
	        onCloseclick={this.handleClose.bind(this, marker)} >
	          {<div className='marker-info-search'>

                <h4>Title: {marker.name}</h4>
                <br/>

                <h4>Date: {marker.date}</h4>
                <br/>

                <h4>Address: {marker.address || marker.formatted_address}</h4>
                <br/>

                <h4>Type: {marker.name}</h4>
                <br/>

                <h4>Description: {marker.description}</h4>
                <br/>

                {marker.rating &&
                  <h4>rating: {marker.rating}</h4>
                }
                <br/>


                <button /*href="/users/" + {this.props.user_id} + "/maps/" + {this.props.map_id} + "/pins/" + {marker.pin_id} + "/edit"*/ className='btn btn-info' type='submit'>Create Blog Entry</button>

                <br />

               {/*
               <button className='btn btn-danger' onClick={this.renderInfoWindow(ref, marker)} /*onClick={Create Blo} type='submit'>Delete</button> */}
               {/*
               <button className='btn btn-warning' /*onClick={this.renderInfoWindow(ref, marker)} onClick={} type='submit'>Delete</button>
                */}


               <button className='btn btn-danger' onClick={this.onDeletePin.bind(this, marker)} type='submit'>Delete</button>

            </div>}


	      </InfoWindow>
	    )
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

	            {this.props.pins &&
	              this.props.pins.map((marker, index) => {

	                const ref=`marker_${index}`
	                var infoSearchWindow = marker.info ? this.renderInfo(ref, marker) : null

	                return (

	                     <Marker
	                      key={marker.pin_id}
	                      ref={ref}
	                      {...marker}
	                        >
	                       {infoSearchWindow}
	                    </Marker>

	                )

	              })

	            }

	            {this.props.map_places &&
	              this.props.map_places.map((marker, index) => {

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
