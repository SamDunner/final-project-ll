"use-strict";
import React, {Component} from 'react';
import Signup from './signup/Signup.jsx';
import Login from './login/Login.jsx';
import { Link } from 'react-router'
import cookie from 'react-cookie'

const App = React.createClass({

	getInitialState: function(){
		return {
			registrationInfo: {first_name: "",
						last_name: "",
						email: "",
						username: "",
						password: "",
						user_id: ""
					},

			loginInfo: { username: "",
						password: "",
						user_id: ""
					}
			}
	},

	

	user_info: function(info) {

		console.log(info)

		this.setState({first_name: info.first_name,
						last_name: info.last_name,
						email: info.email,
						username: info.username,
						password: info.password,
						user_id: info.user_id
					})

		cookie.save('user_id', info.user_id, { path: '/' });
	},

	componentDidMount: function() {

	},

	getCookie: function(){
		return document.cookie.substring(document.cookie.length - 1, document.cookie.length);
	},


	render: function() {
		
		

		return (
			      <div className="home-page">
			        
			      	<nav className="nav-bar">

			      	</nav>

			      	{ !document.cookie &&

			      		<div className="registration">
			          
			            	<Signup registrationInfo={this.state.registrationInfo} user_info={this.user_info} />
			          
			          	<br/>
			          
			            	<Login loginInfo={this.state.loginInfo} user_info={this.user_info} />
			          
			        	</div>

			        }
			      
			      	<span className="link" >
			      		<Link to={"users/" + this.getCookie() + "/collection"}>My Collection</Link>
			      		
			      	</span>
			        

			        <br/>

			    
			        <div className="map-list">

			        </div>


			        <div className="followers-list">

			        </div>


			        <div className="saved-map-list">

			        </div>

			      </div>

    	);
	}
});


export default App;
