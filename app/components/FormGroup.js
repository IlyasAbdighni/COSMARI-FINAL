import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Button, InputGroup, Input, Icon } from 'native-base';
import I18n from '../config/lang/i18';
import { Theme } from '../styles';

import {
  nameChanged,
  phoneChanged,
  emailChanged,
  addressChanged,
  descriptionChanged,
  sendEmailOnlyText
} from '../actions/FormActions';

class FormGroup extends Component {

  state = {
    position: null,
    name: {
      icon: (<Icon name='md-person' style={{color: Theme.tabBarBGColor}} />),
      message: '',
      valid: false
    },
    email: {
      icon: (<Icon name='md-at' style={{color: Theme.tabBarBGColor}} />),
      message: '',
      valid: false
    },
    phone: {
      icon: (<Icon name='md-phone-portrait' style={{color: Theme.tabBarBGColor}} />),
      message: '',
      valid: false
    },
    address: {
      icon: (<Icon name='md-pin' style={{color: Theme.tabBarBGColor}} />),
      message: '',
      valid: false
    },
    description: {
      message: '',
      valid: false
    },
    validForm: false
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
          (position) => {
          this.setState({position});
        },
        (error) => console.log(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
  }

  onNameChanged(text) {
    this.props.nameChanged(text);
    let { name } = this.props.form;
    name = name.replace(/\s/g, '');
    if (name.length < 3) {
      this.setState({
        name: {
          icon: (<Icon name='md-close-circle' style={{color: '#d9534f'}} />),
          message: I18n.t('form.name.validationMessage')
        }
      });
    } else {
      this.setState({
        name: {
          icon: (<Icon name='md-checkmark-circle' style={{color: '#5cb85c'}} />),
          message: '',
          valid: true
        }
      });
    }
    const { email, phone, address, description } = this.state;
    if (this.state.name.valid && phone.valid && email.valid && address.valid && description.valid) {
      this.setState({
        validForm: true
      });
    }
  }

  onPhoneChanged(text) {
    this.props.phoneChanged(text);
    let { phone } = this.props.form;
    phone = phone.replace(/\s/g, '');
    if (phone.length < 6) {
      this.setState({
        phone: {
          icon: (<Icon name='md-close-circle' style={{color: '#d9534f'}} />),
          message: I18n.t('form.phone.validationMessage')
        }
      });
    } else {
      this.setState({
        phone: {
          icon: (<Icon name='md-checkmark-circle' style={{color: '#5cb85c'}} />),
          message: '',
          valid: true
        }
      });
    }

    const { email, name, address, description } = this.state;
    if (this.state.phone.valid && name.valid && email.valid && address.valid && description.valid) {
      this.setState({
        validForm: true
      });
    }
  }
  onEmailChanged(text) {
    this.props.emailChanged(text);
    const { email } = this.props.form;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,4}$/i.test(email)) {
      this.setState({
        email: {
          icon: (<Icon name='md-close-circle' style={{color: '#d9534f'}} />),
          message: I18n.t('form.email.validationMessage')
        }
      });
    } else {
      this.setState({
        email: {
          icon: (<Icon name='md-checkmark-circle' style={{color: '#5cb85c'}} />),
          message: '',
          valid: true
        }
      });
    }

    const { phone, name, address, description } = this.state;
    if (this.state.email.valid && name.valid && phone.valid && address.valid && description.valid) {
      this.setState({
        validForm: true
      });
    }
  }
  onAddressChanged(text) {
    this.props.addressChanged(text);
    let { address } = this.props.form;
    address = address.replace(/\s/g, '');
    if (address.length < 3) {
      this.setState({
        address: {
          icon: (<Icon name='md-close-circle' style={{color: '#d9534f'}} />),
          message: I18n.t('form.address.validationMessage')
        }
      });
    } else {
      this.setState({
        address: {
          icon: (<Icon name='md-checkmark-circle' style={{color: '#5cb85c'}} />),
          message: '',
          valid: true
        }
      });
    }
    const { phone, name, email, description } = this.state;
    if (this.state.address.valid && name.valid && phone.valid && email.valid && description.valid) {
      this.setState({
        validForm: true
      });
    }
  }
  onDescriptionChanged(text) {
    this.props.descriptionChanged(text);
    let { description } = this.props.form;
    description = description.replace(/\s/g, '');
    if (description.length < 3) {
      this.setState({
        description: {
          message: I18n.t('form.description.validationMessage')
        }
      });
    } else {
      this.setState({
        description: {
          message: '',
          valid: true
        }
      });
    }
    const { phone, name, email, address } = this.state;
    if (this.state.description.valid && name.valid && phone.valid && email.valid && address.valid) {
      this.setState({
        validForm: true
      });
    }
  }

  onSendEmail() {
    const { name, phone, email, address, description } = this.props.form;
    const position = this.state.position;
    this.props.sendEmailOnlyText({ name, phone, email, address, description, position });
  }

  handlePhonePress() {
    Alert.alert(
      '3389876542',
      I18n.t('warning.makePhoneCall'),
      [
        {text: I18n.t('warning.cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: I18n.t('warning.yes'), onPress: () => Linking.openURL('tel:3389876542')},
      ]
    );
  }

  focusNextField = (nextField) => {
    console.log(nextField);
    this.refs[nextField].focus();
  };

  focusNextField = (text) => {
    this.refs[text]._textInput.focus();
  };

  render() {
    const {
      formContainer,
      callBtnSyle,
      topText,
    } = styles;

    const { name, email, phone, address, description } = this.state;

    return (
          <View style={formContainer}>
              <View>
                <Button
                    block
                    textStyle={{ color: '#fff', fontSize: 18, fontWeight: '400' }}
                    style={[callBtnSyle, {marginTop: 10}]}
                    onPress={this.handlePhonePress}
                > {I18n.t('form.callButton')} </Button>
                <Text
                  style={topText}
                >
                  {I18n.t('form.orText')}
                </Text>
              </View>
              <View>
                <InputGroup>
                    {name.icon}
                    <Input
                      ref='1'
                      placeholderTextColor='#9E9E9E'
                      autoCapitalize='none'
                      autoCorrect={false}
                      returnKeyType='next'
                      selectTextOnFocus
                      placeholder={I18n.t('form.name.placeholder')}
                      onChangeText={this.onNameChanged.bind(this)}
                      onSubmitEditing={() => this.focusNextField('2')}
                    />
                </InputGroup>
                <Text style={{ color: '#d9534f', paddingLeft: 20 }}>{name.message}</Text>
              </View>

              <View>
                <InputGroup>
                    {phone.icon}
                    <Input
                      ref='2'
                      placeholderTextColor='#9E9E9E'
                      autoCapitalize='none'
                      autoCorrect={false}
                      keyboardType='phone-pad'
                      returnKeyType='next'
                      selectTextOnFocus
                      placeholder={I18n.t('form.phone.placeholder')}
                      onChangeText={this.onPhoneChanged.bind(this)}
                      onSubmitEditing={() => this.focusNextField('3')}
                    />
                </InputGroup>
                <Text style={{ color: '#d9534f', paddingLeft: 20 }}>{phone.message}</Text>
              </View>

              <View>
                <InputGroup>
                    {email.icon}
                    <Input
                      ref='3'
                      placeholderTextColor='#9E9E9E'
                      autoCapitalize='none'
                      autoCorrect={false}
                      keyboardType='email-address'
                      returnKeyType='next'
                      selectTextOnFocus
                      placeholder={I18n.t('form.email.placeholder')}
                      onChangeText={this.onEmailChanged.bind(this)}
                      onSubmitEditing={() => this.focusNextField('4')}
                    />
                </InputGroup>
                <Text style={{ color: '#d9534f', paddingLeft: 20 }}>{email.message}</Text>
              </View>

              <View>
                <InputGroup>
                    {address.icon}
                    <Input
                      ref='4'
                      placeholderTextColor='#9E9E9E'
                      autoCapitalize='none'
                      autoCorrect={false}
                      returnKeyType='next'
                      selectTextOnFocus
                      placeholder={I18n.t('form.address.placeholder')}
                      onChangeText={this.onAddressChanged.bind(this)}
                      onSubmitEditing={() => this.focusNextField('5')}
                    />
                </InputGroup>
                <Text style={{ color: '#d9534f', paddingLeft: 20 }}>{address.message}</Text>
              </View>

              <View>
                <InputGroup>
                    <Input
                      ref='5'
                      placeholderTextColor='#9E9E9E'
                      autoCapitalize='none'
                      autoCorrect={false}
                      placeholder={I18n.t('form.description.placeholder')}
                      multiline
                      selectTextOnFocus
                      style={{ height: 80 }}
                      onChangeText={this.onDescriptionChanged.bind(this)}
                    />
                </InputGroup>
                <Text style={{ color: '#d9534f', paddingLeft: 20 }}>{description.message}</Text>
              </View>

              <View>
                <Button
                    disabled={!this.state.validForm}
                    block
                    success={this.state.validForm}
                    textStyle={{ color: '#fff', fontSize: 18, fontWeight: '400' }}
                    style={[callBtnSyle, {marginBottom: 20}]}
                    onPress={this.onSendEmail.bind(this)}
                > {I18n.t('form.sendEmailButton')} </Button>
              </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 10
  },
  callBtnSyle: {
    height: 60,
  },
  inputGroupStyle: {
    marginBottom: 10
  },
  topText: {
    fontSize: 12,
    marginTop: 15,
    color: '#9E9E9E',
    alignSelf: 'center',
    marginBottom: 15
  }
});

const mapStateToProps = state => {
  const { form } = state;
  return { form };
};

export default connect(mapStateToProps, {
  nameChanged, phoneChanged, emailChanged, addressChanged, descriptionChanged, sendEmailOnlyText })(FormGroup);
