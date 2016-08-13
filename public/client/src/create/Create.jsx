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

				  create_map: { centre: {latitude: 0.1278, longitude: 51.5074}}


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
			        		</div>
			        		<div id="create">
			        			<Map map_location={this.state.create_map} marker_information={this.state.marker_information} />
			        		</div>
			        	</div>
			    	}

			    	{this.state.map_information.map_id &&

            			<div className="edit-map" >
			        		<div id="edit">
			        			<Map  />
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

