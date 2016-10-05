import React, {Component} from 'react';
import {Fieldset, Field, createValue} from 'react-forms';
import $ from 'jquery';
import NavBar from '../navbar/NavBar.jsx';
import cookie from 'react-cookie'

const Panel = React.createClass({

	getInitialState: function(){
		return {}
	},

	render: function(){

		return(

		<div className="Panel">


			{this.props.panelInfo.name &&
			<div className="name">Name: {this.props.panelInfo.name}</div>

			}

			{this.props.panelInfo.address &&
			<div className="address">Address: {this.props.panelInfo.address}</div>
			}

			{this.props.panelInfo.phone_number &&
			<div className="phone-number">Phone no.: {this.props.panelInfo.phone_number}</div>
			}

			{this.props.panelInfo.rating &&
			<div className="rating">Rating: {this.props.panelInfo.rating}</div>
			}

			{this.props.panelInfo.url &&
			<div className="url">Google url: {this.props.panelInfo.url}</div>
			}

			{this.props.panelInfo.website &&
			<div className="website">website: {this.props.panelInfo.website}</div>
			}

			{this.props.panelInfo.reviews &&

				this.props.panelInfo.reviews.map((review, index) => {

					return (
						<div className="review">
							<div className="reviewer">
								{review.author_name}
							</div>
							<div className="review-text">
								{review.text}
							</div>
						</div>
					)
				})
			}


		</div>

		)
	}
})

export default Panel;
