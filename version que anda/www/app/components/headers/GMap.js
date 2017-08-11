import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import autoBind from 'react-autobind';

const coords = {
  lat: -37.3388432,
  lng: -57.0293418,
  infolat: -37.339315,
  infolng: -57.026081,
  ldmlat: -37.339515,
  ldmlng: -57.026081,
};

class GMap extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true,
      styles:
      [{
          featureType: "poi",
          stylers: [{ visibility: "off" }]
      }]
    });
  }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

  render() {
    return (
      <Gmaps
        width={'100%'}
        height={'450px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={17}
        loadingMessage={'Be happy'}
        params={{v: '3.exp', key: 'AIzaSyD6WbEWM8afq3Sq4e3yiN9kh7qcfUtMi3Q'}}
        onMapCreated={this.onMapCreated}>
        <Marker
          lat={coords.ldmlat}
          lng={coords.ldmlng}
          draggable={true}
          onDragEnd={this.onDragEnd} />
        <InfoWindow
          lat={coords.infolat}
          lng={coords.infolng}
          content={'Complejo Lomas del Mar'}
          onCloseClick={this.onCloseClick} />
      </Gmaps>
    )
  }
};
export default GMap;
