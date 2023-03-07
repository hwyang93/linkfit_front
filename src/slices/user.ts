import {createSlice} from '@reduxjs/toolkit';

// action : state 바꾸는 행위/동작
// dispatch: 그 액션을 실제로 행하는 함수
// reducer: 액션이 실행되면 state 바꾸는 로직

export interface memberState {
  seq: number;
  name: string;
  nickname: string;
  birth: string;
  email: string;
  accessToken: string;
  lon: number;
  lat: number;
  type: string;
}

const initialState: memberState = {
  seq: 0,
  name: '',
  nickname: '',
  birth: '',
  email: '',
  accessToken: '',
  lon: 0,
  lat: 0,
  type: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.seq = action.payload.seq;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.birth = action.payload.birth;
      state.accessToken = action.payload.accessToken;
      state.type = action.payload.type;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setLocation(state, action) {
      state.lon = action.payload.lon;
      state.lat = action.payload.lat;
    },
    setEmail(state, action) {
      state.email = action.payload.email;
    },
  },
  // extraReducers: builder => {},
});

export default userSlice;
