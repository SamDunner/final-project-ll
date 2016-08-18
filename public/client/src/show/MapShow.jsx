import React, { Component} from 'react';
//import {GoogleMapLoader, GoogleMap, Marker, InfoWindow, Circle, DirectionsRenderer, DrawingManager} from "react-google-maps";
// import GoogleMap from 'google-map-react';
//import Map, {GoogleApiWrapper} from 'google-maps-react';
//import MapOptions from './MapOptions.jsx'

import {GoogleMapLoader, GoogleMap, Marker, InfoWindow, DrawingManager, Polyline, SearchBox} from "react-google-maps";
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

  handleClose(marker){
    marker.info = false;
    this.setState(this.state);
  }

  handleSearchMarkerClose(marker) {
    marker.showSearchInfo = false;
    marker.showInfo = false;
    this.setState(this.state);
  }

  renderSearchInfoWindow(ref, marker) {

    return (

      <InfoWindow

          key={`${ref}_info_window`}
          onCloseclick={this.handleSearchMarkerClose.bind(this, marker)} >
            {<div className='marker-info-search'>

                <h4>Title:</h4>
                <h3>{marker.name}</h3>

                <h4>Address: </h4>
                <h3>{marker.address || marker.formatted_address}</h3>

                <h4>Description:</h4>
                <h3> {marker.description}</h3>


               {/*<button className='btn btn-success' onClick={this.renderInfoWindow(ref, marker)} onClick={this.onAddToPins.bind(this, marker)} type='submit'>Add to pins</button>*/}

            </div>}


      </InfoWindow>
    )
  }


  renderInfo(ref, marker) {

    return (

      <InfoWindow
          key={`${ref}_info_window`}
          onCloseclick={this.handleClose.bind(this, marker)} >

            {<div className='marker-info'>

                <h4>Title:</h4>
                <h3> {marker.title}</h3>


                <h4>Date:</h4>
                <h3>{marker.date}</h3>


                <h4>Address:</h4>
                <h3>{marker.address || marker.formatted_address}</h3>

                <h4>Type:</h4>
                <h3>{marker.type}</h3>


                <h4>Description:</h4>
                <h3>{marker.description}</h3>


                {marker.rating &&
                  <div className="marker-info">
                    <h4>rating:</h4>
                    <h3>{marker.rating}</h3>
                  </div>
                }
                <br/>


                <button /*href="/users/" + {this.props.user_id} + "/maps/" + {this.props.map_id} + "/pins/" + {marker.pin_id} + "/edit"*/ className='btn btn-info' type='submit'>Create Blog Entry</button>

                <br />

               {/*
               <button className='btn btn-danger' onClick={this.renderInfoWindow(ref, marker)} /*onClick={Create Blo} type='submit'>Delete</button> */}
               {/*
               <button className='btn btn-warning' /*onClick={this.renderInfoWindow(ref, marker)} onClick={} type='submit'>Delete</button>
                */}




            </div>}


      </InfoWindow>
    )
  }



  handleInfoMarker(marker, event){
    marker.info = true;

    console.log("Handle Marker Click state: ", this.state);

    this.setState(this.state)
  }

  handleSearchMarkerclick(marker, event){

    console.log('from handleSearchMarkerClick', marker, event)

    marker.showSearchInfo = true;
    marker.showInfo = false;

    this.setState(this.state)
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
	                       onClick={this.handleInfoMarker.bind(this, marker)}
	                        >

	                    {infoSearchWindow}

	                    </Marker>

	                )

	              })

	            }

	             {this.props.map_places &&
	              this.props.map_places.map((marker, index) => {

	                const ref=`marker_${index}`

	                var infoSearchWindow = marker.showSearchInfo ? this.renderSearchInfoWindow(ref, marker) : null

	                return (

	                     <Marker
	                      key={marker.pin_id}
	                      ref={ref}
	                      {...marker}
	                      onClick={this.handleSearchMarkerclick.bind(this, marker)}>

	                    {infoSearchWindow}
	                    </Marker>

	                )

	              })

	            }

	              {this.props.routePath &&
		            <Polyline
		              path={this.props.routePath}
		               geodesic
		               strokeColor={'#5dcf17'}
		               strokeOpacity={1.0}
		               strokeWeight={10}
		            />
		            }



	            </GoogleMap>
	          }
	        />
	        </div>

	    );

	  }



}
