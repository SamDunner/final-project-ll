import React, {Component} from 'react';
import {Fieldset, Field, createValue} from 'react-forms';
import $ from 'jquery';
import NavBar from '../navbar/NavBar.jsx';
import cookie from 'react-cookie'



const MapSearch_form = React.createClass({

	getInitialState: function(){
		return {
			search: "",
			locs: []
		}
	},

	componentDidMount : function() {

	},

	handleSearchField: function(event) {

		this.setState({search: event.target.value});
		//console.log('from search field, MapSearch_form.jsx:', this.state)

	},


	submitSearch: function(event) {
		event.preventDefault()
		console.log('arrived at submit search')


		var latLng = new google.maps.LatLng(this.props.map_location.centre.latitude, this.props.map_location.centre.longitude);

		var placeLocs = [];

	    var service = new google.maps.places.PlacesService(document.createElement('div'));
	    service.textSearch({location: latLng, query: this.state.search }, (results, status) => {
	      for(var i = 0; i < results.length; i++){
	        placeLocs.push(results[i])
	        this.state.locs.push(results[i])
	      }

	      this.props.mapSearchLocations(placeLocs)
	    })

		
	},

	render: function() {
		return (
			<div>

			<div className="map-create-form">
				<form className="">
					<label> What are you searching for? <input type="text" name="place" onChange={this.handleSearchField} />
					</label>
					<br/>
					
					<button className='btn-submit' onClick={this.submitSearch}>Search</button>
				</form>
			</div>

			</div>



    	);
	}

})

export default MapSearch_form;