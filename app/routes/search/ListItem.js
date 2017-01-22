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
            <Text>{name}</Text>
            <Text>{secondName}</Text>
          </View>
          <View style={imageContainer}>
            <Image
              style={{ height: 60, width: 60 }}
              source={{ uri: absolutePath + imagePath }}
              resizeMode='contain'
            />
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
    flex: 2,
    justifyContent: 'flex-end'
  },
  textContainer: {
    justifyContent: 'center',
    flex: 8
  }
});

export default connect(null)(ListItem);
