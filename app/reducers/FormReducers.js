import {
  NAME_CHANGED,
  PHONE_CHANGED,
  EMAIL_CHANGED,
  ADDRESS_CHANGED,
  DESCRIPTION_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  address: '',
  description: '',
  image: null,
  error: {
    name: null,
    phone: null,
    email: null,
    address: null,
    description: null
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state, name: action.payload };
    case PHONE_CHANGED:
      return { ...state, phone: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case ADDRESS_CHANGED:
      return { ...state, address: action.payload };
    case DESCRIPTION_CHANGED:
      return { ...state, description: action.payload };
    default:
      return state;
  }
};
