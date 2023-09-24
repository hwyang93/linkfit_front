import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';

interface Position {
  latitude: number;
  longitude: number;
}

const useGeolocation = () => {
  const [position, setPosition] = useState<Position>();

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition({
          latitude,
          longitude,
        });
      },
      (error) => console.log(error.code, error.message),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  useEffect(() => {
    Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition({
          latitude,
          longitude,
        });
      },
      (error) => console.log(error.code, error.message),
      { enableHighAccuracy: true, distanceFilter: 10 },
    );
  });

  return { position, getCurrentPosition };
};

export default useGeolocation;
