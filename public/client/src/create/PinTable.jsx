import React, {Component}  from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery'
import cookie from 'react-cookie';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';




const PinTable = React.createClass({


    handleClick: function(pin){
      console.log("click", pin)
      this.props.centreMapLocation({lat: pin.latitude, lng: pin.longitude})
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
                <th>#</th>
                
              </tr>
            </thead>
            <tbody>
              {this.props.pins.map((pin, index) => {
                            return(
                            
                                <tr>
                                  <td>
                                        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          Action <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                          <li><a href="#">Action</a></li>
                                          <li><a href="#">Another action</a></li>
                                          <li><a href="#">Something else here</a></li>
                                          <li role="separator" class="divider"></li>
                                          <li><a href="#">Separated link</a></li>
                                        </ul>
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