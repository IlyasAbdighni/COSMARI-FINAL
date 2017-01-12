import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Info extends Component {

  render() {
    console.log(this.props);
    return (
      <View>
        <Text>Info</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, {})(Info);
