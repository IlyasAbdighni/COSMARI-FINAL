import React, { Component } from 'react';
import { View, NetInfo, Platform, ToastAndroid, AppState } from 'react-native';
import Toast from 'react-native-root-toast';
import PushNotification from 'react-native-push-notification';

import I18n from './config/lang/i18.js';
import { PushNotificationCtr } from './components/PushNotificationCtr';

import Routes from './Routes';

console.disableYellowBox = true;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isConnected: true};
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    const connected = (isConnected) => this.setState({ isConnected });

    AppState.addEventListener('change', this.handleAppStateChange);

    NetInfo.isConnected.fetch().done((isConnected) => {
      connected(isConnected);
      NetInfo.isConnected.addEventListener('change', connected);
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'background') {
      console.log('app is in background');
    }
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
