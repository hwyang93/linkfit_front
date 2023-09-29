import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// action : state 바꾸는 행위/동작
// dispatch: 그 액션을 실제로 행하는 함수
// reducer: 액션이 실행되면 state 바꾸는 로직

export interface MemberState {
  seq: number;
  name: string;
  nickname: string;
  birth: string;
  email: string;
  accessToken: string;
  phone: string;
  lon: number;
  lat: number;
  type: string;
  isLoggedIn: boolean;
}

const initialState: MemberState = {
  seq: 0,
  name: '',
  nickname: '',
  birth: '',
  email: '',
  accessToken: '',
  phone: '',
  lon: 0,
  lat: 0,
  type: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<
        Pick<MemberState, 'seq' | 'email' | 'name' | 'nickname' | 'birth' | 'phone' | 'type'>
      >,
    ) {
      state.seq = action.payload.seq;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.birth = action.payload.birth;
      state.phone = action.payload.phone;
      state.type = action.payload.type;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setLocation(state, action: PayloadAction<{ lon: number; lat: number }>) {
      state.lon = action.payload.lon;
      state.lat = action.payload.lat;
    },
    setEmail(state, action: PayloadAction<{ email: string }>) {
      state.email = action.payload.email;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export default userSlice;
