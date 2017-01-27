import React, { Component } from 'react';
import { View, Dimensions, ListView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';

import { getCommunity } from '../../actions/AppActions';
import { Text } from '../../components';

const { width, height } = Dimensions.get('window');
const absolutePath = 'https://cosmari.e-lios.eu';

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      overlay: false
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(this.props.list);
  }

  renderRow(item) {
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
    } = item;
    return (
      <TouchableOpacity
          style={button}
          onPress={() => {
            this.setState({
              overlay: true
            });
            this.props.getCommunity(id, name);
          }}
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

  render() {
    return (
      <View style={{ flex: 1 }} >
        <ListView
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
        {
            this.state.overlay ? 
            <View style={styles.overlay} >
                <View style={{ flex: 1, paddingTop: 50, alignItems: 'center' }} >
                    <Spinner color='blue' size='large' />
                </View>
            </View> :
            <View />
        }
      </View>
      
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
  },
  overlay: {
      flex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: 0.7,
      backgroundColor: '#fff',
      width,
      height
  } 
});

export default connect(null, { getCommunity })(List);
