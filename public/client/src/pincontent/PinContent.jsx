import React, {Component} from 'react';
//import Map_form from './Map_form.jsx';
import NavBar from '../navbar/NavBar.jsx';
//import Map from './Map.jsx';
//import MapSearch_form from './MapSearch_form.jsx';
//import Marker from './Map.jsx';
//import PinTable from './PinTable.jsx';
import $ from 'jquery';

const PinContent = React.createClass({
	
	getInitalState: function(){
		return { map_information: { title: "",
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
          		
        }
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

		return (<div className="pin-content">

					<div className="standard-nav-bar">
	                    <NavBar />
	                </div>

	                <div>

	                </div>
			

				</div>)

	}

})

export default PinContent;