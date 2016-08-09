import React, {Component} from 'react';
import {Fieldset, Field, createValue} from 'react-forms';
import $ from 'jquery';
import NavBar from '../navbar/NavBar.jsx';
import cookie from 'react-cookie'

const Map_form = React.createClass({

	getInitialState: function() {

		return {

			title: this.props.map_information.title,
			location: this.props.map_information.location,
			latitude: this.props.map_information.latitude,
			longitude: this.props.map_information.longitude,
			privacy: this.props.map_information.privacy,
			published: this.props.map_information.published,
			user_id: this.props.map_information.user_id
			map_id:this.props.map_information.map_id
		}
	},

	componentDidMount : function() {

	},

	handleMapTitle: function(event) {
		this.setState({title: event.target.value});
	},

	handleMapLocationLatLongAndPrivacy: function(event) {

		var privacy;

		if(document.getElementById('selectBox').value == 'Yes'){
			privacy = true;
		} else {
			privacy = false;
		}

		this.setState({location: event.target.value,
					   latitude: -74.0059,
					   longitude: 40.7128,
					   privacy: privacy });
		
	},

	setMapId: function(id){
		this.setState({user_id: id})
		console.log(this.state);
		this.props.map_info(this.state)
	},

	submitMap: function(event) {
		event.preventDefault()

		var map_id;

		$(() => {
		  $.ajax({
		    method: "POST",
		    data: {title: this.state.title,
		    		location: this.state.location,
		    		latitude: this.state.latitude,
		    		longitude: this.state.longitude,
		    		privacy: this.state.privacy,
		    		published: this.state.published},
		    url: "http://localhost:8080/users/" + this.state.user_id + "/maps"
		  }).done((results) => {

		    console.log("map updated!")
		    console.log(results)
         	map_id = results[0];

         	this.setMapId(map_id)

		  });
		});

	},

	render: function() {
		return (
			<div>

			<div id="map-create-form">
				<form className="create">
					<label> What would you like to name this map? <input type="text" name="title"  onChange={this.handleMapTitle} />
					</label>
					<br/>
					<label> Where would you like this map to be located: <input type="text" name="location"  onChange={this.handleMapLocationLatLongAndPrivacy} />
					</label>
					<br/>
					<label> Would you like this map to be private? <select id='selectBox'><option value="Yes">Yes</option>
  																		   <option value="no">no</option> 
  																		   
  																    </select>
  					</label>
					<br/>
					<button className='btn-submit' onClick={this.submitMap}>Register</button>
				</form>
			</div>

			</div>



    	);
	}

})

export default Map_form;