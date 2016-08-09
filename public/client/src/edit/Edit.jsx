import React from 'react';
//import {GoogleMapLoader, GoogleMap, Marker, InfoWindow, Circle, DirectionsRenderer, DrawingManager} from "react-google-maps";
// import GoogleMap from 'google-map-react';
//import Map, {GoogleApiWrapper} from 'google-maps-react';
//import MapOptions from './MapOptions.jsx'

import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

export default function SimpleMap (props) {

  

  return (
    <section style={{height: "100%"}}>
      <GoogleMapLoader
      	query={{ libraries: "geometry,drawing,places,visualization" }}
        containerElement={
          <div
            {...props.containerElementProps}
            style={{
              height: "100%"
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={3}
            defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
            onClick={props.onMapClick}
          >

          
           
          </GoogleMap>
        }
      />
    </section>
  );
}

// export class Container extends React.Component {

// 	constructor(props) {
// 		super(props)
// 	}

// 	render() {
// 		return (
// 			<div>
				
// 				<GoogleMapLoader
//               containerElement={
//                 <div
//                   id = 'mapDiv'
//                   //{...this.props}
//                   style={{
//                     height: "100%",
//                   }} > 
//                 </div>
//               }
//               googleMapElement={
//                 <GoogleMap
//                   ref='map'
//                   defaultZoom={13}
//                   defaultCenter={this.props.defaultCenter}
//                 >
               
//               </GoogleMap>
//           	}/>


// 			</div>
// 		)
// 	}
// }

// const Container = React.createClass({

// 	getInitialState: function() {
		
// 		return {map: null, marker: null, infowindow: null};
// 	},

// 	componentDidMount: function() {


// 	},

// 	render: function() {

// 		// if (!this.props.loaded) {
// 		//       return (<div>Loading...</div>);
// 		// }

// 		const map_style = {
//       			width: '100vw',
//       			height: '100vh'
//     	}

// 		return (
// 		      <div className="map-edit-page">
		        
// 		        <div className="nav-bar-wrapper">
// 		          <nav className="nav-bar">

// 		          </nav>
		        
// 		        </div>

// 		        <div className="map-edit">

// 		      	  <div style = {map_style}>
// 		          	<Map google={this.props.google} />
// 		          </div>

// 		        <div className="pin-list">
// 		        </div>

// 		        <div className="panel-list">
// 		        </div>

// 		      </div>

//     </div>

//     	);
// 	}
// });

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyB0MRsGZWMHr07c_ttwaBSmcNcSqKxrPLA"
// })(Container)


export default SimpleMap;

