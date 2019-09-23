import React from 'react';
import styled from 'styled-components/native';

import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { colors } from '../utils/theme';
import { isSmallDeviceSize } from '../utils/styleUtils';
import useLocation from '../hooks/useLocation';

import DCText from '../components/DCText';

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
  const [mapGeoInfo, setMapGetInfo] = React.useState<GeoState>(initialGeoState);

  React.useEffect(() => {
    let region = {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5,
    };

    setMapGetInfo({
      mapRegion: region,
      lastLat: region.latitude,
      lastLong: region.longitude,
    });
  }, [currentLocation]);

  return (
    <Wrap>
      <Title>오늘의 세션장소</Title>
      <MapContainer>
        <Map
          provider={PROVIDER_GOOGLE}
          region={mapGeoInfo.mapRegion}
          showsUserLocation={true}
        />
      </MapContainer>
      <LocationText>서울시 강남구 논현로 22길 ㅇㅇㅇㅇㅇㅇ</LocationText>
    </Wrap>
  );
};

export default AdminMapView;
