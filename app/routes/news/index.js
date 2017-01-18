import axios from 'axios';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';

import { getChoosenCommunity } from '../../config';
import { NEWS_OPENING_DONE, NEWS_OPENING } from '../../actions/types';
import NewsList from './NewsList';

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
      <View>
        <Spinner color='green' size='large' />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderListView()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { news: state.city.news, loading: state.city.loading };
};

export default connect(mapStateToProps)(News);
