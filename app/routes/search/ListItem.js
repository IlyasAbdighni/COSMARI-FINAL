import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

const absolutePath = 'https://cosmari.e-lios.eu';

class ListItem extends Component {

  constructor(props) {
    super(props);
    this._renderImage = this._renderImage.bind(this);
    this.state = {
      width: 0,
      height: 0,
      marginLeft: 0
    };
  }

  _renderImage(e) {
    const width = e.nativeEvent.source.width;
    const height = e.nativeEvent.source.height;
    const aspectRatio = width / height;
    if (width > 75) {
      this.setState({
        width: 80,
        height: 80 / aspectRatio,
      });
    } else {
      this.setState({
        width,
        height,
        marginLeft: 25
      });
    }
  }

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
            <Text style={{ fontSize: 17, paddingVertical: 5, textAlign: 'justify' }} >{name}</Text>
            <Text>{secondName}</Text>
          </View>
          <View style={[imageContainer]}>
            <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center' }} >
              {Platform.OS === 'ios' ? 
                <Image
                  source={{ uri: absolutePath + imagePath, height: 80, width: 80 }}
                  resizeMode='contain'
                /> :
                <Image
                  onLoad={this._renderImage}
                  source={{ uri: absolutePath + imagePath, height: this.state.height, width: this.state.width }}
                  resizeMode='cover'
                />
              } 
            </View>
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
    flex: 1,
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'flex-end'
  },
  textContainer: {
    justifyContent: 'center',
    flex: 8
  }
});

export default connect(null)(ListItem);
