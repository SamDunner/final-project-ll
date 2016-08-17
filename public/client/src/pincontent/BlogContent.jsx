import React, {Component} from 'react';
import {Fieldset, Field, createValue} from 'react-forms';
import $ from 'jquery';
import NavBar from '../navbar/NavBar.jsx';
import cookie from 'react-cookie'

const BlogContent = React.createClass({

	getInitialState: function() {

		return {
			description: ""
		}
	},

	componentDidMount : function() {

	},

	handleDescription: function(event) {
		this.setState({description: event.target.value});
	},

	
	submitBlog: function(event) {
		event.preventDefault()

		console.log(this.state, this.props)
		this.props.changeDescription(this.state)

	},

	render: function() {
		return (
			<div>

			<div id="blog-form">
				
				<div className='blog-title'>
					<label>Title: {this.props.marker_information.title}</label>
				</div>

				<div className='blog-date'>
					<label>Date: {this.props.marker_information.date}</label>
				</div>

				<div className='blog-address'>
					<label>Address: {this.props.marker_information.address}</label>
				</div>				

				
					<textarea defaultValue={this.props.marker_information.description} onChange={this.handleDescription} className='blog-description' type='text'>

					</textarea>

					<button className='btn-submit' onClick={this.submitBlog}>Save</button>
				
			</div>

			</div>



    	);
	}

})

export default BlogContent;