import React, { Component } from 'react';
import { View, Text, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import SearchBar from 'react-native-material-design-searchbar';

import List from './List';
import {Spinner} from '../../components';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      vocabulary: [],
      loading: true
    };
  }

  componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
          this.setState({
            loading: this.props.loading,
            vocabulary: this.props.vocabulary
          });
      });
  }

  renderListView() {
    console.log(this.state.loading, 'index');
    if (this.state.loading) {
       return (
          <View style={{ marginTop: 50 }}>
            <Spinner color='green' size='large' />
          </View>
        );
    }
    return (<List list={this.state.vocabulary} />);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#F5F5F5' }}>
          <SearchBar
            onSearchChange={() => console.log('On Focus')}
            height={30}
            onFocus={() => console.log('On Focus')}
            onBlur={() => console.log('On B lur')}
            placeholder={'Search...'}
            autoCorrect={false}
            padding={5}
            returnKeyType={'search'}
            inputStyle={{ backgroundColor: '#fff', borderRadius: 5 }}
          />
        </View>
        {this.renderListView()}
      </View>
      
    );
  }
}

const mapStateToProps = state => {
  return { vocabulary: state.city.vocabulary, loading: state.city.loading };
};

export default connect(mapStateToProps)(Search);
