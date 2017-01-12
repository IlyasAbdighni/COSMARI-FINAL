export default (state = {}, action) => {
  switch (action.type) {
    case 'app_opening_done':
      return { ...state, cityName: action.payload };
    default:
      return state;
  }
};
