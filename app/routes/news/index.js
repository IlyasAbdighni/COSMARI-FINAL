import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';

import { Spinner } from '../../components';
import { getChoosenCommunity } from '../../config';
import NewsList from './NewsList';

const {height, width} = Dimensions.get('window');

class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      city: getChoosenCommunity(),
      news: [],
      loading: true
    };
  }

  renderListView() {
    if (!this.props.loading && Array.isArray(this.props.news) && this.props.news.length > 0) {
      return <NewsList news={this.props.news} />;
    }
    return (
      <View style={{ marginTop: 50 }}>
        <Spinner color='green' size='large' />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
                backgroundColor: 'rgba(0,0,0,0)'
              }} 
              resizeMode='cover'
              blurRadius={5}
            />
          </View>
        {this.renderListView()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { news: state.city.news, loading: state.city.loading };
};

export default connect(mapStateToProps)(News);
