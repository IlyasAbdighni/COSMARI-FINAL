import {
  NEWS_OPENING_DONE,
  NEWS_OPENING,
  COMMUNITY_LIST_OPENING,
  COMMUNITY_LIST_DONE
 } from '../actions/types';

const initialState = {
  city: {},
  loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'app_opening_done':
      return { ...state, city: action.payload };
    case NEWS_OPENING_DONE:
      return { ...state, news: action.payload, loading: false };
    case NEWS_OPENING:
      return { ...state, loading: true };
    case COMMUNITY_LIST_OPENING:
      return { ...state, loading: true };
    case COMMUNITY_LIST_DONE:
      return { ...state, loading: false, cityList: action.payload };
    default:
      return state;
  }
};
