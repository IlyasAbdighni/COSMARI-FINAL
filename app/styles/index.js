import { Platform } from 'react-native';

const Theme = {
  mainBackgroundColor: '#F5F5F5',
  navBarBGColor: '#4CAF50',
  tabBarBGColor: '#5067FF',
  paddingBottom: Platform.OS === 'ios' ? 0 : 50,
  scenePaddingTop: Platform.OS === 'ios' ? 68 : 60,
  scenePaddingBottom: Platform.OS === 'ios' ? 65 : 10,
};

export default Theme;
