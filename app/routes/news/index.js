import axios from 'axios';
import React, { Component } from 'react';
import { View, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';

import { getChoosenCommunity, realm } from '../../config';
import NewsList from './NewsList';

let city;
realm.addListener('change', () => {
  city = getChoosenCommunity();
});

class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      news: [],
      loading: true,
      error: false,
      message: ''
    };
    this._loadData.bind(this);
  }

  componentDidMount() {
    city = getChoosenCommunity();
      InteractionManager.runAfterInteractions(() => {
          if (typeof this.props.city !== 'undefined') {
            this._loadData();
          }
      });
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps === this.props) {
      return true;
    }
    return false;
  }

  _loadData() {
    const api = axios.create();
    api.defaults.timeout = 2500;
    api.get('https://cosmari.e-lios.eu/API/News/List?id=' + this.props.city.id)
         .then(res => this.setState({ news: res.data, loading: false }))
         .catch(error => this.setState({ error: true, loading: true, message: error }));
  }

  renderListView() {
    if (!this.state.loading) {
      return <NewsList news={this.state.news} />;
    }
    return (
      <View style={{ marginTop: 50, alignItems: 'center' }}>
        <Spinner color='green' size='large' />
      </View>
    );
  }

  render() {
    console.log(this.state);
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
