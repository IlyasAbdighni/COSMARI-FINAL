import React, { Component } from 'react';
import { View, InteractionManager } from 'react-native';
import { connect } from 'react-redux';

import List from './List';
import { Spinner } from '../../components/Spinner';

class CommunityList extends Component {

  constructor() {
    super();
    this.state = {
      list: [],
      loading: true
    };
  }

  componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
          this.setState({
            loading: this.props.loading,
            list: this.props.list
          });
      });
  }

  renderListView() {
    if (!this.state.loading) {
      return <List list={this.state.list} />;
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
