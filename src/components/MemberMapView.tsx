import React from 'react';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import useLocation from '../hooks/useLocation';
import { baseline_place_44_px, icon_my_location } from '../assets/images';

import DCText from '../components/DCText';
import DCTouchable from './DCTouchable';

const Wrap = styled.View`
  flex: 1;
  margin-bottom: 45px;
`;

const MapContainer = styled.View`
  height: 100%;
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

const HelpBox = styled.View`
  width: 226px;
  height: 26px;
  border-radius: 13px;
  background-color: #eeeeee;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 20px;
`;

const HelpText = styled(DCText)`
  font-size: 12px;
  letter-spacing: -0.24px;
  color: #222222;
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

const MemberMapView: React.FC = () => {
  const currentLocation = useLocation({
    latitude: 37.5326,
    longitude: 127.024612,
  });
  const mapRef = React.useRef<MapView>(null);
  const [onMapReady, setonMapReady] = React.useState(false);

  React.useEffect(() => {
    if (mapRef.current && onMapReady) {
      const Camera = {
        center: currentLocation,
        pitch: 10,
        heading: 0,
        zoom: 14,
      };

      mapRef.current.animateCamera(Camera, {
        duration: 1000,
      });
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

  return (
    <Wrap>
      <HelpBox>
        <HelpText>출석하기 버튼을 눌러 출석을 완료해주세요!</HelpText>
      </HelpBox>
      <MapContainer>
        <Map
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialGeoState.mapRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={true}
          onMapReady={() => setonMapReady(true)}
        >
          <Marker image={baseline_place_44_px} coordinate={currentLocation} />
        </Map>
        <MyLocationButton onPress={animateToCurrentPosition}>
          <MyLocationImage />
        </MyLocationButton>
      </MapContainer>
    </Wrap>
  );
};

export default MemberMapView;
