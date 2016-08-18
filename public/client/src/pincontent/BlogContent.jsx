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

				<h2 className='create'>{this.props.marker_information.title}</h2>

				<div className='blog-date'>
					{this.props.marker_information.date}
				</div>

				<div className='blog-address'>
					{this.props.marker_information.address}
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
