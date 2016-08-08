import React, {Component} from 'react';

// export class Map extends React.Component {

// 	constructor(props, context) {
//   		super(props, context);
//   	}

// 	componentDidUpdate(prevProps, prevState) {
// 		if(prevProps.google != this.props.google){
// 			this.loadMap();
// 		}
// 	}

// 	loadMap() {

// 		if(this.props && this.props.google){
			
// 			//gogle is available
// 			const {google} = this.props;
// 			const maps = google.maps;

// 			//create reference for the map component in the <div> - using ReactDOM
// 			const mapRef = this.refs.map;
// 			const node = ReactDOM.findDOMNode(mapRef);

// 			let zoom = 14;
//       		let lat = 37.774929;
//       		let lng = -122.419416;
//       		const center = new maps.LatLng(lat, lng)
//       		const mapConfig = Object.assign({}, {
//         		center: center,
//         		zoom: zoom
//       		});

//       		this.map = new maps.Map(node, mapConfig);

// 		}
// 	} 

// 	render() {
//     	return (
//       		<div ref='map'>
//       		</div>
//     )
// }

const Map = React.createClass({

	componentDidUpdate: function(prevProps, prevState) {
		if(prevProps.google != this.props.google){
			this.loadMap();
		}
	},

	loadMap: function() {
		if(this.props && this.props.google){
			
			//gogle is available
			const google = this.props;
			const maps = google.maps;

			//create reference for the map component in the <div> - using ReactDOM
			const mapRef = this.refs.map;
			const node = ReactDOM.findDOMNode(mapRef);

			let zoom = 14;
      		let lat = 37.774929;
      		let lng = -122.419416;
      		const center = new maps.LatLng(lat, lng)
      		const mapConfig = Object.assign({}, {
        		center: center,
        		zoom: zoom
      		});

      		this.map = new maps.Map(node, mapConfig);

		}
	}, 

	componentDidMount: function() {

	},

	render: function() {
		return (
			<div ref='map'>
				Loading Map..      
			</div>
    	);
	}
});



export default Map;