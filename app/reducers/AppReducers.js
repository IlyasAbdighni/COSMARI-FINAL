const initialState = {
  city: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'app_opening_done':
      return { ...state, city: action.payload };
    default:
      return state;
  }
};
