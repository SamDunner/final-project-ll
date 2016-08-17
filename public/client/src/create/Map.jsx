import React, { Component} from 'react';
//import {GoogleMapLoader, GoogleMap, Marker, InfoWindow, Circle, DirectionsRenderer, DrawingManager} from "react-google-maps";
// import GoogleMap from 'google-map-react';
//import Map, {GoogleApiWrapper} from 'google-maps-react';
//import MapOptions from './MapOptions.jsx'
import { Link } from 'react-router';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow, Polyline, DrawingManager} from "react-google-maps";
//import MarkerContent from './MarkerContent.jsx'
import $ from 'jquery';

export default class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      new_markers: []
    }

    this.onMapClick = this.onMapClick.bind(this);
    this.handleNewMarkerClick = this.handleNewMarkerClick.bind(this);
    //this.handleMarkerRightclick = this.handleMarkerRightclick.bind(this);
    this.handlePinTitle = this.handlePinTitle.bind(this);
    this.handlePinDescription = this.handlePinDescription.bind(this);
    this.onInfoWindowButtonSubmit = this.onInfoWindowButtonSubmit.bind(this);

  }

  handleClose(marker){
    marker.info = false;
    this.setState(this.state);
  }

  handleWindowClose(marker){
    marker.showSearchInfo = true
    marker.showInfo = false
    this.setState(this.state);
  }

  handleSearchMarkerClose(marker) {
    marker.showSearchInfo = false;
    marker.showInfo = false;
    this.setState(this.state);
  }

  handleNewMarkerClose(marker) {
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

<<<<<<< 9bb85d6851a35aaa0a02bb590644da7d4ec4d92c

=======
    
>>>>>>> added complete functionality between create , edit , show and collection pages.
    console.log("on new/search pin delete" , marker)
    //if(marker.type == "new"){
      var markers = this.state.new_markers;
      for(var i = 0; i < markers.length; i++){
        if(marker.key == markers[i].key){
          markers.splice(i, 1)
          this.setState({new_markers: markers})
        }
<<<<<<< 9bb85d6851a35aaa0a02bb590644da7d4ec4d92c

      }
    //}
=======
      }
>>>>>>> added complete functionality between create , edit , show and collection pages.
  }

  handlePinTitle(event){

    //this.setState({pinContent : {title: event.target.value}});
    this.props.marker_information.title = event.target.value
  }

  handlePinAddress(event){

    this.props.marker_information.address = event.target.value
  }

  handlePinType(event){
    console.log(event.target.value);
    this.props.marker_information.type = event.target.value
  }

  handlePinDate(event){

    this.props.marker_information.date = event.target.value
  }

  handlePinDescription(event){

    //this.setState({pinContent : {description: event.target.value}});
    this.props.marker_information.description = event.target.value;
  }

  handlePinRating(event){

    this.props.marker_information.rating = event.target.value
  }


  renderInfo(ref, marker) {

    return (

      <InfoWindow
          key={`${ref}_info_window`}
          onCloseclick={this.handleClose.bind(this, marker)} >

<<<<<<< 9bb85d6851a35aaa0a02bb590644da7d4ec4d92c
            {<div className='marker-info-search'>

                <h4>Title: {marker.title}</h4>
                <br/>

=======
            {<div className='marker-info-search'> 
               
                <h4>Title: {marker.title}</h4>  
                <br/>  

>>>>>>> added complete functionality between create , edit , show and collection pages.

                <h4>Date: {marker.date}</h4>
                <br/>

                <h4>Address: {marker.address || marker.formatted_address}</h4>
                <br/>

<<<<<<< 9bb85d6851a35aaa0a02bb590644da7d4ec4d92c

                <h4>Type: {marker.type}</h4>
                <br/>

=======
                <h4>Type: {marker.type}</h4>  
                <br/>   
>>>>>>> added complete functionality between create , edit , show and collection pages.

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


  renderWindow(ref, marker) {
    console.log("finding the ref", ref, marker)

    return (

      <InfoWindow
          key={`${ref}_info_window`}
          onCloseclick={this.handleSearchMarkerClose.bind(this, marker)} >
            {<div className='marker-info'>

                <h4> Title: </h4>
                  <input type="text" onChange={this.handlePinTitle} className='pin-title' />
                <br/>

                <h4> Date: </h4>
                  <input type="text" onChange={this.handlePinDate.bind(this)} className='pin-date' />
                <br/>

                <h4> Address: </h4>
                  <input type="text" defaultValue={marker.address || marker.formatted_address} onChange={this.handlePinAddress.bind(this)} className='pin-address' />
                <br/>

                <h4>Type: </h4>

                  <select onChange={this.handlePinType.bind(this)} id='select-type'>
                      <option>Restaurant</option>
                      <option>Bar</option>
                      <option>Shop</option>
                      <option>Home</option>
                      <option>Place of worship</option>
                      <option>Other</option>
                  </select>

                <br/>
                <h4>Description: </h4>
                  <textarea defaultValue={marker.description} type="text" onChange={this.handlePinDescription} className='pin-description'></textarea>

                <br/>
                <br/>

                <h4>Rating: </h4>

                  <select onChange={this.handlePinRating.bind(this)} id='select-type'>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                  </select>

                <br/>
                <br/>

                <button onClick={this.onInfoWindowButtonSubmit.bind(this, marker)} className='btn btn-success' >Save</button>
                <br/>
                <br/>


            </div>}


      </InfoWindow>
    )
  }


  renderNewWindow(ref, marker) {
    console.log("finding the ref", ref, marker)

    return (

      <InfoWindow

          key={`${ref}_info_window`}
          onCloseclick={this.handleNewMarkerClose.bind(this, marker)} >
            {<div className='marker-info'>

                <h4> Title: </h4>
                  <input type="text" onChange={this.handlePinTitle} className='pin-title' />
                <br/>

                <h4> Date: </h4>
                  <input type="text" onChange={this.handlePinDate.bind(this)} className='pin-date' />


                <br/>

                <h4> Address: </h4>
                  <input type="text" onChange={this.handlePinAddress.bind(this)} className='pin-address' />
                <br/>

                <h4>Type: </h4>

                  <select onChange={this.handlePinType.bind(this)} id='select-type'>
                      <option>Restaurant</option>
                      <option>Bar</option>
                      <option>Shop</option>
                      <option>Home</option>
                      <option>Place of worship</option>
                      <option>Other</option>
                  </select>

                <br/>

                <h4>Description: </h4>
                  <textarea type="text" onChange={this.handlePinDescription} defaultValue={marker.description} className='pin-description'></textarea>

                <br/>

                <h4>Rating: </h4>

                  <select onChange={this.handlePinRating.bind(this)} id='select-type'>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                  </select>

                <br/>
                <br/>


                <button onClick={this.onInfoWindowButtonSubmit.bind(this, marker)} className='btn btn-info' >Save</button>


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
          onCloseclick={this.handleSearchMarkerClose.bind(this, marker)} >
            {<div className='marker-info-search'>

                <h4>Title: {marker.name}</h4>
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

               <button className='btn btn-success' /*onClick={this.renderInfoWindow(ref, marker)}*/ onClick={this.onAddToPins.bind(this, marker)} type='submit'>Add to pins</button>

            </div>}


      </InfoWindow>
    )
  }



  handleSearchMarkerclick(marker, event){

    console.log('from handleSearchMarkerClick', marker, event)

    marker.showSearchInfo = true;
    marker.showInfo = false;

    this.setState(this.state)
  }

  handleInfoMarker(marker, event){
    marker.info = true;

    console.log("Handle Marker Click state: ", this.state);

    this.setState(this.state)
  }

  handleNewMarkerClick(marker, event){

    console.log('from handleNewMarkerClick', marker, event)

    this.props.marker_information.latitude  = marker.position.lat()
    this.props.marker_information.longitude = marker.position.lng()
    //this.props.marker_information.rating    = marker.position.rating;


    marker.showInfo = true;

    console.log("Handle New Marker Click state: ", this.state);


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
                var infoWindow = marker.showInfo ? this.renderNewWindow(ref, marker) : null


                return (

                    <Marker
                    key={index}
                    ref={ref}
                    {...marker}
                      onClick={this.handleNewMarkerClick.bind(this, marker)}>

                    {infoWindow}

                    </Marker>

                )

              })

            }

            {this.props.map_places &&
              this.props.map_places.map((marker, index) => {

                const ref=`marker_${index}`

                var infoSearchWindow = marker.showSearchInfo ? this.renderSearchInfoWindow(ref, marker) : null

                var infoWindow = marker.showInfo ? this.renderWindow(ref, marker) : null


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

                //var infoWindow = marker.showInfo ? this.renderInfoWindow(ref, marker) : null
                //debugger;//brken

                // if(infoWindow){
                //   debugger;
                // }

                return (

                     <Marker
                      key={index+1000}
                      ref={ref}

                      {...marker}

                        onClick={this.handleInfoMarker.bind(this, marker)}>

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
