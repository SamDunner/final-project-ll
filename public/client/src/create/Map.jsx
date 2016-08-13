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
      new_markers: [],
      search_markers: this.props.map_places
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

    let new_markers = [...this.state.new_markers]
    new_markers.push(marker)

    this.setState({new_markers});

    console.log('state:',this.state)

    //this.props.toast('You have created a marker at'  marker.position.lat() + ", " + marker.position.lng())

  }

  handleMapCentreChanged(){
    this.setState({centre: {lat: this.props.map_location.latitude, lng: this.props.map_location.longitude }})
  }

  getPlaces(){
    /*
    var map = new google.maps.Map(document.getElementById('create'))
    var latLng = new google.maps.LatLng(this.props.map_location.centre.latitude, this.props.map_location.centre.longitude);


    var service = new google.maps.places.PlacesService(map);
    service.textSearch({location: latLng, query: 'Hilton'}, (results, status) => {
      for(var i = 0; i < results.length; i++){
        console.log(results[i])
      }
    })
    */
  }

  componentDidMount() {
    //this.getPlaces()

  }
  

  render() {

    
    { var search_markers_show = []
      var marker_show = {};

      if(this.state.search_markers){
      for(var i = 0; i < this.state.search_markers.length; i++){
        
      }
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
              
              onClick={this.onMapClick}
              
            >
            
            {this.state.search_markers &&
              this.state.search_markers.map((marker, index) => {

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

            {this.state.new_markers &&
              this.state.new_markers.map((marker, index) => {

                const ref=`marker_${index}`
                
                return (
    
                    <Marker 
                    key={index}
                    ref={ref}
                    position={{lat: marker.geometry.location.lat(), lng: marker.geometry.location.lng()}} 
                    >

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
        </div>
      
    );

  }

}