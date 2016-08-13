import React, {Component} from 'react';
import Map_form from './Map_form.jsx';
import NavBar from '../navbar/NavBar.jsx';
import Map from './Map.jsx';
import Marker from './Map.jsx';
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
					  				  	position: ""
				  				  	},

				  create_map: { centre: {latitude: 51.5074, longitude: -0.1278}}


				}
		
	},


	// function called when state is passed up from map_form upon form 
	// being submitted:
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
										      user_id: results[0].user_id,
										      map_id: results[0].map_id }
			})

		  });
		  
		
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

	centreMapLocation: function(location){
		this.setState({create_map: 
						{centre: {latitude: location.lat(), longitude: location.lng()}}})
	},

	componentDidMount: function() {	

	},


	getCookie: function(){
    	return document.cookie.substring(document.cookie.length - 1, document.cookie.length);
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

            			<div className="create-map" >
            				<div className="map-form">
			        			<Map_form centreMapLocation={this.centreMapLocation} map_information={this.state.map_information} map_info={this.map_info} />

			        			<label> to find? <input type="text" name="title" onChange={this.handleChangeLoc} />
								</label>


			        		</div>
			        		<div id="create">
			        			<Map map_location={this.state.create_map} marker_information={this.state.marker_information} />
			        		</div>
			        	</div>
			    	}

			    	{this.state.map_information.map_id &&

            			<div className="edit-map" >
			        		<div id="edit">
			        			<Map map_location={this.state.create_map} marker_information={this.state.marker_information} />
			        			
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

export default Create;

