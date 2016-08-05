import React, {Component} from 'react';

const Signup = React.createClass({

	componentDidMount : function() {

	},

	render: function() {
		return (
			
			<form class="register">
				<label> First name: <input type='text' name='firstname'> </input> </label>
				<label> Last name: <input type='text' name='lastname'> </input> </label>
				<label> Email: <input type='text' name='email'> </input> </label>
				<label> Username: <input type='text' name='username'> </input> </label>
				<label> Password: <input type='text' name='password'> </input> </label>
			</form>

    	);
	}

})

export default Signup;