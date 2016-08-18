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
        <div>
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Pins:</th>

              </tr>
            </thead>
            <tbody>
              {this.props.pins.map((pin, index) => {
                            return(

                              <tr>
                                <td>
                                    <div class="btn-group">
                                      <button onClick={this.handleClick.bind(this, pin)} type="button" className="btn btn-info">{pin.title}</button>
                                       <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="caret"></span>
                                        <span class="sr-only">Toggle Dropdown</span>
                                      </button>
                                       <ul class="dropdown-menu">
                                        <li><a href="#">Action</a></li>
                                        
                                      </ul>
                                    </div>
                                 </td>
                              </tr>

                            );
                     })
                }


            </tbody>
          </table>
        </div>
    )

  },

})

export default PinTable;