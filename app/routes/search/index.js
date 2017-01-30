import axios from 'axios';
import React, { Component } from 'react';
import { View, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';

import List from './List';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      vocabulary: [],
      loading: true,
      error: null
    };
    this._loadData.bind(this);
  }

  componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
          this._loadData();
      });
  }

  _loadData() {
    axios.get('https://cosmari.e-lios.eu/API/Vocaboli/List')
         .then(res => {
           this.setState({
            loading: false,
            vocabulary: res.data
          });
         })
         .catch(error => {
           this.setState({
              loading: true,
              vocabulary: [],
              error
            });
         });
  }

  renderListView() {
    if (this.state.loading) {
       return (
          <View style={{ marginTop: 50, alignItems: 'center' }}>
            <Spinner color='#4CAF50' size='large' />
          </View>
        );
    }
    return (<List list={this.state.vocabulary} />);
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
  return { vocabulary: state.city.vocabulary, loading: state.city.loading };
};

export default connect(mapStateToProps)(Search);
