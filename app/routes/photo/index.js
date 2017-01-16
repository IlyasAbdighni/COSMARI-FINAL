import React, { Component } from 'react';
import { View, Text, NativeModules } from 'react-native';

const Mailer = NativeModules.RNMail;

class Photo extends Component {
  render() {
    return (
      <View>
        <Text>Photo</Text>
      </View>
    );
  }
}
export default Photo;
