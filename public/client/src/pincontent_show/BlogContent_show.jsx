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

				<h2 className='blog-title'>
					{this.props.marker_information.title}
				</h2>

				<div className='blog-date'>
          {this.props.marker_information.date}
				</div>

				<div className='blog-address'>
					{this.props.marker_information.address}
				</div>

				<div className='blog-entry'>
					{this.props.marker_information.description}
				</div>
			</div>

			</div>



    	);
	}

})

export default BlogContent;
