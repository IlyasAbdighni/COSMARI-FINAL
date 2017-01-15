import { ActionConst } from 'react-native-router-flux';

const initialState = {
  city: 'ilyas',
  scene: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.key) {
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene,
      };

    default:
      return state;
  }
}
