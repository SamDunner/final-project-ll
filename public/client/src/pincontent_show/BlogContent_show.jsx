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

				<div className='blog-entry'>
					<label>Entry: </label>
					{this.props.marker_information.description}
				</div>
			</div>

			</div>



    	);
	}

})

export default BlogContent;