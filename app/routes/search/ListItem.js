import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

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
      NomeVocabolario: name,
      ImmagineCassonetto: imagePath,
      NomeCassonetto: secondName,
    } = this.props.item;

    return (
      <TouchableOpacity
          style={button}
          onPress={() => console.log('vocabulary pressed')}
      >
        <View style={itemContainer}>
          <View style={textContainer}>
            <Text style={{ fontSize: 17, paddingVertical: 5 }} >{name}</Text>
            <Text>{secondName}</Text>
          </View>
          <View style={imageContainer}>
            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'contain' }}
              source={{ uri: absolutePath + imagePath }}
              resizeMode='cover'
            />
          </View>
        </View>
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderBottomColor: '#8E8E8E',
    borderBottomWidth: StyleSheet.hairlineWidth, 
  },
  itemContainer: {
    flexDirection: 'row',

  },
  imageContainer: {
    flex: 2,
    justifyContent: 'flex-end'
  },
  textContainer: {
    justifyContent: 'center',
    flex: 8
  }
});

export default connect(null)(ListItem);
