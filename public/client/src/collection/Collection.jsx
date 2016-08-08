import React, {Component} from 'react';

const Collection = React.createClass({

	getInitialState: function() {
		console.log(this.props.params)

		return this.props.params
	},

	componentDidMount: function() {

	},

	render: function() {
		return (
			      <div className="collection-page">
			        
			      	<nav className="nav-bar">

			      	</nav>


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


export default Collection;
