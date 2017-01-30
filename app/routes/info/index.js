import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DateAndLocation from './DateLoc';
import AboutCity from './AboutCity';
import {Theme} from '../../styles';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Info extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', icon: 'update' },
      { key: '2', icon: 'view-list'},
    ],
    city: this.props.city && null,
    error: this.props.error
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      city: nextProps.city
    });
  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderIcon = (props) => {
    return (
      <Icon
        name={props.route.icon}
        size={24}
        color='white'
      />
    );
  };

  _renderHeader = (props) => {
    return (<TabBarTop 
              renderIcon={this._renderIcon} 
              indicatorStyle={{ backgroundColor: Theme.tabBarBGColor }} 
              style={{ backgroundColor: Theme.navBarBGColor }}
              {...props} 
            />);
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <DateAndLocation style={[styles.page]} />;
    case '2':
      return <AboutCity style={[styles.page]} />;
    default:
      return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
        initialLayout={initialLayout}
      />
    );
  }
}

export default Info;
