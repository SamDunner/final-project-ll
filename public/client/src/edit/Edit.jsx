import React, {Component} from 'react';

import NavBar from '../navbar/NavBar.jsx';
import Map from './MapEdit.jsx';
import MapSearch_form from './MapSearch_form.jsx';
// PinTable from './PinTable.jsx';
import $ from 'jquery';

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

  //function called when a pin is created in child map component.
  createPin: function(){
    console.log("from create pin" , this.state.marker_information);
    
    var allPins = this.state.pins;

    console.log("from create pin , find current state ", this.state.pins )

    if(this.state.marker_information.rating == undefined){ this.state.marker_information.rating = 0}

    $.ajax({
        method: "POST",
        data: {title: this.state.marker_information.title,
               latitude: this.state.marker_information.latitude,
               longitude: this.state.marker_information.longitude,
               rating: this.state.marker_information.rating,
               map_id: this.props.params.map_id,
               sort_order: 4,
               author_id: this.props.params.user_id },
        url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.props.params.map_id + '/pins' 
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

      allPins.push(marker)

      this.setState({pins: allPins}, () => {
        console.log("finding if pin has been created:", this.state)
      })

      //console.log("state from creating new pin", this.state);
        //this.setState({marker_information: {pin_id: }})

      })

  },

  mapSearchLocations: function(locations) {
    console.log("arrived at mapSearchLocations", locations)
    this.setState({map_places: locations});
    console.log("updated  state at mapSearchLocations", this.state)
    this.forceUpdate()
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


  getAllPins: function(){
    $.ajax({
      method: "GET",
      data: {map_id: this.props.params.map_id,
           user_id: this.props.params.user_id},
      url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.props.params.map_id + '/pins'
    }).done((results) => {
      
      this.setState({pins: results})
     
    })
  },

  componentDidMount: function() {
    this.getAllPins();
    this.getMap();
  },

  render: function() {

    console.log("render, edit.jsx", this.state)

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
                    <MapSearch_form 
                      marker_information={this.state.marker_information} 
                      map_location={this.state.create_map}
                      mapSearchLocations={this.mapSearchLocations}
                    />
                  </div>
                </div>
            

              <div className="pin-list">
                

              </div>


              <div className="panel-list">

              </div>


            </div>

      );
  }


});

//Pin code to be used later to add a new marker: <i class="fa fa-map-marker" aria-hidden="true"></i>

export default Edit;
