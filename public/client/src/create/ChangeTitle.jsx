import React, {Component} from 'react';
import {Fieldset, Field, createValue} from 'react-forms';
import $ from 'jquery';
import NavBar from '../navbar/NavBar.jsx';
import cookie from 'react-cookie'

var autocomplete;

const ChangeTitle = React.createClass({

	getInitialState: function(){
		return { title: "" }
	},

	handleTitle: function(event){
		this.setState({title: event.target.value})
	},

	submitNewTitle: function(event){
		console.log("from new title", this.state)
		this.props.changeMapTitle(this.state.title)
	},

	render: function() {


		return (
				<div>		
					<div id="change-title-input">
						<input onChange={this.handleTitle} defaultValue={this.props.map_information.title}/>
					</div>
					<div className="change-title-btn">
						<button onClick={this.submitNewTitle} className="btn btn-default">Change Title</button>
					</div>					
				</div>
			);
	}



})

export default ChangeTitle