import React, {Component} from 'react';
import Map_form from './Map_form.jsx';
import NavBar from '../navbar/NavBar.jsx';
import Map from './Map.jsx';
import MapEdit_form from './MapEdit_form.jsx';
import Marker from './Map.jsx';
import PinTable from './PinTable.jsx';
import $ from 'jquery';

const Create = React.createClass({

  getInitialState: function() {
    return  { map_information: { title: "",
                     location: "",
                     latitude: "",
                     longitude: "",
                     privacy: "",
                     published: false,
                     user_id: this.props.params.user_id,
                     map_id: "" },

          marker_information: { title: "",
                        description: "",
                        rating: "",
                        latitude: "",
                        longitude: "",
                        position: "",
                        pin_id: ""
                      },
          pins: [],
          create_map: { centre: {latitude: 51.5074, longitude: -0.1278}},
          map_places: []
        }
  },


  getCookie: function(){
      return document.cookie.substring(document.cookie.length - 1, document.cookie.length);
  },

 /* 
  * function called when state is passed up from map_form upon form
  * being submitted:
  */ 
  map_info: function(info){

      $.ajax({
        method: "POST",
        data: {title: info.title,
            location: info.location,
            latitude: info.latitude,
            longitude: info.longitude,
            privacy: info.privacy,
            published: this.state.map_information.published},
        url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps"
      }).done((results) => {

        console.log("map updated!");
        console.log(results);

          this.setState({ map_information: {title: results[0].title,
                          location: results[0].location,
                          latitude: results[0].latitude,
                          longitude: results[0].longitude,
                          privacy: results[0].privacy,
                          published: results[0].published,
                          user_id: results[0].this.props.params.user_id,
                          map_id: results[0].map_id }
      	})

      });


  },

  //function called when a pin is created in child map component.
  createPin: function(){
  	console.log("from create pin" , this.state.marker_information);
  	
  	if(this.state.marker_information.rating == undefined){ this.state.marker_information.rating = 0}

  	$.ajax({
        method: "POST",
        data: {title: this.state.marker_information.title,
               latitude: this.state.marker_information.latitude,
               longitude: this.state.marker_information.longitude,
               rating: this.state.marker_information.rating,
               map_id: this.state.map_information.map_id,
               sort_order: 4,
               author_id: this.props.params.user_id },
        url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.state.map_information.map_id + '/pins' 
      }).done((results) => {
      	

      	let marker = {
	          title: results[0].title,
	          rating: results[0].rating,
	          address: results[0].formatted_address || results[0].address,
	          position: {lat: results[0].latitude, lng: results[0].longitude},
	          pin_id: results[0].pin_id,
	          description: results[0].description,
	          showInfo: false,
	          defaultAnimation: 1
	        }

	    this.state.pins.push(marker);

	    console.log("state from creating new pin", this.state);
      	//this.setState({marker_information: {pin_id: }})

      })

  },

  handleChangeLoc: function(event){

    //var map = new google.maps.Map(this.refs.mapCanvas)
      var latLng = new google.maps.LatLng(this.state.create_map.centre.latitude, this.state.create_map.centre.longitude);

      var service = new google.maps.places.PlacesService(document.createElement('div'));
      service.textSearch({location: latLng, query: event.target.value }, (results, status) => {
        for(var i = 0; i < results.length; i++){
          console.log(results[i])
        }
      })

  },

  mapSearchLocations: function(locations) {
  	console.log("arrived at mapSearchLocations", locations)
    this.state.map_places = locations;
    console.log("updated  state at mapSearchLocations", this.state)
    this.forceUpdate()
  },

  //updates the state of the map central location:
  centreMapLocation: function(location){
    this.setState({create_map:
            {centre: {latitude: location.lat(), longitude: location.lng()}}})
  },

  

  //gets all pins from database up receiving map_id being updated in state.
  getAllPins: function(){
  	$.ajax({
  		method: "GET",
  		data: {map_id: this.state.map_information.map_id,
  			   user_id: this.props.params.user_id},
  		url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.state.map_information.map_id + '/pins'
  	}).done((results) => {
  		console.log(results);
  		for(var res in results){
  			this.state.pins.push(results[res]);
  		}
  	})
  },

  componentDidMount: function() {
  	
  },
  

  render: function() {

  	{if(this.state.map_information.map_id){
  		this.getAllPins()
  	}}


    const style = {
            width: '100vw',
            height: '100vh'
      }

    return (
            <div className="map-edit-page">

              <div className="standard-nav-bar">
                    <NavBar />
                </div>


          <br/>
          <br/>
          <br/>
          <br/>

            {!this.state.map_information.map_id &&

              <div className="create-map" >
                <div className="map-form">
                <Map_form centreMapLocation={this.centreMapLocation} map_information={this.state.map_information} map_info={this.map_info} />

              </div>
              <div id="create">
                <Map map_location={this.state.create_map} marker_information={this.state.marker_information} />
              </div>
            </div>
            }

            {this.state.map_information.map_id &&

                  <div className="edit-map" >
                  <div id="edit">
                    <Map
                    	marker_information={this.state.marker_information} 
                    	map_location={this.state.create_map}
                    	pins = {this.state.pins}
                        map_places={this.state.map_places}
                        createPin={this.createPin} 
                    />

                  </div>
                  <div id="edit-map-form">
                    <MapEdit_form marker_information={this.state.marker_information} 
                    			  map_location={this.state.create_map}
                             	  mapSearchLocations={this.mapSearchLocations}
                    />
                  </div>
                </div>
            }

              <div className="pin-list">
              	

              </div>


              <div className="panel-list">

              </div>


            </div>

      );
  }
});

//Pin code to be used later to add a new marker: <i class="fa fa-map-marker" aria-hidden="true"></i>

export default Create;

