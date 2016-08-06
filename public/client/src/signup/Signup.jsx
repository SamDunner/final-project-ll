import React, {Component} from 'react';
import {Fieldset, Field, createValue} from 'react-forms'
import $ from 'jquery';

const Signup = React.createClass({

	getInitialState: function() {

		var formValue = createValue({
			first_name: "", 
			last_name: "", 
			email: "", 
			username: "", 
			password: "" 			
		})

		return formValue;
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

	submitRegistration: function(event) {
		event.preventDefault()
		console.log('registered!:', this.state)
		
		$.post("http://localhost:8080/users").done(function(data) {
			console.log("success!")
		})


	},

	render: function() {
		return (

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



    	);
	}

})

export default Signup;