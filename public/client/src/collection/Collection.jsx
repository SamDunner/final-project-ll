import React, {Component} from 'react';
import NavBar from '../navbar/NavBar.jsx';
import cookie from 'react-cookie';
import App from '../App.jsx';
import Map from './MapShow.jsx';
import $ from 'jquery';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import ProfileNavBar from '../navbar/ProfileNavBar.jsx';



const Collection = React.createClass({

  getInitialState: function() {
    console.log(this.props.params)

    return {
      maps: []
    }

  },

  getCookie: function(){
    return document.cookie.substring(document.cookie.length - 1, document.cookie.length);
  },

  getCollection: function(event) {
    console.log("getCollection")

    const collectionURL = "http://localhost:8080/users/" + this.props.params.user_id + "/maps"

    $.ajax({
      method: "GET",
      url: collectionURL
    }).then((results) => {

      // for (var map in results ){
      //   this.state.maps.push(results[map])
      // }
      this.setState({maps: results});

      console.log(this.state)
    });
  },


  getPins: function(id){

    $.ajax({
      method: "GET",
      url: "http://localhost:8080/users/" + this.props.params.user_id + "/maps/" + id + "/pins",
    }).then((results) => {

      //this.setState({maps: results});

      //console.log(this.state)
    });

  },

  componentDidMount: function() {
    this.getCollection()
  },

  render: function() {

    console.log("COLLECTION RENDER: ", this.state);
    return (
        <div className="profile-page">
          <div className="nav-bar">
            <nav className="double-nav-bar">
              <ProfileNavBar />
            </nav>
          </div>

        { this.state.maps &&
          this.state.maps.map((map, index) => {
            return (
              <div className="map-object">
                
                
                <Map key={map.map_id}
                    map_location={{centre: {latitude: map.latitude, longitude: map.longitude}}} 
                />
                
              </div>


              )
          })
        }
        </div>
    );
  }
});


export default Collection;
