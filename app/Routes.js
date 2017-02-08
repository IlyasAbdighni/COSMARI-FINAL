import axios from 'axios';
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  NetInfo,
  Platform,
} from 'react-native';
import { Provider, connect } from 'react-redux';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';

import { Store, getChoosenCommunity, realm } from './config';
import Info from './routes/info';
import News from './routes/news';
import Collect from './routes/collect';
import Photo from './routes/photo';
import MyCityList from './routes/myCityList';
import AllCity from './routes/cityList';
import NewsDetail from './routes/news/NewsDetail';
import Search from './routes/search';
import {Theme} from './styles';
import { NoCity } from './components';
import I18n from './config/lang/i18.js';

console.disableYellowBox = true;
const { width } = Dimensions.get('window');
const RouterWithRedux = connect()(Router);
let city;
realm.addListener('change', () => {
  city = getChoosenCommunity();
});

class Routes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      isLoading: true,
      cities: null,
      initial: true
    };
  }

  componentWillMount() {
    city = getChoosenCommunity();
    if (Object.keys(city).length > 0) {
      this.setState({ initial: false });
      const api = axios.create();
      api.defaults.timeout = 2500;
      api.get('https://cosmari.e-lios.eu/API/Comuni/Detail?id=' + city.id)
          .then(res =>
              this.store.dispatch({ type: 'app_opening_done', payload: res.data })
          )
          .catch(error => this.store.dispatch({ type: 'error', payload: error }));
    } else {
      this.setState({ initial: true });
    }   
  }

  componentDidMount() {
    const connected = (isConnected) => this.setState({ isConnected });

    NetInfo.isConnected.fetch().done((isConnected) => {
      connected(isConnected);
      NetInfo.isConnected.addEventListener('change', connected);
    });
  }

  store = Store()

  goToSearchPage() {
    Actions.search();
  }

  renderIcons(props) {
    console.log(props);
    const icons = {
      info: <Ionicons style={{ justifyContent: 'center', textAlign: 'center' }} name="md-information-circle" size={24} color={props.selected ? '#fff' : '#E0E0E0'} />,
      news: <FontAwesomeIcon style={{ justifyContent: 'center', textAlign: 'center' }} name="newspaper-o" size={24} color={props.selected ? '#fff' : '#E0E0E0'} />,
      collect: <FontAwesomeIcon style={{ justifyContent: 'center', textAlign: 'center' }} name="truck" size={24} color={props.selected ? '#fff' : '#E0E0E0'} />,
      report: <FontAwesomeIcon style={{ justifyContent: 'center', textAlign: 'center' }} name="camera" size={24} color={props.selected ? '#fff' : '#E0E0E0'} />,
    };

    let icon = icons.info;

    switch (props.title) {
      case 'News':
        icon = icons.news;
        break;
      case 'Collect':
      case 'Ritiro':
        icon = icons.collect;
        break;
      case 'Report':
      case 'Segnala':
        icon = icons.report;
        break;
      default:
        icon = icons.info;
    }
    return (
      <View>
        {icon}
        {
          props.selected ? <Text style={{color: props.selected ? '#fff' : '#E0E0E0'}}>{props.title}</Text> : <View />
        }

      </View>
    );
  }

  newsTab() {
    Actions.NewsMain({ type: ActionConst.REFRESH, city});
  }

  _renderError() {
    return (
      <Error>
          <TouchableOpacity>
            <Text>{I18n.t('header.buttonText')}</Text>
          </TouchableOpacity>
      </Error>
    );
  }

  render() {
    const navBarLeftBtn = () => {
      return (
        <TouchableOpacity style={styles.leftBtnHolder} onPress={Actions.MyCity}>
          {
            Object.keys(city).length > 0 ?
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }} ellipsizeMode='tail' numberOfLines={1} >
              <HTMLView
                value={city.name}
              />
            </Text> :
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }}ellipsizeMode='tail' numberOfLines={1} > {I18n.t('header.buttonText')}</Text>
          }
          <Ionicons 
            style={{ marginLeft: 7, marginTop: 5, textAlign: 'center' }} color='#fff' name="md-arrow-dropdown" size={30} />
        </TouchableOpacity>);
    };

    const navBarRightBtn = () => (
      <TouchableOpacity style={{ height: 25, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={this.goToSearchPage.bind(this)}>
        <Ionicons style={{ marginBottom: 6 }} name="md-search" size={24} color='#fff' />
      </TouchableOpacity>
    );

    return (
      <Provider store={this.store}>
        <RouterWithRedux
          duration={0}
          renderLeftButton={navBarLeftBtn}
          renderRightButton={navBarRightBtn}
          navigationBarStyle={{ backgroundColor: Theme.navBarBGColor, borderBottomWidth: 0 }}
        >

            <Scene key="root">
              {/* Tab Container */}
              <Scene key='main'>
                <Scene
                  key="tabbar"
                  tabs
                  tabBarStyle={{ backgroundColor: Theme.tabBarBGColor }}
                  pressOpacity={0.8}
                  type={ActionConst.REPLACE}
                >
                  {/* Tab and it's scenes */}
                  <Scene key="Info" title={I18n.t('tabs.info')} icon={this.renderIcons} >
                    <Scene
                      key="InfoMain"
                      component={Info}
                      title=""
                      sceneStyle={styles.sceneStyle}
                      propertyFromParent='hello redux'
                    />
                  </Scene>

                  {/* Tab and it's scenes */}
                  <Scene
                    key="News"
                    title={I18n.t('tabs.news')}
                    icon={this.renderIcons}
                    onPress={() => this.newsTab()}
                  >
                    <Scene
                      key="NewsMain"
                      component={News}
                      title=""
                      sceneStyle={styles.sceneStyle}
                    />
                  </Scene>

                  {/* Tab and it's scenes */}
                  <Scene key="Collect" title={I18n.t('tabs.collect')} icon={this.renderIcons}>
                    <Scene
                      key="CollectMain"
                      component={Collect}
                      title=""
                      sceneStyle={styles.sceneStyle}
                    />
                  </Scene>

                  {/* Tab and it's scenes */}
                  <Scene key="Photo" title={I18n.t('tabs.report')} icon={this.renderIcons}>
                    <Scene
                      key="PhotoMain"
                      component={Photo}
                      title=""
                      sceneStyle={styles.sceneStyle}
                    />
                  </Scene>
                </Scene>
              </Scene>

              <Scene
                key='MyCity'
                component={MyCityList}
                leftButtonIconStyle={{ tintColor: '#fff' }}
                renderRightButton={null}
                title={I18n.t('sceneTitle.myCityList')}
                titleStyle={{ color: '#fff' }}
                sceneStyle={[styles.sceneStyle, {paddingBottom: 0}]}
                renderRightButton={null}
              />

              <Scene
                key='AllCity'
                component={AllCity}
                leftButtonIconStyle={{ tintColor: '#fff' }}
                title={I18n.t('sceneTitle.cityList')}
                titleStyle={{ color: '#fff' }}
                sceneStyle={[styles.sceneStyle, {paddingBottom: 0}]}
                renderRightButton={null}
              />
              <Scene
                  key='newsDetail'
                  title={I18n.t('sceneTitle.news')}
                  titleStyle={{ color: '#fff' }}
                  hideNavBar={false}
                  leftButtonIconStyle={{ tintColor: '#fff' }}
                  navigationBarStyle={{ backgroundColor: '#4CAF50' }}
                  component={NewsDetail}
                  sceneStyle={{ paddingTop: 60 }}
              />
              <Scene
                  key='search'
                  title={I18n.t('sceneTitle.voc')}
                  titleStyle={{ color: '#fff' }}
                  hideNavBar={false}
                  leftButtonIconStyle={{ tintColor: '#fff', color: 'red' }}
                  navigationBarStyle={{ backgroundColor: '#4CAF50' }}
                  component={Search}
                  sceneStyle={{ paddingTop: Theme.scenePaddingTop }}
                  renderRightButton={null}
              />
              <Scene
                  initial={this.state.initial}
                  key='error'
                  title={null}
                  titleStyle={{ color: '#fff' }}
                  hideNavBar={false}
                  leftButtonIconStyle={{ tintColor: '#fff' }}
                  navigationBarStyle={{ backgroundColor: '#4CAF50' }}
                  component={NoCity}
                  sceneStyle={{ paddingTop: Theme.scenePaddingTop }}
              />

            </Scene>

        </RouterWithRedux>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  leftBtnHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.8,
    justifyContent: 'flex-start',
  },
  sceneStyle: {
    paddingTop: Platform.OS === 'ios' ? 61 : 50,
    paddingBottom: Theme.paddingBottom,
    backgroundColor: Theme.mainBackgroundColor,
  }

});

export default Routes;
