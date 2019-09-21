import React, { Component } from 'react';
import { Text, View } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import styled from 'styled-components/native';

const MapContainer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 80px;
  align-items: center;
  height: 350px;
`;

const Map = styled(MapView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default class MyMapView extends Component {
  state = {
    mapRegion: null,
    lastLat: null,
    lastLong: null,
  };

  componentDidMount() {
    console.log(Geolocation);
    this.watchID = Geolocation.watchPosition(position => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      console.log('postion', position);
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      };
      this.onRegionChange(region, region.latitude, region.longitude);
    });
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set use the the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong,
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onMapPress(e) {
    console.log(e.nativeEvent.coordinate.longitude);
    let region = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5,
    };
    this.onRegionChange(region, region.latitude, region.longitude);
  }

  render() {
    return (
      <MapContainer>
        <Map
          provider={PROVIDER_GOOGLE}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}
          onPress={this.onMapPress.bind(this)}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.lastLat + 0.0005 || -36.82339,
              longitude: this.state.lastLong + 0.0005 || -73.03569,
            }}
          >
            <View>
              <Text style={{ color: '#000' }}>
                {this.state.lastLong} / {this.state.lastLat}
              </Text>
            </View>
          </MapView.Marker>
        </Map>
      </MapContainer>
    );
  }
}
