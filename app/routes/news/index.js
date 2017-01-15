import axios from 'axios';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';

import { newsTabPressed } from '../../actions/AppActions';
import { NEWS_OPENING_DONE, NEWS_OPENING } from '../../actions/types';
import NewsList from './NewsList';

class News extends Component {
  componentWillMount() {
    this.props.dispatch({ type: NEWS_OPENING });
    axios.get('https://cosmari.e-lios.eu/API/News/List?id=81')
         .then(res => this.props.dispatch({ type: NEWS_OPENING_DONE, payload: res.data }))
         .catch(error => console.log(error));
  }

  renderListView() {
    if (!this.props.loading) {
      return <NewsList news={this.props.news} />;
    }
    return (
      <View>
        <Spinner color='green' size='large' />
      </View>
    );
  }

  render() {
    console.log(this.props);
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

export default connect(mapStateToProps, { newsTabPressed })(News);
