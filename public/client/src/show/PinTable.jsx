import React, {Component}  from 'react';
// import Divider from 'material-ui/Divider';
// import Paper from 'material-ui/Paper';
// import TextField from 'material-ui/TextField';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery'
import cookie from 'react-cookie';
// import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';




const PinTable = React.createClass({


    handleClick: function(pin){
      console.log("click", pin)
      this.props.centreMapLocation({lat: pin.position.lat, lng: pin.position.lng}, "table");
    },

    render: function(){


    const style = {
      marginLeft: 20,
    };


    return (
       <div className="map-create-pins">
          { this.props.pins.length > 0 &&
            <div>
              <div className="row">
                <div className="col-xs-12">
                  Created Pins:
                </div>
              </div>

            { this.props.pins.map((pin, index) => {
              return(

                <div className="row pin">
                  <div className="col-xs-12">

                    <button onClick={this.handleClick.bind(this, pin)} type="button" className="btn btn-info pin-name">
                      find pin
                    </button>

                    <span className="pin-title">
                      {pin.title}
                    </span>

                    <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="caret"></span>
                      <span className="sr-only">Toggle Dropdown</span>
                    </button>

                    <ul className="dropdown-menu">
                      <li><a href="#">Action</a></li>
                      <li><a href="#">Another action</a></li>
                      <li><a href="#">Something else here</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#">Separated link</a></li>
                    </ul>
                  </div>
                </div>
              );//return
            })//map pin
          }
          </div>
        }

        { this.props.pins.length == 0 &&
          <div className="message-to-user">
            You have no pins! To create a pin on this map, click the edit button below.
          </div>
        }
      </div>
    )

  },

})

export default PinTable;
