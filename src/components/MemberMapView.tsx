import React from 'react';
import styled from 'styled-components/native';
import Geolocation from '@react-native-community/geolocation';

import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import DCText from '../components/DCText';

const Wrap = styled.View`
  flex: 1;
  margin-bottom: 40px;
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

const MemberMapView: React.FC = () => {
  const [mapGeoInfo, setMapGetInfo] = React.useState<GeoState>(initialGeoState);

  React.useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      };

      setMapGetInfo({
        mapRegion: region,
        lastLat: region.latitude,
        lastLong: region.longitude,
      });
    });
  }, []);

  return (
    <Wrap>
      <HelpBox>
        <HelpText>현위치를 눌러 출석하기를 완료해주세요!</HelpText>
      </HelpBox>
      <MapContainer>
        <Map
          provider={PROVIDER_GOOGLE}
          region={mapGeoInfo.mapRegion}
          showsUserLocation={true}
        />
      </MapContainer>
    </Wrap>
  );
};

export default MemberMapView;
