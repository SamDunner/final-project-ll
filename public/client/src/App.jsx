import React, {Component} from 'react';
import Signup from './signup/Signup.jsx';
import Login from './login/Login.jsx';

const App = React.createClass({

	componentDidMount: function() {

	},

	render: function() {
		return (

      <div className="home-page-pre-login">

        <div className="nav-bar">
          <nav>
          test tex
          </nav>
        </div>

        <div className="main-body">

          <div className="registration-form">
            New to our blog? Sign up:
            <Signup />
          </div>
            <br/>
          <div className="login-form">
              Have an account? Log in:
              <Login />
          </div>
            <br/>
          <div className="fix-parent-collapser">
          </div>
            <br/>
{/*
Will put this code in once the home page is rendered (so there will be an if statement)
          <div className="map-list">
          test code here [will make this a map <br/> list colum later once we've figured out cookies in react]
          </div>
            <br/>
          <div className="followers-list">
          test code here [will make this a followers <br/> list column later once we've figured out cookies in react]
          </div>
            <br/>
          <div className="saved-map-list">
          test code here [will make this a saved-map <br/> list column later once we've figured out cookies in react]
          </div>  */}
        </div>
      </div>

    	);
	}
});


export default App;
