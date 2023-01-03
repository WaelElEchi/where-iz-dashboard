import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO, SERVICE_URL } from 'config.js';
import axios from 'axios';

const initialState = {
  isLogin: false,
  currentUser: IS_DEMO ? DEFAULT_USER : {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLogin = true;
    },
    logout(state, action) {
      localStorage.removeItem('token');
      state.currentUser = {};
      state.isLogin = false;
    },
  },
});

export const { setCurrentUser, logout } = authSlice.actions;

export const getUser = () => async (dispatch) => {
  const response = await axios
    .get(`${SERVICE_URL}/auth/me`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then(function (res) {
      dispatch(setCurrentUser(res.data));
    })
    .catch(function (error) {
      dispatch(logout());
      console.log(error);
    });

  return response;
  /*  dispatch(setLoading(true));
    const response = await axios.get(`${SERVICE_URL}/keyword`, { params: { term, sortBy, pageSize, pageIndex } });
    const { items: keywords, pageCount } = response.data;
    dispatch(receiveService({ keywords, pageCount, loading: false, pageIndex })); */
};

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    const response = await axios
      .post(`${SERVICE_URL}/auth/login`, { email, password })
      .then(function (res) {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        dispatch(setCurrentUser(res.data));
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
        return null;
      });

    return response;
    /*  dispatch(setLoading(true));
    const response = await axios.get(`${SERVICE_URL}/keyword`, { params: { term, sortBy, pageSize, pageIndex } });
    const { items: keywords, pageCount } = response.data;
    dispatch(receiveService({ keywords, pageCount, loading: false, pageIndex })); */
  };

const authReducer = authSlice.reducer;

export default authReducer;
