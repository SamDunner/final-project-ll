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
      <label>Name: {this.props.panelInfo.name}</label>

      }

      {this.props.panelInfo.address &&
      <label>Address: {this.props.panelInfo.address}</label>
      }

      {this.props.panelInfo.phone_number &&
      <label>Phone no.: {this.props.panelInfo.phone_number}</label>
      }

      {this.props.panelInfo.rating &&
      <label>Rating: {this.props.panelInfo.rating}</label>
      }

      {this.props.panelInfo.url &&
      <label>google url: {this.props.panelInfo.url}</label>
      }

      {this.props.panelInfo.website &&
      <label>website: {this.props.panelInfo.website}</label>
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
