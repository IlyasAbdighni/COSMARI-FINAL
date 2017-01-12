import React, { Component } from 'react';
import { View, NetInfo } from 'react-native';
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
    }
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
