import {
  NEWS_OPENING_DONE,
  NEWS_OPENING,
  COMMUNITY_LIST_OPENING,
  COMMUNITY_LIST_DONE,
  SEARCH_OPENNING,
  SEARCH_OPENNING_DONE
 } from '../actions/types';

const initialState = {
  city: {},
  loading: true,
  new: [],
  vocabulary: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'app_opening_done':
      return { ...state, city: action.payload, loading: false, error: null };
    case NEWS_OPENING_DONE:
      return { ...state, news: action.payload, loading: false, error: null };
    case NEWS_OPENING:
      return { ...state, loading: true };
    case COMMUNITY_LIST_OPENING:
      return { ...state, loading: true };
    case COMMUNITY_LIST_DONE:
      return { ...state, loading: false, cityList: action.payload };
    case 'error':
      return { ...state, error: action.payload, loading: true };
    case SEARCH_OPENNING:
      return { ...state, loading: true };
    case SEARCH_OPENNING_DONE:
      return { ...state, loading: false, vocabulary: action.payload };
    default:
      return state;
  }
};
