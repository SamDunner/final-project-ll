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

    this.state = {
      new_markers: [],
      search_markers: []
    }

    this.onMapClick = this.onMapClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    //this.handleMarkerRightclick = this.handleMarkerRightclick.bind(this);
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

  onInfoWindowButtonDelete(marker, event){
    
    var markers = this.state.new_markers;
    for(var i = 0; i < markers.length; i++){
      if(marker.key == markers[i].key){
        markers.splice(i, 1)
        this.setState({new_markers: markers})
      }
    }
  }
  
  handlePinTitle(event){
    
    //this.setState({pinContent : {title: event.target.value}});
    this.props.marker_information.title = event.target.value
  }

  handlePinDescription(event){
    
    //this.setState({pinContent : {description: event.target.value}});
    this.props.marker_information.description = event.target.value;
  }



  renderSearchInfoWindow(ref, marker) {

    return (

      <InfoWindow
          key={`${ref}_info_window`} 
          onCloseclick={this.handleMarkerClose.bind(this, marker)} >
            {<div className='marker-info-search'> 
               
                <h4> Title: {marker.title}</h4> 
                  
                <br/>  

                <h4>Description: {marker.description}</h4> 
                  
                <br/>
                <br/>  
               
               <button className='btn btn-warning' type='submit'>Delete Pin</button>  
            
            </div>}


      </InfoWindow>
    )
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
               
               <button onClick={this.onInfoWindowButtonDelete.bind(this, marker)} className='btn btn-warning' type='submit'>Delete Pin</button>  
            
            </div>}


      </InfoWindow>
    )
  }

  // handleMarkerRightclick(marker, other){

  //   console.log('from handleSearchMarkerClick', marker, other)
  //   let InfoWindow = {
  //     position: event.latLng,
  //     key: Date.now(),
  //     content: this.props.infoWindowContent
  //   }

  //   this.state.infoWindow = InfoWindow
  //   console.log(this.state)

  //   marker.showInfo = true;
  //   this.setState(this.state)
  // }

  handleMarkerClick(marker, event){

    console.log('from handleMarkerClick', marker, event)

    this.props.marker_information.latitude  = marker.position.lat()
    this.props.marker_information.longitude = marker.position.lng()
    this.props.marker_information.rating    = marker.position.rating;


    marker.showInfo = true;
    
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
                var infoWindow = marker.showInfo ? this.renderInfoWindow(ref, marker) : null


                return (
    
                    <Marker 
                    key={index}
                    ref={ref}
                    {...marker} 
                      onClick={this.handleMarkerClick.bind(this, marker)}>
                      {infoWindow}

                    </Marker>
                    

                )

              })
              
            }

            {this.props.map_places &&
              this.props.map_places.map((marker, index) => {

                const ref=`marker_${index}`
                 
                var infoWindow = marker.showInfo ? this.renderSearchInfoWindow(ref, marker) : null 
                //debugger;//brken

                // if(infoWindow){
                //   debugger;
                // }

                return (
                    
                     <Marker
                      key={index+100}
                      ref={ref}
                      {...marker} 
                        onClick={this.handleMarkerClick.bind(this, marker)}>
                        {infoWindow}
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