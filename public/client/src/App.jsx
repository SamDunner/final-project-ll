"use-strict";
import React, {Component} from 'react';
import Signup from './signup/Signup.jsx';
import Login from './login/Login.jsx';

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

			userInfo: { username: "",
						password: "",
						user_id: ""
					}
			}
	},

	componentDidMount: function() {

	},

	login_info: function(info) {
		return info
	},

	registration_info: function(info){
		return info		
	},

	render: function() {
		

		return (
			      <div className="home-page">
			        
			      	<nav className="nav-bar">

			      	</nav>

			      	{this.state.registrationInfo.user_id !== "" &&

			      		<div className="registration">
			          
			            	<Signup registrationInfo={this.state.registrationInfo} registration_info={this.registration_info} />
			          
			          	<br/>
			          
			            	<Login userInfo={this.state.userInfo} login_info={this.login_info} />
			          
			        	</div>

			      	}

			        

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
