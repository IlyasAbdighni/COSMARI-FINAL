import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Container, Content } from 'native-base';

import FormGroup from '../../components/FormGroup';

class Collect extends Component {
  render() {
    return (
      <Container>
        <Content>
          <FormGroup />
        </Content>
      </Container>

    );
  }
}
export default Collect;
