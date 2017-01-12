import React from 'react';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import DateAndLocation from './DateLoc';
import AboutCity from './AboutCity';
import I18n from '../../config/lang/i18';

const Info = (props) => {
  console.log(props);
  return (
      <ScrollableTabView
        tabBarBackgroundColor='#4CAF50'
        tabBarActiveTextColor='#fff'
        tabBarInactiveTextColor='#000'
        tabBarTextStyle={{ fontSize: 15 }}
        tabBarUnderlineStyle={{ backgroundColor: '#5067FF' }}
        style={{ borderWidth: 0 }}
      >
         <DateAndLocation tabLabel={I18n.t('info.leftTab.tabTitle')} />
         <AboutCity tabLabel={I18n.t('info.rightTab.tabTitle')} />
      </ScrollableTabView>
  );
};

const mapStateToProps = state => {
  return { city: state.city.city };
};

export default connect(mapStateToProps, {})(Info);
