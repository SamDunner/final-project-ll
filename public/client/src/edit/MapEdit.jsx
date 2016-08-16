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
      new_markers: []
    }

    this.onMapClick = this.onMapClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    //this.handleMarkerRightclick = this.handleMarkerRightclick.bind(this);
    this.handlePinTitle = this.handlePinTitle.bind(this);
    this.handlePinDescription = this.handlePinDescription.bind(this);
    this.onInfoWindowButtonSubmit = this.onInfoWindowButtonSubmit.bind(this);

  }

  handleClose(marker){
    marker.info = false;
    this.setState(this.state);
  }

  handleSearchMarkerClose(marker) {
    // marker.showSearchInfo = false;
    // this.setState(this.state);
  }

  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }

  onAddToPins(marker, event){
    console.log('add to pins!');
    console.log(marker)
    console.log(event)
    marker.showSearchInfo = false;

    this.props.marker_information.latitude  = marker.position.lat()
    this.props.marker_information.longitude = marker.position.lng()
    this.props.marker_information.rating    = marker.position.rating;

    marker.showInfo = true;
    this.setState(this.state);
    //this.renderInfoWindow(marker.key, marker);
  }

  onDeletePin(marker, event){
    this.props.deletePin(marker);
  }
  
  onInfoWindowButtonSubmit(marker, event){
    console.log(marker)
    console.log(event)
    console.log(this.props.marker_information)
    marker.showInfo = false
    
    if(marker.showSearchInfo){
      marker.showSearchInfo = true;
    } 

    this.props.createPin();

    this.setState(this.state)

    console.log("last look at state and props, upon pin submission", this.props, this.state)

    var all_new_markers = this.state.new_markers;
    var all_search_markers = this.props.map_places;
    
    if(marker.map_type == "new"){
      for(var i = 0; i < all_new_markers.length; i++){
        
        if(marker.key == all_new_markers[i].key){
          all_new_markers.splice(i, 1)
          this.setState({new_markers: all_new_markers})
        }
      }

    } else if(marker.map_type == "search"){
      
      this.props.removeMapLocation(marker, all_search_markers)
    }

    console.log("checking state after onInfoWindowButtonSubmit", this.props, this.state)
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

  renderInfo(ref, marker) {

    return (

      <InfoWindow
          key={`${ref}_info_window`} 
          onCloseclick={this.handleClose.bind(this, marker)} >
            {<div className='marker-info-search'> 
               
                <h4> Title: {marker.title}</h4> 
                  
                <br/>  

                <h4>Description: {marker.description}</h4> 
                  
                <br/>
                {marker.rating &&
                  <h4>rating: {marker.rating}</h4> 
                   
                }
                <br/> 

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




  renderInfoWindow(ref, marker) {
    console.log("finding the ref", ref)

    return (

      <InfoWindow
          key={`${ref}_info_window`} 
          onCloseclick={this.handleSearchMarkerClose.bind(this, marker)} >
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
                
                <button onClick={this.onInfoWindowButtonSubmit.bind(this, marker)} className='submit-marker' >Click here to create new pin</button>
                <br/> 
                <br/> 
               
               <button onClick={this.onInfoWindowButtonDelete.bind(this, marker)} className='btn btn-warning' type='submit'>Delete Pin</button>  
            
            </div>}


      </InfoWindow>
    )
  }

  renderSearchInfoWindow(ref, marker) {

    return (

      <InfoWindow
          key={`${ref}_info_window`} 
          onCloseclick={this.handleMarkerClose.bind(this, marker)} >
            {<div className='marker-info-search'> 
               
                <h4> Title: {marker.name}</h4> 
                  
                <br/>  

                <h4>Description: {marker.description}</h4> 
                  
                <br/>
                {marker.rating &&
                  <h4>rating: {marker.rating}</h4> 
                   
                }
                <br/> 
               
               <button className='btn btn-success' /*onClick={this.renderInfoWindow(ref, marker)}*/ onClick={this.onAddToPins.bind(this, marker)} type='submit'>Add to pins</button>  
            
            </div>}


      </InfoWindow>
    )
  }

  

  handleSearchMarkerclick(marker, event){

    console.log('from handleSearchMarkerClick', marker, event)
    // let InfoWindow = {
    //   position: event.latLng,
    //   key: Date.now(),
    //   content: this.props.infoWindowContent
    // }

    // this.state.infoWindow = InfoWindow
    // console.log(this.state)

    // this.props.marker_information.latitude  = marker.position.lat()
    // this.props.marker_information.longitude = marker.position.lng()
    // this.props.marker_information.rating    = marker.position.rating;

    marker.showSearchInfo = true;
    this.setState(this.state)
  }

  handleMarker(marker, event){

    console.log('from handleMarkerClick', marker, event)

    marker.info = true;
    
    console.log("Handle Marker Click state: ", this.state);
    
    this.setState(this.state)
  }

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
      map_type: "new",
      showSearchInfo: false,
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


      { console.log("from render method Map.js, getting pins from DB", this.props)

        var markers = []
        

        if(this.props.pins){
        for(var i = 0; i < this.props.pins.length; i++){
          
          //console.log("render mapshow.jsx", this.props.pins[i])
                 let marker = {
            title: this.props.pins[i].title,
            rating: this.props.pins[i].rating,
            address: this.props.pins[i].formatted_address || this.props.pins[i].address,
            position: {lat: this.props.pins[i].latitude, lng: this.props.pins[i].longitude},
            pin_id: this.props.pins[i].pin_id,
            description: this.props.pins[i].description,
            info: false,
            defaultAnimation: 2
          }

          markers.push(marker);

        }
        console.log(markers)
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
                 
                var infoSearchWindow = marker.showSearchInfo ? this.renderSearchInfoWindow(ref, marker) : null 

                var infoWindow = marker.showInfo ? this.renderInfoWindow(ref, marker) : null
                //debugger;//brken

                // if(infoWindow){
                //   debugger;
                // }

                return (
                    
                     <Marker
                      key={index+100}
                      ref={ref}
                      {...marker} 
                        onClick={this.handleSearchMarkerclick.bind(this, marker)}>
                        {infoSearchWindow}
                        {infoWindow}
                    </Marker>
                    
                )

              })
              
            }


            {this.props.pins &&
              this.props.pins.map((marker, index) => {

                const ref=`marker_${index}`
                 
                var infoSearchWindow = marker.info ? this.renderInfo(ref, marker) : null 

                return (
                    
                     <Marker
                      key={index+1000}
                      ref={ref}
                      {...marker} 
                        onClick={this.handleMarker.bind(this, marker)}>
                        
                        {infoSearchWindow}
                        
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