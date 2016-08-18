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
					<div className="change-title-input">
  						<form className="">
              <label>Rename your map: <input onChange={this.handleTitle} placeholder={this.props.map_information.title}/>
              </label>
    						<button className='btn-submit' onClick={this.submitNewTitle}>Rename</button>
            </form>
				  </div>
        </div>
			);
	}



})

export default ChangeTitle
