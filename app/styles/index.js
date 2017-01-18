import { Platform } from 'react-native';

const Theme = {
  navBarBGColor: '#4CAF50',
  tabBarBGColor: '#5067FF',
  paddingBottom: Platform.OS === 'ios' ? 0 : 50,
};

export default Theme;
