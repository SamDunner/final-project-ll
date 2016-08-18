import React, {Component} from 'react';
import NavBar from '../navbar/NavBar.jsx';
import Map from './MapShow.jsx';
import MapShow_form from './MapShow_form.jsx';
import $ from 'jquery';
import PinTable from './PinTable.jsx'
import { Link } from 'react-router';

const Show = React.createClass({


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
                        address: "",
                        date: "",
                        type: "",
                        latitude: "",
                        longitude: "",
                        position: "",
                        pin_id: ""
                      },
          pins: [],
          create_map: { centre: {latitude: 51.5074, longitude: -0.1278}},
          map_places: [],
          routePath: []
        }
  },

  getCookie: function(){
      return document.cookie.substring(document.cookie.length - 1, document.cookie.length);
  },
	
    mapSearchLocations: function(locations) {
    console.log("arrived at mapSearchLocations", locations)
    var searchLocations = this.state.map_places;

    for(var i = 0; i < locations.length; i++){

        let marker = {
          name: locations[i].name,
          rating: locations[i].rating,
          address: locations[i].formatted_address || locations[i].address,
          position: locations[i].geometry.location,
          key: locations[i].id,
          content: this.props.infoWindowContent,
          map_type: "search",
          showSearchInfo: false,
          showInfo: false,
          defaultAnimation: 2
        }

        searchLocations.push(marker);

    }

    this.setState({map_places: searchLocations});

    console.log("updated  state at mapSearchLocations", this.state)
    this.forceUpdate()
  },
  

  //updates the state of the map central location:
  centreMapLocation: function(location, type){

    if(type === "table"){
      this.setState({create_map:
                      {centre: {latitude: location.lat, longitude: location.lng}
                  }})
    } else {

      this.setState({create_map:
                       {centre: {latitude: location.lat(), longitude: location.lng()}
                  }})
    }
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
  	
    var routes = this.state.routePath

  	$.ajax({
  		method: "GET",
  		data: {map_id: this.props.params.map_id,
  			   user_id: this.props.params.user_id},
  		url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.props.params.map_id + '/pins'
  	}).done((results) => {
  		
  		console.log(results);
      var markers = [];
      for(var i = 0; i < results.length; i++){

        routes.push({lat:results[i].latitude, lng: results[i].longitude})

         let marker = {
            title: results[i].title,
            rating: results[i].rating,
            date: results[i].date,
            type: results[i].type,
            address: results[i].formatted_address || results[i].address,
            position: {lat: results[i].latitude, lng: results[i].longitude},
            map_id: results[i].map_id,
            user_id: results[i].user_id,
            pin_id: results[i].pin_id,
            showInfo: false,
            description: results[i].description,
            info: false,
            defaultAnimation: 2
          }
          markers.push(marker)
      }

      this.setState({pins: markers, routePath: routes}, () => {
        console.log(this.state)
        this.forceUpdate()
      })
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
                      user_id={this.props.params.user_id}
                      map_id={this.props.params.map_id}
		                	marker_information={this.state.marker_information} 
		                	map_location={this.state.create_map}
                      routePath={this.state.routePath}
		                  map_places={this.state.map_places} 
		                  pins={this.state.pins} 
		                />

		            </div>
		            <div id="show-map-form">
		                <MapShow_form marker_information={this.state.marker_information} 
		                			        map_location={this.state.create_map}
		                         	    mapSearchLocations={this.mapSearchLocations}
		                         	    
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

            <Link className="btn btn-warning"
                    to={"/users/" + this.props.params.user_id + "/maps/" + this.props.params.map_id + "/edit"}
                    >
                  Edit
            </Link>

            <Link className="btn btn-info"
                    to={"/users/" + this.props.params.user_id + "/collection"}
                    >
                  Back to Collections
            </Link>


            </div>

      );
  }



});

//Pin code to be used later to add a new marker: <i class="fa fa-map-marker" aria-hidden="true"></i>

export default Show;