import axios from 'axios';
import React, { Component } from 'react';
import { View, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';

import List from './List';

class CommunityList extends Component {

  constructor() {
    super();
    this.state = {
      list: [],
      loading: true,
      error: null,
      overlay: false
    };
    this._loadData = this._loadData.bind(this);
  }

  componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
          this._loadData();
      });
  }

  _loadData() {
    axios.get('https://cosmari.e-lios.eu/API/Comuni/List')
         .then(res => this.setState({ list: res.data, loading: false, error: null }))
         .catch(error => this.setState({ list: [], error, loading: true }));
  }

  renderListView() {
    if (!this.state.loading && !this.state.error) {
      return <List list={this.state.list} />;
    }
    return (
      <View style={{ marginTop: 50, alignItems: 'center' }}>
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
  return {
    list: state.city.cityList,
    loading: state.city.loading
  };
};

export default connect(mapStateToProps)(CommunityList);
