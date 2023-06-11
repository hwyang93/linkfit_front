import {getKakaoLocation} from '@/api/kakao';
import {isAxiosError} from 'axios';
import {useState} from 'react';
import toast from './toast';

type Location = {
  region1depth: string;
  region2depth: string;
  region3depth: string;
};

const useKakaoLocation = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const [location, setLocation] = useState<Location | null>(null);

  const getLocation = async () => {
    try {
      const response = await getKakaoLocation(latitude, longitude);

      const regionInfo = response.data.documents.find((item: any) => {
        return item.region_type === 'B';
      });

      setLocation({
        region1depth: regionInfo.region_1depth_name,
        region2depth: regionInfo.region_2depth_name,
        region3depth: regionInfo.region_3depth_name,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({message: error.message});
      }
    }
  };

  return {location, getLocation};
};

export default useKakaoLocation;
