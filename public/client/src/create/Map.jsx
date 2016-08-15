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

    this.onMapClick = this.onMapClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerRightclick = this.handleMarkerRightclick.bind(this);
    this.handlePinTitle = this.handlePinTitle.bind(this);
    this.handlePinDescription = this.handlePinDescription.bind(this);
    this.onInfoWindowButtonSubmit = this.onInfoWindowButtonSubmit.bind(this);

  }

  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }
  
  onInfoWindowButtonSubmit(){
    console.log(this.props.marker_information)
    this.props.createPin();
  }

  
  handlePinTitle(event){
    
    //this.setState({pinContent : {title: event.target.value}});
    this.props.marker_information.title = event.target.value
  }

  handlePinDescription(event){
    
    //this.setState({pinContent : {description: event.target.value}});
    this.props.marker_information.description = event.target.value;
  }

  renderInfoWindow(ref, marker) {

    return (

      <InfoWindow
          key={`${ref}_info_window`} 
          onCloseclick={this.handleMarkerClose.bind(this, marker)} >
            {<div className='marker-info'> 
               
                <h4> Title: </h4> 
                  <input type="text" onChange={this.handlePinTitle} className='pin-title' /> 
                <br/> 

                <h4>Type: </h4> 

                  <select id='select-type'> 
                      <option>Restaurant</option> 
                      <option>Bar</option> 
                      <option>Shop</option> 
                      <option>Home</option>
                      <option>Place of worship</option> 
                  </select> 
              
                <br/> 

                <h4>Description: </h4> 
                  <textarea type="text" onChange={this.handlePinDescription} className='pin-description'></textarea> 
                <br/>
                <br/> 
                
                <button onClick={this.onInfoWindowButtonSubmit} className='submit-marker' >Click here to create new pin</button>
                <br/> 
                <br/> 
               
               <button className='btn btn-warning' type='submit'>Delete Pin</button>  
            
            </div>}


      </InfoWindow>
    )
  }

  handleMarkerRightclick(marker, other){

    console.log('from handleSearchMarkerClick', marker, other)
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

  handleMarkerClick(marker, event){

    console.log('from handleMarkerClick', marker, event)

    this.props.marker_information.latitude  = marker.position.lat()
    this.props.marker_information.longitude = marker.position.lng()
    this.props.marker_information.rating    = marker.position.rating;

  //this.state.infoWindow = InfoWindow

    //hide all info boxes other than the one we just clicked
    // this.props.map_places.forEach((place) => {
    //   place.showInfo = false;
    // });

    debugger;

    marker.showInfo = true;

    debugger;
    
    console.log("Handle Marker Click state: ", this.state);
    
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

    let markers = [...this.state.new_markers]
    markers.push(marker)

    this.setState({new_markers: markers});

    console.log('state:',this.state)

    //this.props.toast('You have created a marker at'  marker.position.lat() + ", " + marker.position.lng())

  }

  handleMapCentreChanged(){
    this.setState({centre: {lat: this.props.map_location.latitude, lng: this.props.map_location.longitude }})
  }


  componentDidMount() {


  }
  

  render() {

    
    { console.log("from render method Map.js", this.props)

      var search_markers_show = []
      

      if(this.props.map_places){
      for(var i = 0; i < this.props.map_places.length; i++){
        
        let marker = {
          name: this.props.map_places[i].name,
          rating: this.props.map_places[i].rating,
          address: this.props.map_places[i].formatted_address || this.props.map_places[i].address,
          position: this.props.map_places[i].geometry.location,
          key: this.props.map_places[i].id,
          content: this.props.infoWindowContent,
          // showInfo: this.props.map_places[i].showInfo,
          defaultAnimation: 2
        }

        search_markers_show.push(marker);

      }
      console.log(search_markers_show)
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
            
            {this.state.new_markers &&
              this.state.new_markers.map((marker, index) => {

                const ref=`marker_${index}`
                
                debugger;

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

            {search_markers_show &&
              search_markers_show.map((marker, index) => {

                const ref=`marker_${index}`
                
                debugger;//brken

                return (
                    
                     <Marker
                      key={index+100}
                      ref={ref}
                      {...marker} 
                        onClick={this.handleMarkerClick.bind(this, marker)}>
                        {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}
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