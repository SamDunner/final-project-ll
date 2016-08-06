import React, {Component} from 'react';
import Signup from './signup/Signup.jsx';
import Login from './login/Login.jsx';

const App = React.createClass({

	componentDidMount: function() {

	},

	render: function() {
		return (
      <div>
        <div>

        </div>

        <div>
          <div>
            <Signup
              />
          </div>
          <br/>
          <div>
            <Login
            />
          </div>
        </div>

      </div>

    	);
	}
});


export default App;
