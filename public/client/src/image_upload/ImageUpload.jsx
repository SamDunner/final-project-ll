import React, {Component} from 'react';
import {Fieldset, Field, createValue} from 'react-forms';
import cookie from 'react-cookie';
import $ from 'jquery';
import NavBar from '../navbar/NavBar.jsx';

const ImageUpload = React.createClass({

  getInitialState: function() {

    console.log(this.props)

    return {image_url: ""}
  },

  componentDidMount : function() {
    
    $('#file_upload').on('change', (event) => {
      console.log("in jquery", event)
    })

  },

  uploadImage: function(event) {
    event.preventDefault();
    
    console.log(event)

   

    // $.ajax({
    //     method: "POST",
    //     data: {image_url:     },
    //     url: "/users/" + this.props.params.user_id + "/maps/" + this.props.params.map_id + "/pins/" + this.props.params.pin_id + "/edit/upload"

    //   method: "POST",
    //   data: {
    //     image_url: this.state.image_url
    //   }, //not sure what is passed in here"
    //   url: imageURL
    // }).done((results) => {
    //   console.log("image uploaded!")
    // });
  },


  //users/:user_id/maps/:map_id/pins/:pin_id/content/pictures

  getCookie: function(){
    return document.cookie.substring(document.cookie.length - 1, document.cookie.length);
  },

  render: function() {
    return (

      <div className="image-upload-page">
        <div className="standard-nav-bar">
              <NavBar />
        </div>

          <br/>
          <br/>

        <div>
          <form method="POST" encType="multipart/form-data" action={"/users/" + this.props.params.user_id + "/maps/" + this.props.params.map_id + "/pins/" + this.props.params.pin_id + "/edit/upload"} className="dropzone">
            
          </form>
        </div>

        <br/>
        <br/>

       {/*} <label className="custom-file">
          <input type="file" id="file" className="custom-file-input" />
          <span className="custom-file-control"></span>
        </label> */}
      </div>



      );
  }

})

export default ImageUpload;
