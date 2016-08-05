import React, {Component} from 'react';

const Signup = React.createClass({

	getInitialState: function() {
		return { first_name: "", last_name: "", email: "", username: "", password: "" };
	},

	componentDidMount : function() {

	},

	handleFieldChange : function(event) {
		this.setState({first_name: event.target.value, 
					   last_name: event.target.value,
					   email: event.target.value,
					   username: event.target.value,
					   password: event.target.value	})
	},


	render: function() {
		return (
			
			<div id="registration-form">
			<form className="register">
				<label> First name: <input type="text" name="firstname" value={this.state.value} onChange={this.handleFieldChange} /> </label>
				<br/>
				<label> Last name: <input type="text" name="lastname" value={this.state.value} onChange={this.handleFieldChange} /> </label>
				<br/>
				<label> Email: <input type="text" name="email" value={this.state.value} onChange={this.handleFieldChange} /> </label>
				<br/>
				<label> Username: <input type="text" name="username" value={this.state.value} onChange={this.handleFieldChange} /> </label>
				<br/>
				<label> Password: <input type="text" name="password" value={this.state.value} onChange={this.handleFieldChange} /> </label>
				<br/>
				<button className='btn-submit'>Register</button>
			</form>
			</div>

    	);
	}

})

export default Signup;