import React, {Component} from 'react';
import Map_form from './Map_form.jsx';
import NavBar from '../navbar/NavBar.jsx';

const Create = React.createClass({

	getInitialState: function() {
		return  { map_information: { title: "",
							  location: "",
							  latitude: "",
							  longitude: "",
							  privacy: "",
							  published: false,
							  user_id: this.props.params.user_id,
							  map_id: ""
							}
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
            		{this.state.map_id == "" &&
			        	<Map_form map_information={this.state.map_information} map_info={this.map_info} />
			    	}

			    	{!this.state.map_id == "" &&
			    		
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

