import React, {Component}  from 'react';

import $ from 'jquery'
import cookie from 'react-cookie';





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
