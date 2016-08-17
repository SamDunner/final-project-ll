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
		//console.log('from search field, MapEdit_form.jsx:', this.state)

	},


	submitSearch: function(event) {
		event.preventDefault()
		console.log('arrived at submit search')


		var latLng = new google.maps.LatLng(this.props.map_location.centre.latitude, this.props.map_location.centre.longitude);

		var placeLocs = [];

	    var service = new google.maps.places.PlacesService(document.createElement('div'));
	    service.textSearch({location: latLng, query: this.state.search }, (results, status) => {
	      for(var i = 0; i < results.length; i++){

	      	console.log(results[i]);

	      	var placeInfo;

	      	if(results[i].place_id){
	      		service.getDetails({placeId: results[i].place_id}, (place, status) => {
	      			if(status === google.maps.places.PlacesServiceStatus.OK){
	      				console.log(place, status)
	      			}
	      		})
	      	}

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
					<label> Get a location: <input type="text" name="place" placeholder="Search here" onChange={this.handleSearchField} />
					</label>

					<button className='btn-submit' onClick={this.submitSearch}>Find!</button>
				</form>
			</div>

			</div>



    	);
	}

})

export default MapSearch_form;
