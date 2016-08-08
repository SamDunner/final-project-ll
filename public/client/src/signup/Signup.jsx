import React, {Component} from 'react';
import {Fieldset, Field, createValue} from 'react-forms';
import $ from 'jquery';
import cookie from 'react-cookie'


const Signup = React.createClass({

	getInitialState: function() {

		// var formValue = createValue({
		// 	first_name: "",
		// 	last_name: "",
		// 	email: "",
		// 	username: "",
		// 	password: ""
		// })

		// return formValue;

		return {

			first_name: this.props.registrationInfo.first_name,
			last_name: this.props.registrationInfo.last_name,
			email: this.props.registrationInfo.email,
			username: this.props.registrationInfo.username,
			password: this.props.registrationInfo.password,
			user_id: this.props.registrationInfo.user_id,
		}
	},

	componentDidMount : function() {

	},

	handleFirstNameChange : function(event) {
		this.setState({first_name: event.target.value});
	},

	handleLastNameChange : function(event) {
		this.setState({last_name: event.target.value});
	},

	handleEmailChange : function(event) {
		this.setState({email: event.target.value});
	},

	handleUsernameChange : function(event) {
		this.setState({username: event.target.value});
	},

	handlePasswordChange : function(event) {
		this.setState({password: event.target.value});
	},

	setCookie: function(id){
		
		this.setState({user_id: id });
		
       	cookie.save('user_id', id, { path: 'http://localhost:8080/login' });
       	this.props.registration_info(this.state)
	},

	submitRegistration: function(event) {
		event.preventDefault()

		var id;

		$(() => {
		  $.ajax({
		    method: "POST",
		    data: {first_name: this.state.first_name,
		    		last_name: this.state.last_name,
		    		email: this.state.email,
		    		username: this.state.username,
		    		password: this.state.password},
		    url: "http://localhost:8080/users"
		  }).done((results) => {
		  	
		    console.log("user updated!")
		    console.log(results)
         	id = results[0];

         	this.setCookie(id);

		  });
		});

		

	},

	render: function() {
		return (
			<div>
				<nav className="nav-bar">

				</nav>

			<div id="registration-form">
				<form className="register">
					<label> First name: <input type="text" name="firstname"  onChange={this.handleFirstNameChange} /> </label>
					<br/>
					<label> Last name: <input type="text" name="lastname"  onChange={this.handleLastNameChange} /> </label>
					<br/>
					<label> Email: <input type="text" name="email" onChange={this.handleEmailChange} /> </label>
					<br/>
					<label> Username: <input type="text" name="username" onChange={this.handleUsernameChange} /> </label>
					<br/>
					<label> Password: <input type="text" name="password" onChange={this.handlePasswordChange} /> </label>
					<br/>
					<button className='btn-submit' onClick={this.submitRegistration}>Register</button>
				</form>
			</div>

			</div>



    	);
	}

})

export default Signup;
