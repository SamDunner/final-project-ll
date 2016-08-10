import React, { Component} from 'react';
//import {GoogleMapLoader, GoogleMap, Marker, InfoWindow, Circle, DirectionsRenderer, DrawingManager} from "react-google-maps";
// import GoogleMap from 'google-map-react';
//import Map, {GoogleApiWrapper} from 'google-maps-react';
//import MapOptions from './MapOptions.jsx'

import {GoogleMapLoader, GoogleMap, Marker, InfoWindow, SearchBox} from "react-google-maps";
//import MarkerContent from './MarkerContent.jsx'

export default class Map extends Component {




  constructor(props) {
    super(props);

    console.log(this.props)

    this.state = {
      markers: []
    }


    this.onMapClick = this.onMapClick.bind(this)
  }


  

  onMapClick(event){
    let marker = {
      position: event.latLng,
      key: Date.now(),
      defaultAnimation: 2
    }

    let markers = [...this.state.markers]
    markers.push(marker)

    this.setState({markers});

    console.log('state:',this.state)

  }

  render() {

    
    {let latLng = {latitude: -27.527758206861897,
                  longitude: 136.58203125

                 };

    console.log(latLng)}

    // console.log(this.state.position)

    return (


      <section style={{height: "100%"}}>
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
              ref={(map) => console.log(map)}
              defaultZoom={3}
              defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
              onClick={this.onMapClick}
              
            >
            {this.state.markers &&
              this.state.markers.map((marker, index) => {
                return (

                  
                    <Marker
                    {...marker}  />
                    

                )

              })
              
            }

            </GoogleMap>
          }
        />
      </section>
    );

  }

}