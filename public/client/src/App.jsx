import React, {Component} from 'react';
import Signup from './signup/Signup.jsx';
import Login from './login/Login.jsx';

const App = React.createClass({

	componentDidMount: function() {

	},

	render: function() {
		return (
			      <div className="home-page">
			        
			      	<nav className="nav-bar">

			      	</nav>

			        <div className="registration">
			          
			            <Signup />
			          
			          <br/>
			          
			            <Login />
			          
			        </div>

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
