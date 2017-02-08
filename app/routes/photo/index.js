import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Alert, Linking, TouchableOpacity, Image,
  PixelRatio,
  Platform,
  LayoutAnimation,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Button, InputGroup, Input, Icon } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import I18n from '../../config/lang/i18';
import { Theme } from '../../styles';

import {
  nameChanged,
  phoneChanged,
  emailChanged,
  addressChanged,
  descriptionChanged,
  sendEmailWithPhoto
} from '../../actions/FormActions';

const {height, width} = Dimensions.get('window');

class Photo extends Component {

  state = {
    avatarSource: null,
    hasImage: false,
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
  };

  componentWillUpdate() {
    LayoutAnimation.linear();
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
    if (this.state.name.valid && phone.valid && email.valid && address.valid && description.valid && this.state.hasImage) {
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
    if (this.state.phone.valid && name.valid && email.valid && address.valid && description.valid && this.state.hasImage) {
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
    if (this.state.email.valid && name.valid && phone.valid && address.valid && description.valid && this.state.hasImage) {
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
    if (this.state.address.valid && name.valid && phone.valid && email.valid && description.valid && this.state.hasImage) {
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
    if (this.state.description.valid && this.state.hasImage && name.valid && phone.valid && email.valid && address.valid) {
      this.setState({
        validForm: true
      });
    }
  }

  onSendEmail() {
    const { name, phone, email, address, description } = this.props.form;
    const position = this.state.avatarSource || null;
    this.props.sendEmailWithPhoto({ name, phone, email, address, description, position });
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

  renderFormGroup() {
    const {
      formContainer,
      callBtnSyle,
      topText,
    } = styles;

    const { name, email, phone, address, description } = this.state;

    const focusNextField = (text) => {
      this.refs[text]._textInput.focus();
    };

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
              {this.renderSelectPic()}
              <View>
                <InputGroup>
                    {name.icon}
                    <Input
                      ref='1'
                      placeholderTextColor='#9E9E9E'
                      autoCapitalize='none'
                      autoCorrect={false}
                      returnKeyType="next"
                      selectTextOnFocus
                      placeholder={I18n.t('form.name.placeholder')}
                      onChangeText={this.onNameChanged.bind(this)}
                      onSubmitEditing={() => focusNextField('2')}
                      enablesReturnKeyAutomatically
                      blurOnSubmit
                      style={{ padding: 0 }}
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
                      returnKeyType="next"
                      keyboardType='phone-pad'
                      selectTextOnFocus
                      placeholder={I18n.t('form.phone.placeholder')}
                      onChangeText={this.onPhoneChanged.bind(this)}
                      onSubmitEditing={() => focusNextField('3')}
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
                      returnKeyType="next"
                      selectTextOnFocus
                      keyboardType='email-address'
                      placeholder={I18n.t('form.email.placeholder')}
                      onChangeText={this.onEmailChanged.bind(this)}
                      onSubmitEditing={() => focusNextField('4')}
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
                      returnKeyType="next"
                      autoCorrect={false}
                      selectTextOnFocus
                      placeholder={I18n.t('form.address.placeholder')}
                      onChangeText={this.onAddressChanged.bind(this)}
                      onSubmitEditing={() => focusNextField('5')}
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
                      returnKeyType="done"
                      style={{ height: 80 }}
                      onChangeText={this.onDescriptionChanged.bind(this)}
                    />
                </InputGroup>
                <Text style={{ color: '#d9534f', paddingLeft: 20 }}>{description.message}</Text>
              </View>
          </View>
    );
  }

  selectPhotoTapped() {
    const options = {
      title: I18n.t('photo.title'),
      cancelButtonTitle: I18n.t('cancel'),
      takePhotoButtonTitle: I18n.t('photo.takePhoto'),
      chooseFromLibraryButtonTitle: I18n.t('photo.chooseFromLibrary'),
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      configOptions: {
        skipBackup: true
      },
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source;
        const { name, phone, email, address, description } = this.state;
        if (name.valid && phone.valid && address.valid && email.valid && description.valid) {
          this.setState({
            validForm: true
          });
        }

        try {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              source = Object.assign({latitude, longitude}, source);
              this.setState({
                avatarSource: source,
                hasImage: true
              });
            },
            (error) => console.log('Could not get the user location!', error),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          );
        } finally {
          if (Platform.OS === 'android') {
            console.log(response.uri);
            source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
            this.setState({ avatarSource: source, hasImage: true });
          } else {
            source = {uri: response.uri.replace('file://', ''), isStatic: true};
          }
        }
      }
    });
  }

  deleteThePhoto() {
    this.setState({
      avatarSource: null
    });
  }

  renderSelectPic() {
    console.log(this.state.avatarSource);
    return (
      <View style={styles.container}>
        <View>
          {
            this.state.avatarSource === null ? 
              <TouchableOpacity 
                  onPress={this.selectPhotoTapped.bind(this)}
                  style={{ backgroundColor: Theme.mainBackgroundColor, borderRadius: 50, width: 100, height: 100, borderWidth: 1, borderColor: Theme.tabBarBGColor, justifyContent: 'center', alignItems: 'center' }} 
              >
                  <Icon name='md-camera' style={{color: Theme.tabBarBGColor, fontSize: 38 }} />
              </TouchableOpacity> :
              <View />
          }
           
        </View>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <View /> :
            <Image resizeMode="cover" style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>
          { this.state.avatarSource === null ? <View /> :
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} >
              <View>
                <Text style={{ color: Theme.tabBarBGColor }} onPress={this.selectPhotoTapped.bind(this)} >{I18n.t('form.changePic')}</Text>                            
              </View>
              <View>
                <Text style={{ color: Theme.tabBarBGColor }} onPress={this.deleteThePhoto.bind(this)}>{I18n.t('form.deletePic')}</Text>              
              </View>
            </View>
            
          }
      </View>
    );
  }

  render() {
    return (
      <Container style={{ position: 'relative' }} >
        <Content>
          {this.renderFormGroup()}
          <View style={styles.formContainer}>
            <Button
                disabled={!this.state.validForm}
                block
                success={this.state.validForm}
                textStyle={{ color: '#fff', fontSize: 18, fontWeight: '400' }}
                style={[styles.callBtnSyle, {marginBottom: 30}]}
                onPress={this.onSendEmail.bind(this)}
            > {I18n.t('form.sendEmailButton')} </Button>
          </View>
        </Content>
      </Container>
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  avatarContainer: {
    borderColor: '#5067FF',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 300,
    height: 300,
    resizeMode: 'cover'
  },
  addButtonStyle: {
    marginBottom: 10,
    marginTop: 10
  },
  backgroundImage: {
    flex: 1,
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
  }
});

const mapStateToProps = state => {
  const { form } = state;
  return { form };
};

export default connect(mapStateToProps, {
  nameChanged, phoneChanged, emailChanged, addressChanged, descriptionChanged, sendEmailWithPhoto
 })(Photo);
