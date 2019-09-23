import React from 'react';
import Geolocation from '@react-native-community/geolocation';

interface LatLon {
  latitude: number;
  longitude: number;
}

const useLocation = (initialLocation: LatLon) => {
  const [currentLocation, setCurrentLocation] = React.useState(initialLocation);

  React.useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  return currentLocation;
};

export default useLocation;
