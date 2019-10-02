import React from 'react';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { colors } from '../utils/theme';
import { isSmallDeviceSize } from '../utils/styleUtils';
import useLocation from '../hooks/useLocation';
import { getAddress } from '../modules/session';

import DCTouchable from '../components/DCTouchable';
import DCText from '../components/DCText';
import { baseline_place_44_px, icon_my_location } from '../assets/images';
import { UserContext } from '../contexts';

interface LatLng {
  latitude: number;
  longitude: number;
}

const HORIZONTAL_PADDING = isSmallDeviceSize() ? 16 : 38;
const MAP_BOTTOM_MARGIN = isSmallDeviceSize() ? 190 : 220;

const Wrap = styled.View`
  margin: 10px ${HORIZONTAL_PADDING}px ${MAP_BOTTOM_MARGIN}px;
  flex: 1;
`;

const MapContainer = styled.View`
  height: 100%;
  margin-bottom: 25px;
`;

const MyLocationButton = styled(DCTouchable).attrs({
  hitSlop: { top: 10, right: 10, bottom: 10, left: 10 },
})`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const MyLocationImage = styled.Image.attrs({ source: icon_my_location })`
  width: 40px;
  height: 40px;
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
  const [onMapReady, setonMapReady] = React.useState(false);
  const mapRef = React.useRef<MapView>(null);
  const pinRef = React.useRef<Marker>(null);

  React.useEffect(() => {
    if (
      currentLocation.latitude !== initialGeoState.lastLat ||
      currentLocation.longitude !== initialGeoState.lastLong
    ) {
      setPinCoordinate(currentLocation);
    }
    if (mapRef.current && onMapReady) {
      const Camera = {
        center: currentLocation,
        pitch: 2,
        heading: 0,
        zoom: 14,
      };

      mapRef.current.animateCamera(Camera, { duration: 1000 });
    }
  }, [currentLocation, onMapReady]);

  const animateToCurrentPosition = () => {
    if (mapRef.current) {
      const Camera = {
        center: currentLocation,
        pitch: 2,
        heading: 0,
        zoom: 14,
      };

      mapRef.current.animateCamera(Camera, { duration: 1000 });
    }
  };

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

  return (
    <Wrap>
      <Title>오늘의 세션장소</Title>
      <MapContainer>
        <Map
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialGeoState.mapRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          onPress={onPressMap}
          showsCompass={true}
          onMapReady={() => setonMapReady(true)}
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
        <MyLocationButton onPress={animateToCurrentPosition}>
          <MyLocationImage />
        </MyLocationButton>
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
