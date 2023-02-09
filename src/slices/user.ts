import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// action : state 바꾸는 행위/동작
// dispatch: 그 액션을 실제로 행하는 함수
// reducer: 액션이 실행되면 state 바꾸는 로직

const initialState = {
  seq: '',
  name: '',
  email: '',
  accessToken: '',
  lon: '',
  lat: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.seq = action.payload.seq;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
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
  extraReducers: builder => {},
});

export default userSlice;
