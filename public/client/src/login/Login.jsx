import React, {Component} from 'react';
import {Fieldset, Field, createValue} from 'react-forms'
import cookie from 'react-cookie'
import $ from 'jquery'

const Login = React.createClass({

	getInitialState: function() {

		return {

			username: this.props.loginInfo.username,
			password: this.props.loginInfo.password,
			user_id: this.props.loginInfo.user_id
		}
	},

	componentDidMount : function() {

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
       	this.props.user_info(this.state)
	},

	submitLogin: function(event) {
		event.preventDefault()


		var id;

		$(() => {
		  $.ajax({
		    method: "POST",
		    data: { username: this.state.username,
		    		password: this.state.password},
		    url: "http://localhost:8080/login"
		  }).done((results) => {
		    console.log("user is logged in!")
        	id = results[0].user_id;
        	this.setCookie(id);
		  });
		})


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
