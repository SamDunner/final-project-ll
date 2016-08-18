import React, {Component} from 'react';
import {Fieldset, Field, createValue} from 'react-forms';
import $ from 'jquery';
import NavBar from '../navbar/NavBar.jsx';
import cookie from 'react-cookie'

var autocomplete;

const Map_form = React.createClass({

	getMapCentre: function(){

		autocomplete = new google.maps.places.Autocomplete(
			(document.getElementById('create-autocomplete')), {types: ['(regions)']});

		autocomplete.addListener('place_changed', () => {
			console.log("place_changed map form ", autocomplete.getPlace());

			var place = autocomplete.getPlace();

			if(place){
				console.log(place.geometry.location.lat(), place.geometry.location.lng() );
				this.props.newMapLocation(place.geometry.location, place);

				this.setState({latitude: place.geometry.location.lat(),
					   		   longitude: place.geometry.location.lng() })
			}

		});
	},

	componentDidMount: function() {

		this.getMapCentre();

	},


	handleMapLocationLatLong: function(event) {
		

	},



	submitMap: function(event) {
		event.preventDefault()
	},

	render: function() {

		return (
			<div id="map-create-form">
				<form className="change-map-location">
					{/* id of input field below must not be changed */}
					<label> Change Location:
		          	<input type="text" name="location" id="create-autocomplete" onChange={this.handleMapLocationLatLong} />
					</label>
				</form>
			</div>
			);
	
	}
})

export default Map_form;