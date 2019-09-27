import React from 'react';
import styled from 'styled-components/native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import DCText from '../components/DCText';
import useLocation from '../hooks/useLocation';
import { baseline_place_44_px } from '../assets/images';

const Wrap = styled.View`
  flex: 1;
  margin-bottom: 45px;
`;

const MapContainer = styled.View`
  height: 100%;
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
  const [marginBottom, setMarginBottom] = React.useState(1);

  React.useEffect(() => {
    if (mapRef.current) {
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
  }, [currentLocation]);

  const onMapReady = () => {
    // 안드로이드에서 showsMyLocationButton 보이도록 하는 hack code
    setMarginBottom(0);
  };

  return (
    <Wrap>
      <HelpBox>
        <HelpText>현위치를 눌러 출석하기를 완료해주세요!</HelpText>
      </HelpBox>
      <MapContainer>
        <Map
          style={{ marginBottom }}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialGeoState.mapRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          onMapReady={onMapReady}
        >
          <Marker image={baseline_place_44_px} coordinate={currentLocation} />
        </Map>
      </MapContainer>
    </Wrap>
  );
};

export default MemberMapView;
