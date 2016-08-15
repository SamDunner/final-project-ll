import React, {Component} from 'react';
import {Fieldset, Field, createValue} from 'react-forms';
import cookie from 'react-cookie';
import $ from 'jquery';

const ImageUpload = React.createClass({

  getInitialState: function() {
    return this.props;
  },

  componentDidMount : function() {

  },

  uploadImage: function(event) {
    event.preventDefault();

    const imageURL = "http://localhost:8080/users/" + this.getCookie('user_id') + "/favorites/upload"

    $.ajax({
      method: "POST",
      data: {
        image_url: this.state.image_url
      }, //not sure what is passed in here"
      url: imageURL
    }).done((results) => {
      console.log("image uploaded!")
    });
  },

  render: function() {
    return (

    <div>
      <script>
      $(document).ready(function(){
          $(":file")
      });
      </script>


          <div>
          <form method="post" encType="multipart/form-data" action="/testImage" >
             <input type="file" className="myfile" />
            <br/>
            <input type="submit" value="Save" />
          </form>
          </div>

          <br/>
          <br/>

          <label className="custom-file">
            <input type="file" id="file" className="custom-file-input" />
            <span className="custom-file-control"></span>
          </label>
      </div>



      );
  }

})

export default ImageUpload;
