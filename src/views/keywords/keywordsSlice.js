import { createSlice } from '@reduxjs/toolkit';
import { SERVICE_URL } from 'config.js';
import axios from 'axios';

const initialState = {
  keywords: [],
  pageCount: 0,
  pageIndex: 0,
  loading: false,
};

const keywordsSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {
    receiveService(state, action) {
      const { keywords, pageCount, loading } = action.payload;
      state.keywords = keywords;
      state.pageCount = pageCount;
      state.loading = loading;
    },
    addKeyword(state, action) {
      const { newKeyword, loading } = action.payload;
      state.keywords = [newKeyword, ...state.keywords];
      state.loading = loading;
    },
    updateKeywordRed(state, action) {
      const { newKeyword, loading } = action.payload;

      // eslint-disable-next-line
      state.keywords = state.keywords.map((x) => (x._id === newKeyword._id ? newKeyword : x));
      state.loading = loading;
    },
    deleteKeywords(state, action) {
      const { ids, loading } = action.payload;
      console.log(ids);
      // eslint-disable-next-line
      state.keywords = state.keywords.filter((x) => !ids.includes(x._id));
      state.loading = loading;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});
const { setLoading, receiveService, addKeyword, updateKeywordRed, deleteKeywords } = keywordsSlice.actions;

export const getKeywords =
  ({ term, sortBy, pageSize, pageIndex }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    const response = await axios.get(`${SERVICE_URL}/keyword`, { params: { term, sortBy, pageSize, pageIndex } });
    const { keywords, pageCount } = response.data.data;
    dispatch(receiveService({ keywords, pageCount, loading: false, pageIndex }));
    /*  dispatch(setLoading(true));
    const response = await axios.get(`${SERVICE_URL}/keyword`, { params: { term, sortBy, pageSize, pageIndex } });
    const { items: keywords, pageCount } = response.data;
    dispatch(receiveService({ keywords, pageCount, loading: false, pageIndex })); */
  };

export const createKeyword = (keyword) => async (dispatch) => {
  const response = await axios
    .post(`${SERVICE_URL}/keyword`, keyword)
    .then(function (res) {
      const { data: newKeyword } = res.data;
      console.log(res.data);
      dispatch(addKeyword({ newKeyword, loading: false }));
    })
    .catch(function (error) {
      console.log(error);
    });

  /* // dispatch(receiveService({ keywords, pageCount, loading: false, pageIndex }));
   */
  /* dispatch(setLoading(true));
    const response = await axios.post(`${SERVICE_URL}/keyword`, { sortBy, pageSize, pageIndex, item });
    const { items: keywords, pageCount } = response.data;
    dispatch(receiveService({ keywords, pageCount, loading: false, pageIndex })); */
};

export const updateKeyword = (keyword) => async (dispatch) => {
  /* dispatch(setLoading(true));
    const response = await axios.put(`${SERVICE_URL}/apps/keywords`, { sortBy, pageSize, pageIndex, item });
    const { items: keywords, pageCount } = response.data;
    dispatch(receiveService({ keywords, pageCount, loading: false, pageIndex })); */
  const response = await axios
    // eslint-disable-next-line
    .put(`${SERVICE_URL}/keyword/${keyword._id}`, keyword)
    .then(function (res) {
      const { data: newKeyword } = res.data;
      dispatch(updateKeywordRed({ newKeyword, loading: false }));
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const deleteKeyword = (ids) => async (dispatch) => {
  console.log(ids);
  const response = await axios.delete(`${SERVICE_URL}/keyword`, { data: ids }).then(function (res) {
    dispatch(deleteKeywords({ ids, loading: false }));
  });
  // const resIds = items.map((x) => x._id))

  /* const response = await axios.delete(`${SERVICE_URL}/keyword`, { sortBy, pageSize, pageIndex, ids });
  const { items: keywords, pageCount } = response.data;
  dispatch(receiveService({ keywords, pageCount, loading: false, pageIndex })); */
};

const keywordsReducer = keywordsSlice.reducer;

export default keywordsReducer;
