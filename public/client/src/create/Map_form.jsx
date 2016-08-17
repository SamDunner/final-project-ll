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
				this.props.centreMapLocation(place.geometry.location);

				this.setState({latitude: place.geometry.location.lat(),
					   		   longitude: place.geometry.location.lng() })
			}

		});
	},

	componentDidMount: function() {

		this.getMapCentre();

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
					   privacy: privacy,
					   published: false });

	},



	submitMap: function(event) {
		event.preventDefault()

		if(this.state.title !== "" && this.state.location !== ""){
			this.props.map_info(this.state)
			console.log(this.state)
		}


	},

	render: function() {




		return (
						<div>

							<div id="map-create-form">
								<form className="create">
									<label> What would you like to name this map?
				            <br/>
				          <input type="text" name="title"  onChange={this.handleMapTitle} />
									</label>
									  <br/>
				            <br/>
									{/* id of input field below must not be changed */}
									<label> Where would you like this map to be located?
				            <br/>
				          <input type="text" name="location" id="create-autocomplete" onChange={this.handleMapLocationLatLongAndPrivacy} />
									</label>
									  <br/>
									  <br/>
				          <label> Would you like this map to be private?
				            <br/>
				          <select id='selectBox'>
				            <option value="Yes">Yes</option><option value="no">no</option>
				          </select>
				  				</label>
									<br/>
				          <br/>
									<label>Create your map!
				            <br/>
				          <button className='btn-submit' onClick={this.submitMap}>save</button>
				          </label>
								</form>
							</div>

			</div>
			);
	}

})

export default Map_form;
