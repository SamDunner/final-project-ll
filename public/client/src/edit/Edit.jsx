import React, {Component} from 'react';

import NavBar from '../navbar/NavBar.jsx';
import Map from './MapEdit.jsx';
import MapSearch_form from './MapSearch_form.jsx';
import PinTable from './PinTable.jsx';
import $ from 'jquery';
import { Link } from 'react-router';

const Edit = React.createClass({


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


  removeMapLocation: function(marker, locs){

    console.log("from before removeMapLocation", marker, locs)

    for(var i = 0; i < locs.length; i++){

        if(marker.key == locs[i].key){
          locs.splice(i, 1)

          this.setState({map_places: locs}, () => {
            console.log("from removeMapLocation", this.state)
            this.forceUpdate()
          })

        }
    }

    console.log("from removeMapLocation", this.state)
  },

 deletePin: function(marker){
    var all_pins = this.state.pins;

    /*TODO: make AJAX delete request */

    $.ajax({
      method: "DELETE",
      url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.props.params.map_id + "/pins/" + marker.pin_id
    }).done((results) => {
      console.log(results);

      for(var i = 0; i < all_pins.length; i++){
        if(marker.pin_id == all_pins[i].pin_id){
          all_pins.splice(i, 1)
          this.setState({pins: all_pins})
        }
      }

    })



  },


  //function called when a pin is created in child map component.
  createPin: function(){
    console.log("from create pin" , this.state.marker_information);

    var allPins = this.state.pins;
    var routes = this.state.routePath

    if(this.state.marker_information.rating == undefined || this.state.marker_information.rating == ""){ this.state.marker_information.rating = 0
    }

    if(this.state.marker_information.type == undefined || this.state.marker_information.type == ""){ this.state.marker_information.type = "Restaurant"
    }

    $.ajax({
        method: "POST",
        data: {title: this.state.marker_information.title,
               description: this.state.marker_information.description,
               address: this.state.marker_information.address,
               date: this.state.marker_information.date,
               type: this.state.marker_information.type,
               latitude: this.state.marker_information.latitude,
               longitude: this.state.marker_information.longitude,
               rating: this.state.marker_information.rating,
               map_id: this.props.params.map_id,
               author_id: this.props.params.user_id },


        url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.props.params.map_id + '/pins'
      }).done((results) => {

        console.log('receiving saved pin from db',results)


        routes.push({lat: results[0].latitude, lng: results[0].longitude})


        let marker = {
            title: results[0].title,
            rating: results[0].rating,
            date: results[0].date,
            type: results[0].type,
            address: results[0].formatted_address || results[0].address,
            position: {lat: results[0].latitude, lng: results[0].longitude},
            map_id: results[0].map_id,
            user_id: results[0].user_id,
            pin_id: results[0].pin_id,
            info: false,
            description: results[0].description,
            showInfo: false,
            defaultAnimation: 2
        }

        allPins.push(marker)

        this.setState({pins: allPins, routePath: routes })

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

  //gets all pins from database up receiving map_id being updated in state.
  getAllPins: function(){

    var routes = this.state.routePath;

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

  componentDidMount: function() {
    this.getAllPins();
    this.getMap();


  },


  render: function() {

    // {if(this.state.map_information.map_id){
    //  this.getAllPins()
    // }}


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

              <div className="container full-edit-map">
                <div className="row name-map">
                  <div className="col-xs-12">
                  {this.state.map_information.title}
                  </div>
                </div>

                <br/>

                <div className="row edit-map" >
                  <div className="col-xs-12">
                  {/*<div>
                    <div id="title-input-change" contenteditable>{this.state.map_information.title}</div>
                  </div>*/}
                  <div id="change-loc" >
                  </div>
                    <div id="edit">
                       <Map
                        user_id={this.props.params.user_id}
                        map_id={this.props.params.map_id}
                        marker_information={this.state.marker_information}
                        routePath={this.state.routePath}
                        map_location={this.state.create_map}
                        pins={this.state.pins}
                        map_places={this.state.map_places}
                        deletePin={this.deletePin}
                        createPin={this.createPin}
                        removeMapLocation={this.removeMapLocation}
                      />

                    </div>
                  </div>
                </div>

                <div className="row edit-form">
                  <div className="col-xs-12">
                    <div id="row edit-map-form">
                      <MapSearch_form marker_information={this.state.marker_information}
                                      map_location={this.state.create_map}
                                      mapSearchLocations={this.mapSearchLocations}
                      />
                    </div>
                  </div>
                </div>

                <br/>


                <div className="row pin-list">
                  <div className="col-xs-12">
                    <PinTable centreMapLocation={this.centreMapLocation}
                              map_location={this.state.create_map}
                              pins={this.state.pins}
                    />
                  </div>


                  <div className="row page-links">
                    <div className="col-xs-offset-2 col-xs-3">
                      <Link className="btn btn-link"
                        to={"/users/" + this.props.params.user_id + "/collection"}
                        >
                        update map
                      </Link>
                    </div>

              <div className="col-xs-offset-2 col-xs-3">
                   <Link className="btn btn-link"
                    to={"/users/" + this.props.params.user_id + "/collection"}
                    >
                  delete map
                  </Link>
              </div>

              </div>

                </div>

            </div>
          </div>

      );
  }
});


export default Edit;
