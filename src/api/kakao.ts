import axios from 'axios';
import Config from 'react-native-config';

const kakao = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local',
  headers: {
    Authorization: `KakaoAK ${Config.KAKAO_API_REST_KEY}`,
  },
});

// TODO: Response 타입 지정
export const getKakaoCoordinate = (address: string) => {
  return kakao.get(`/search/address.json?analyze_type=exact&query=${address}`);
};

export const getKakaoLocation = (latitude: number, longitude: number) => {
  return kakao.get(`/geo/coord2regioncode.json?input_coord=WGS84&x=${longitude}&y=${latitude}`);
};
