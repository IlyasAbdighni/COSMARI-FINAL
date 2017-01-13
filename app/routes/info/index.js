import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';

import DateAndLocation from './DateLoc';
import AboutCity from './AboutCity';
import I18n from '../../config/lang/i18';

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
      { key: '1', title: I18n.t('info.leftTab.tabTitle') },
      { key: '2', title: I18n.t('info.rightTab.tabTitle') },
    ],
    city: null
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      city: nextProps.city
    });
    console.log(this.state.city);
  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBarTop tabStyle={{ backgroundColor: '#4CAF50', opacity: 1 }} indicatorStyle={{ backgroundColor: 'red' }} {...props} />;
  };

  _renderScene = ({ route }) => {
    console.log(route.key);
    switch (route.key) {
    case '1':
      return <DateAndLocation city={this.state.city} style={[styles.page]} />;
    case '2':
      return <AboutCity city={this.state.city && this.state.city.Comune} style={[styles.page]} />;
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

const mapStateToProps = state => {
  return { city: state.city.city };
};

export default connect(mapStateToProps, {})(Info);
