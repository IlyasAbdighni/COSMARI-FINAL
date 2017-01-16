import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { getCommunity } from '../../actions';

const absolutePath = 'https://cosmari.e-lios.eu';

class ListItem extends Component {

  render() {
    const {
      itemContainer,
      imageContainer,
      textContainer,
      button
    } = styles;

    const {
      IdComune: id,
      Nome: name,
      ImagePath: imagePath
    } = this.props.item;

    return (
      <TouchableOpacity
          style={button}
          onPress={() => this.props.getCommunity(id, name)}
      >
        <View style={itemContainer}>
          <View style={imageContainer}>
            <Image
              style={{ height: 60, width: 60 }}
              source={{ uri: absolutePath + imagePath }}
            />
          </View>
          <View style={textContainer}>
            <Text>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10
  },
  itemContainer: {
    flexDirection: 'row',

  },
  imageContainer: {
    flex: 3,
    justifyContent: 'center'
  },
  textContainer: {
    justifyContent: 'center',
    flex: 7
  }
});

export default connect(null, { getCommunity })(ListItem);
