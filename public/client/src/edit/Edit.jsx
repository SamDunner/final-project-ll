import React from 'react';
//import {GoogleMapLoader, GoogleMap, Marker, InfoWindow, Circle, DirectionsRenderer, DrawingManager} from "react-google-maps";
// import GoogleMap from 'google-map-react';
//import Map, {GoogleApiWrapper} from 'google-maps-react';
//import MapOptions from './MapOptions.jsx'

import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

export default function SimpleMap (props) {

  return (
    <section style={{height: "100%"}}>
      <GoogleMapLoader
      	query={{ libraries: "geometry,drawing,places,visualization" }}
        containerElement={
          <div
            {...props.containerElementProps}
            style={{
              height: "100%"
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={3}
            defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
            onClick={props.onMapClick}
          > 
          </GoogleMap>
        }
      />
    </section>
  );
}

export default SimpleMap;

