import React, { Component } from 'react';
import { Alert, Linking } from 'react-native';
import ParsedText from 'react-native-parsed-text';

class MyParsedText extends Component {
  static displayName = 'Example';

  handleUrlPress(url) {
    Linking.openURL(url);
  }

  handlePhonePress(phone) {
    Alert.alert(
      phone,
      'Are you sure to call this number?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => Linking.openURL('tel:' + phone)},
      ]
    );
  }

  renderText(matchingString, matches) {
    const pattern = /(<([^>]+)>)/ig;
    const match = matchingString.match(pattern);
    return `^^${match[1]}^^`;
  }

  render() {
    return (
        <ParsedText
          parse={
            [
              { type: 'url', style: styles.textColor, onPress: this.handleUrlPress },
              { type: 'phone', style: styles.textColor, onPress: this.handlePhonePress },
              { pattern: /(<([^>]+)>)/ig, onPress: this.handleNamePress, renderText: this.renderText },
            ]
          }
        >
          {this.props.text}
        </ParsedText>
    );
  }
}

const styles = {
  textColor: {
    color: '#5067FF'
  }
};
export { MyParsedText };
