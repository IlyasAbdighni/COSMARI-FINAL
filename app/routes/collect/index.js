import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Container, Content } from 'native-base';

import FormGroup from '../../components/FormGroup';

const {height, width} = Dimensions.get('window');

class Collect extends Component {
  render() {
    return (
      <Container>
        <View>
            <Image 
              source={require('../../assets/bg_7.jpg')} 
              style={{
                flex: 1,
                width,
                height,
                position: 'absolute',
                top: 0,
                left: 0,
              }} 
              blurRadius={20}
            />
          </View>
        <Content>
          <FormGroup />
        </Content>
      </Container>

    );
  }
}
export default Collect;
