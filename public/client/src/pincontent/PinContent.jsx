import React, {Component} from 'react';
import Map from './MapShow.jsx';
import NavBar from '../navbar/NavBar.jsx';
import BlogContent from './BlogContent.jsx';
import MapSearch_form from './MapSearch_form.jsx';
//import Marker from './Map.jsx';
//import PinTable from './PinTable.jsx';
import $ from 'jquery';
import { Link } from 'react-router';
import ImageUpload from '../image_upload/ImageUpload.jsx'

const PinContent = React.createClass({

	getInitialState: function(){

		return { map_information: { title: "",
                     location: "",
                     latitude: "",
                     longitude: "",
                     privacy: "",
                     published: false,
                     user_id: this.props.params.user_id,
                     map_id: "" },

          		marker_information: {
          			title: "",
	    			address: "",
	    			date: "",
                    description: "",
                    rating: "",
                    latitude: "",
                    longitude: "",
                    type: "",
                    pin_id: "",
                    map_id: ""},

          		pins: [],
          		map_places: [],
          		create_map: { centre: {latitude: 51.5074, longitude: -0.1278}},

        };
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

  	changeDescription: function(info){

  		console.log(info, this.state)

  		$.ajax({
	      method: "PUT",
	      data: { 'title': this.state.marker_information.title,
			      'description': info.description,
			      'type': this.state.marker_information.type,
			      'address': this.state.marker_information.address,
			      'date': this.state.marker_information.date,
			      'latitude': this.state.marker_information.latitude,
			      'longitude': this.state.marker_information.longitude,
			      'rating': this.state.marker_information.rating,
			      'map_id': this.state.marker_information.map_id,
			      'author_id': this.props.params.user_id },
	      url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.props.params.map_id + "/pins/" + this.props.params.pin_id
	    }).done((results) => {


	    });

  	},


	getPin: function(){

	    $.ajax({
	      method: "GET",
	      data: {pin_id: this.props.params.pin_id,
	      		 map_id: this.props.params.map_id,
	             user_id: this.props.params.user_id},
	      url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + this.props.params.map_id + "/pins/" + this.props.params.pin_id
	    }).done((results) => {

	    	console.log(results)

	    	let marker = {
	    			title: results[0].title,
	    			address: results[0].address,
	    			date: results[0].date,
                    description: results[0].description,
                    rating: results[0].rating,
                    position: {lat: results[0].latitude, lng: results[0].longitude},
                    info: false,
                    type: results[0].type,
                    pin_id: results[0].pin_id,
                    map_id: results[0].map_id
	    	}

	    	var all_pins = this.state.pins;
	    	all_pins.push(marker)

	    	this.setState({
	    		marker_information : {
	    			title: results[0].title,
	    			address: results[0].address,
	    			date: results[0].date,
                    description: results[0].description,
                    rating: results[0].rating,
                    latitude: results[0].latitude,
                    longitude: results[0].longitude,
                    type: results[0].type,
                    pin_id: results[0].pin_id,
                    map_id: results[0].map_id
	    		},
	    		pins: all_pins,
	    		create_map: {centre: {latitude: results[0].latitude, longitude: results[0].longitude }}

	    	}, () => {
	    		console.log(this.state)
	    	})

	    })

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
                    }, () => {
                    	console.log(this.state)
                    })


    	})

	},

	componentDidMount: function(){
		this.getMap();
		this.getPin();
	},

	render: function(){


		return (
      <div className="pin-content">

					<div className="standard-nav-bar">
	                    <NavBar />
	                </div>

                  <br/>
                  <br/>

          <div className="container blog-edit-map">

            <div className="row name-map">
              <div className="col-xs-offset-6 col-xs-5">
                {this.state.map_information.title}
              </div>

            <div className="row create-map">
              <div className="col-xs-6">

                <div className="map-form">
                    <BlogContent marker_information={this.state.marker_information}
                           changeDescription={this.changeDescription}
                    />



                </div>
              </div>

                <div className="create-map col-xs-6" >
                  <div id="create">
                    <Map
                      marker_information={this.state.marker_information}
                      map_location={this.state.create_map}
                        map_places={this.state.map_places}
                        pins={this.state.pins}
                    />
                  </div>
                </div>
              </div>
              <div className="row map-search">
                <div className="col-xs-offset-6 col-xs-6">
                  <MapSearch_form marker_information={this.state.marker_information}
                                  map_location={this.state.create_map}
                                  mapSearchLocations={this.mapSearchLocations}
                                  map_places={this.state.map_places}
                  />
                </div>
              </div>








  {/*}                                <div>
                                    <ImageUpload />
                                  </div>
  */}

<br/>
<br/>

		                <Link className="btn btn-warning" to={"/users/" + this.props.params.user_id + "/maps/" + this.props.params.map_id + "/pins/" + this.props.params.pin_id + "/content"} > Save this Blog Entry </Link>

		                <div className="file_upload">

			            	<form method="POST" encType="multipart/form-data" action={"/users/" + this.props.params.user_id + "/maps/" + this.props.params.map_id + "/pins/" + this.props.params.pin_id + "/edit/upload"} className="dropzone">
			            	</form>
		            	</div>

		            </div>
		            


          </div>
          </div>



        )

	}

})

export default PinContent;
