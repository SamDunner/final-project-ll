import React, {Component} from 'react';
import Map_form from './Map_form.jsx';
import NavBar from '../navbar/NavBar.jsx';
import Map from './Map.jsx';
import MapSearch_form from './MapSearch_form.jsx';
import Marker from './Map.jsx';
import PinTable from './PinTable.jsx';
import { Link } from 'react-router';
import $ from 'jquery';
import ChangeLoc_form from './ChangeLoc_form.jsx'
import ChangeTitle from './ChangeTitle.jsx'
import Panel from './Panel.jsx'


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
          routePath: [],
          panelInfo: {}
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
                          user_id: this.props.params.user_id,
                          map_id: results[0].map_id }
      	})

      });


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
      url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.state.map_information.map_id + "/pins/" + marker.pin_id
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


  changeMapTitle: function(title){

     $.ajax({
        method: "PUT",
        data: {title: title,
               location: this.state.map_information.location,
               latitude: this.state.map_information.latitude,
               longitude: this.state.map_information.longitude,
               privacy: this.state.map_information.privacy,
               published: this.state.map_information.published },
        url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.state.map_information.map_id
      }).done((results) => {

        console.log("map updated!");
        console.log(results);

          this.setState({
            map_information: {
              title: results[0].title,
              location: results[0].location,
              latitude: results[0].latitude,
              longitude: results[0].longitude,
              privacy: results[0].privacy,
              published: results[0].published,
              user_id: this.props.params.user_id,
              map_id: results[0].map_id
            }
          }, () => {
            console.log(this.state)
            this.forceUpdate();
          })
          
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
               map_id: this.state.map_information.map_id,
               author_id: this.props.params.user_id },


        url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.state.map_information.map_id + '/pins'
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

  createPanelInfo: function(marker){
    console.log("from create panel info", marker)
    var panelInfo = this.state.panelInfo
    var service = new google.maps.places.PlacesService(document.createElement('div'));

    if(marker.place_id){
      service.getDetails({placeId: marker.place_id}, (place, status) => {
        if(status === google.maps.places.PlacesServiceStatus.OK){
          console.log("from inside create panel info", place)
            
            var panelData = {
              name: place.name,
              address: place.formatted_address,
              phone_number: place.formatted_phone_number,
              rating: place.rating,
              reviews: place.reviews,
              url: place.url,
              photos: place.photos,
              website: place.website
            }

          this.setState({panelInfo: panelData}, () => {
            console.log("from inside the panel info", this.state)
          })

        }
      })
    }

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
          place_id: locations[i].place_id,
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

  newMapLocation: function(latLng, location){

      console.log("from map new location", latLng, location, this.state);

      $.ajax({
        method: "PUT",
        data: {title: this.state.map_information.title,
               location: location.formatted_address,
               latitude: latLng.lat(),
               longitude: latLng.lng(),
               privacy: this.state.map_information.privacy,
               published: this.state.map_information.published },
        url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.state.map_information.map_id
      }).done((results) => {

        console.log("map updated!");
        console.log(results);

          this.setState({
            map_information: {
              title: results[0].title,
              location: results[0].location,
              latitude: results[0].latitude,
              longitude: results[0].longitude,
              privacy: results[0].privacy,
              published: results[0].published,
              user_id: this.props.params.user_id,
              map_id: results[0].map_id
            },
            create_map: {centre: {latitude: results[0].latitude, longitude: results[0].longitude}
          }}, () => {
            console.log(this.state)
            this.forceUpdate();
          })
          
        })

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

    if(this.state.map_information.map_id){

      $.ajax({
        method: "GET",
        data: {map_id: this.state.map_information.map_id,
               user_id: this.props.params.user_id},
        url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.state.map_information.map_id
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
    }

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

      // var routes = this.state.routePath

      // for(var i = 0; i < results.length; i++){
      //   routes.push({lat: results[i].latitude, lng: results[i].longitude})
      // }

  		this.setState({pins: results})

  	})
  },

  componentDidMount: function() {
    this.getMap()
  },


  render: function() {

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

            <div className="container move-edit-map">
              <div className="create-map col-xs-6">
            <br/>
                <div className="map-form">
                <Map_form centreMapLocation={this.centreMapLocation} map_information={this.state.map_information} map_info={this.map_info} />
                </div>
              </div>

                <div className="create-map col-md-6 col-lg-6" >
                  <div id="create">
                    <Map map_location={this.state.create_map} marker_information={this.state.marker_information} />
                  </div>
                </div>
              </div>
            }

            {this.state.map_information.map_id &&

                <div className="container full-edit-map">
                  <div className="row name-map">
                    <div className="col-xs-12">
                    {this.state.map_information.title}
                    <ChangeTitle  changeMapTitle={this.changeMapTitle}
                                  map_information={this.state.map_information} />

                    <ChangeLoc_form newMapLocation={this.newMapLocation}
                    />
                    </div>
                  </div>

                  <br/>


                  <div className="row edit-map">
                    <div className="col-xs-12">
                      <div id="edit">
                        <Map
                          user_id={this.props.params.user_id}
                          map_id={this.state.map_information.map_id}
                        	marker_information={this.state.marker_information}
                          routePath={this.state.routePath}
                        	map_location={this.state.create_map}
                        	pins={this.state.pins}
                          map_places={this.state.map_places}
                          deletePin={this.deletePin}
                          createPin={this.createPin}
                          removeMapLocation={this.removeMapLocation}
                          createPanelInfo={this.createPanelInfo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row edit-form">
                    <div className="col-xs-12">
                      <div id="edit-map-form">
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
                              user_id={this.props.params.user_id}
                              map_id={this.state.map_information.map_id}
                        		  map_location={this.state.create_map}
                        		  pins={this.state.pins}/>
              	    </div>

                  <div className="row submit-pin">
                    <div className="col-xs-12">
                      <Link className="btn btn-link"
                        to={"/users/" + this.props.params.user_id + "/maps/" + this.state.map_information.map_id}
                        >
                      update map
                      </Link>
                    </div>
                  </div>

                  <div className="panel-list">
                      <div className="col-xs-12">
                      <Panel panelInfo={this.state.panelInfo}/>
                      </div>
                  </div>

                  </div>
                </div>
            }

            </div>

      );
  }
});


export default Create;

