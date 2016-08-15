import React, {Component} from 'react';
import NavBar from '../navbar/NavBar.jsx';
import Map from './MapShow.jsx';
import MapShow_form from './MapShow_form.jsx';
import $ from 'jquery';
import PinTable from './PinTable.jsx'

const Show = React.createClass({


	getInitialState: function(){

		console.log("params", this.props.params)

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
	
  mapSearchLocations: function() {
 	console.log("arrived at mapSearchLocations", this.state)
    
    //console.log("updated  state at mapSearchLocations", this.state)
    this.forceUpdate()
  },

  //updates the state of the map central location:
  centreMapLocation: function(location){
    this.setState({create_map:
                   {centre: {latitude: location.lat, longitude: location.lng}}})
  },

  getMap: function(){

    $.ajax({
      method: "GET",
      data: {map_id: this.props.params.map_id,
           user_id: this.props.params.user_id},
      url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.props.params.map_id
    }).done((results) => {
      
       this.setState({ map_information: {title: results[0].title,
                                         location: results[0].location,
                                         latitude: results[0].latitude,
                                         longitude: results[0].longitude,
                                         privacy: results[0].privacy,
                                         published: results[0].published,
                                         user_id: this.props.params.user_id,
                                         map_id: results[0].map_id },

                            create_map: {centre: {latitude: results[0].latitude, longitude: results[0].longitude }}
                    })
    })

  },

 /*
  * gets all pins from database up receiving map_id being updated in state.
  *
  */
  getAllPins: function(){
  	
  	$.ajax({
  		method: "GET",
  		data: {map_id: this.props.params.map_id,
  			   user_id: this.props.params.user_id},
  		url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.props.params.map_id + '/pins'
  	}).done((results) => {
  		
  		// for(var res in results){
  		// 	this.state.pins.push(results[res]);
  		// }

      this.setState({pins: results})

  		console.log(this.state);
  		this.forceUpdate();
  	})
  
  },

  getCookie: function(){
      return document.cookie.substring(document.cookie.length - 1, document.cookie.length);
  },

  componentDidMount: function() {
  	this.getAllPins();
    this.getMap();
  },

  render: function() {

    const style = {
            width: '100vw',
            height: '100vh'
      }

    return (
            <div className="map-show-page">

              <div className="standard-nav-bar">
                    <NavBar />
              </div>


	          <br/>
	          <br/>
	          <br/>
	          <br/>

	            <div className="show-map" >
		            <div id="show">
		                <Map
		                	marker_information={this.state.marker_information} 
		                	map_location={this.state.create_map}
		                    map_places={this.state.map_places} 
		                    pins={this.state.pins} 
		                />

		            </div>
		            <div id="show-map-form">
		                <MapShow_form marker_information={this.state.marker_information} 
		                			  map_location={this.state.create_map}
		                         	  mapSearchLocations={this.mapSearchLocations}
		                         	  map_places={this.state.map_places}
		                />
		            </div>
	            </div>
            

            <div className="pin-list">
              <PinTable centreMapLocation={this.centreMapLocation}
                        map_location={this.state.create_map}
                        pins={this.state.pins} />
            </div>


            <div className="panel-list">

            </div>


            </div>

      );
  }



});

//Pin code to be used later to add a new marker: <i class="fa fa-map-marker" aria-hidden="true"></i>

export default Show;