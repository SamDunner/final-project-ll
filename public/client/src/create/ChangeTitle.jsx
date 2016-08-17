import React, {Component} from 'react';
import {Fieldset, Field, createValue} from 'react-forms';
import $ from 'jquery';
import NavBar from '../navbar/NavBar.jsx';
import cookie from 'react-cookie'

var autocomplete;

const ChangeTitle = React.createClass({




	render: function() {




		return (
				<div>

							<div id="map-create-form">
								<form className="create">


								<div 
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

export default ChangeTitle