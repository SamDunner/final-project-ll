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

    console.log(this.props)

    this.state = {
      markers: []
    }

    this.onMapClick = this.onMapClick.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.onInfoWindowButtonClick = this.onInfoWindowButtonClick.bind(this)
  
  }

  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }
  
  onInfoWindowButtonClick(){
    console.log(this.state)
    $('.create-map').on('click','.btn.btn-info', (event) => {
        console.log(this.state)

    })
  }

  renderInfoWindow(ref, marker) {

    return (

      <InfoWindow
          key={`${ref}_info_window`} 
          onCloseclick={this.handleMarkerClose.bind(this, marker)} >
            {<div className='marker-info'> 
               
                <h4> Title: </h4> 
                  <input className='pin-title' name='title' /> 
                <br/> 

                <h4>Type: </h4> 

                  <select id='select-type'> 
                      <option >Restaurant</option> 
                      <option >Bar</option> 
                      <option >Shop</option> 
                      <option >Other user</option> 
                      <option >Home </option> 
                      <option >Other </option> 
                  </select> 
              
                <br/> 

                <h4>Description: </h4> 
                  <textarea className='pin-description' value='' name= 'description'> </textarea> 
                <br/><br/> 
                <button onClick={this.onInfoWindowButtonClick} className='submit-marker' type='submit'>Click here to create new pin</button>  
               
               <br/> 
               <br/> 
               <button className='btn btn-warning' type='submit'>Delete Pin</button>  
            
            </div>}


      </InfoWindow>
    )
  }

  

  handleMarkerClick(marker){
    let InfoWindow = {
      position: event.latLng,
      key: Date.now(),
      content: this.props.infoWindowContent
    }

    this.state.infoWindow = InfoWindow
    console.log(this.state)

    marker.showInfo = true;
    this.setState(this.state)
  }


  onMapClick(event){
    let marker = {
      position: event.latLng,
      key: Date.now(),
      content: this.props.infoWindowContent,
      showInfo: false,
      defaultAnimation: 2
    }

    let markers = [...this.state.markers]
    markers.push(marker)

    this.setState({markers});

    console.log('state:',this.state)

    //this.props.toast('You have created a marker at'  marker.position.lat() + ", " + marker.position.lng())

  }

  handleMapCentreChanged(){
    this.setState({centre: {lat: this.props.map_location.latitude, lng: this.props.map_location.longitude }})
  }

  componentDidMount() {


  }

  render() {

    
    {let latLng = {latitude: -27.527758206861897,
                  longitude: 136.58203125

                 };

    console.log(this.props)}


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
              center={{lat: this.props.map_location.centre.latitude, lng: this.props.map_location.centre.longitude}}
              
              onClick={this.onMapClick}
              
            >
            
            {this.state.markers &&
              this.state.markers.map((marker, index) => {

                const ref=`marker_${index}`
                
                return (
    
                    <Marker 
                    key={index}
                    ref={ref}
                    {...marker} 
                      onClick={this.handleMarkerClick.bind(this, marker)}>

                      {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}

                    </Marker>
                    

                )

              })
              
            }


            <SearchBox 
              controlPosition={google.maps.ControlPosition.TOP_LEFT}
              style={Map.inputStyle}
            />
          
            

            </GoogleMap>
          }
        />
      </section>
    );

  }

}