import React, {Component} from 'react';
import Map_form from './Map_form.jsx';
import NavBar from '../navbar/NavBar.jsx';
import Map from './Map.jsx';
import Marker from './Map.jsx';

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
				  				  	 position: ""}
				}
		
	},

	componentDidMount: function() {
		
	},

	map_info: function(info){
		this.setState({title: info.title,
					   location: info.location,
					   latitude: info.latitude,
					   longitude: info.longitude,
					   privacy: info.privacy,
					   published: info.published,
					   user_id: info.user_id,
					   map_id: info.map_id })

		console.log(this.state)
	},

	infoWindowContent: function(){
		let content = "<article class='pin-info'>" +
		                  "<form method='POST' action='http://localhost:8080/users/" + this.state.user_id + "/maps/" + this.state.map_id + "'>" +
		                  "<h4> Title </h4>" +
		                  "<input class='pin-title' value='' name='title'></input>" +
		                  "<br>" +

		                  //"<h4>Type</h4>" +
		            
		                  
		                          // "<select id='select-type'>" +
		                          //     "<option >Restaurant</option>" +
		                          //     "<option >Bar</option>" +
		                          //     "<option >Shop</option>" +
		                          //     "<option >Other user</option>" +
		                          //     "<option >Home </option>" +
		                          //     "<option >Other </option>" +
		                          // "</select>" +
		                      
		                  //"<br>" +

		                "<h4> Description </h4>" +
		                "<textarea class='pin-description' value='' name= description> </textarea>" +
		                "<br><br>" +
		              "<button class='btn btn-info' type='submit'>Click here to create new pin</button> " +
		                 "</form>" +
		                 "<br>" +
		                 "<br>" +
		                 "<button class='btn btn-warning' type='submit'>Delete Pin</button>" + 
		                "</article>"

		return content;
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
            		
            	
            		{!this.state.map_id &&

            			<div className="create-map" >
            				<div className="map-form">
			        			<Map_form map_information={this.state.map_information} map_info={this.map_info} />
			        		</div>
			        		<div id="create">
			        			<Map marker_information={this.state.marker_information} infoWindowContent={this.infoWindowContent()}/>
			        		</div>
			        	</div>
			    	}

			    	{this.state.map_id &&

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

