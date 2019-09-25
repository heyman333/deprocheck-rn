import React from 'react';
import styled from 'styled-components/native';

import MapView, { PROVIDER_GOOGLE, Region, Marker } from 'react-native-maps';
import { colors } from '../utils/theme';
import { isSmallDeviceSize } from '../utils/styleUtils';
import useLocation from '../hooks/useLocation';
import { getAddress } from '../modules/session';

import DCText from '../components/DCText';
import { baseline_place_44_px } from '../assets/images';
import { UserContext } from '../contexts';

interface LatLng {
  latitude: number;
  longitude: number;
}

// interface Point {
//   x: number;
//   y: number;
// }

const HORIZONTAL_PADDING = isSmallDeviceSize() ? 16 : 38;

const Wrap = styled.View`
  height: ${isSmallDeviceSize() ? '35%' : '40%'};
  margin: 0 ${HORIZONTAL_PADDING}px;
`;

const MapContainer = styled.View`
  height: 100%;
  margin-bottom: 25px;
`;

const Title = styled(DCText)`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.white};
  margin-bottom: 10px;
`;

const LocationText = styled(DCText)`
  font-size: 14px;
  color: ${colors.gray};
  text-align: center;
`;

const Map = styled(MapView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

interface GeoState {
  mapRegion: Region;
  lastLat: number;
  lastLong: number;
}

const initialGeoState = {
  mapRegion: {
    latitude: 37.5326,
    longitude: 127.024612,
    latitudeDelta: 0.00922 * 1.5,
    longitudeDelta: 0.00421 * 1.5,
  },
  lastLat: 37.5326,
  lastLong: 127.024612,
};

const AdminMapView: React.FC = () => {
  const currentLocation = useLocation({
    latitude: 37.5326,
    longitude: 127.024612,
  });

  const { dispatch, state } = React.useContext(UserContext);
  const [pinCoordinate, setPinCoordinate] = React.useState<LatLng | null>(null);
  const mapRef = React.useRef<MapView>(null);
  const pinRef = React.useRef<Marker>(null);

  React.useEffect(() => {
    if (mapRef.current) {
      const Camera = {
        center: currentLocation,
        pitch: 10,
        heading: 0,
        zoom: 8,
      };

      mapRef.current.animateCamera(Camera, { duration: 1000 });
    }

    if (
      currentLocation.latitude !== initialGeoState.lastLat ||
      currentLocation.longitude !== initialGeoState.lastLong
    ) {
      setPinCoordinate(currentLocation);
    }
  }, [currentLocation]);

  React.useEffect(() => {
    const getAddressByLocation = async () => {
      if (!pinCoordinate) {
        return;
      }

      try {
        const formattedAddress = await getAddress(
          pinCoordinate.latitude,
          pinCoordinate.longitude
        );

        console.log('formattedAddress', formattedAddress);

        dispatch({
          type: 'SET_USER_INFO',
          payload: {
            userInfo: {
              sessionInfo: {
                sessionLocation: pinCoordinate,
                sessionAddress: formattedAddress,
              },
            },
          },
        });
      } catch (error) {
        console.log('error', error);
      }
    };

    if (pinRef.current && pinCoordinate) {
      pinRef.current.showCallout();
    }

    getAddressByLocation();
  }, [pinCoordinate, dispatch]);

  const onPressMap = (e: any) => {
    const coordination: LatLng = e.nativeEvent.coordinate;
    setPinCoordinate(coordination);
  };

  console.log('state', state);

  return (
    <Wrap>
      <Title>오늘의 세션장소</Title>
      <MapContainer>
        <Map
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialGeoState.mapRegion}
          showsUserLocation={true}
          onPress={onPressMap}
        >
          {pinCoordinate && (
            <Marker
              ref={pinRef}
              title="세션장소"
              image={baseline_place_44_px}
              coordinate={pinCoordinate}
            />
          )}
        </Map>
      </MapContainer>
      {state.userInfo.sessionInfo && (
        <LocationText numberOfLines={1}>
          {state.userInfo.sessionInfo.sessionAddress}
        </LocationText>
      )}
    </Wrap>
  );
};

export default AdminMapView;
