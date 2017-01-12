import React, { Component } from 'react';
import { View, NetInfo, Platform, ToastAndroid } from 'react-native';
import Toast from 'react-native-root-toast';
import I18n from './config/lang/i18.js';

import Routes from './Routes';

console.disableYellowBox = true;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isConnected: true};
  }

  componentDidMount() {
    const connected = (isConnected) => this.setState({ isConnected });

    NetInfo.isConnected.fetch().done((isConnected) => {
      connected(isConnected);
      NetInfo.isConnected.addEventListener('change', connected);
    });
  }

  renderApp() {
    if (this.state.isConnected) {
      return false;
    } else if (Platform.OS === 'ios') {
      return (
        <Toast
           visible
           position={0}
           shadow
           animation
           hideOnPress={false}
        >
           {I18n.t('connectionError')}
         </Toast>
      );
    } else {
      return (
        ToastAndroid.showWithGravity(I18n.t('connectionError'), ToastAndroid.SHORT, ToastAndroid.CENTER)
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderApp()}
        <Routes />
      </View>
    );
  }
}


export default App;
