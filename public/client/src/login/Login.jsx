import React, {Component} from 'react';
import {Fieldset, Field, createValue} from 'react-forms'
import $ from 'jquery';

const Login = React.createClass({

	getInitialState: function() {

		var formValue = createValue({

			username: "",
			password: ""
		})

		return formValue;
	},

	componentDidMount : function() {

	},


	handleUsernameChange : function(event) {
		this.setState({username: event.target.value});
	},

	handlePasswordChange : function(event) {
		this.setState({password: event.target.value});
	},

	submitLogin: function(event) {
		event.preventDefault()
		console.log('registered!:', this.state)

		$(() => {
		  $.ajax({
		    method: "POST",
		    data: { username: this.state.username,
		    		password: this.state.password},
		    url: "http://localhost:8080/login"
		  }).done((results) => {
		  	console.log(results)
		    console.log("user is logged in!")
        $.cookie('test', 1, {
          expires: 10,
          path: '/login',
          domain: 'http://localhost:8080/',
          secure: true
        });
		  });
		});


	},

	render: function() {
		return (
			<div>

			<div id="login-form">
				<form className="login">
					<label> <input type="text" name="username" placeholder="Username" onChange={this.handleUsernameChange} /> </label>
					<br/>
					<label> <input type="text" name="password" placeholder="Password" onChange={this.handlePasswordChange} /> </label>
					<br/>
					<button className='btn-submit' onClick={this.submitLogin}>Login</button>
				</form>
			</div>

			</div>



    	);
	}

})

export default Login;
