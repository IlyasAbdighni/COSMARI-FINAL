import axios from 'axios';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, NetInfo, Platform } from 'react-native';
import { Provider, connect } from 'react-redux';
import { Router, Scene, Actions } from 'react-native-router-flux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';

import { Store } from './config';
import Info from './routes/info';
import News from './routes/news';
import Collect from './routes/collect';
import Photo from './routes/photo';
import MyCityList from './routes/myCityList';
import AllCity from './routes/cityList';
import NewsDetail from './routes/news/NewsDetail';
import Search from './routes/search';
import Theme from './styles';
import I18n from './config/lang/i18.js';

console.disableYellowBox = true;
const { width } = Dimensions.get('window');
const RouterWithRedux = connect()(Router);

class Routes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      isLoading: true,
      cities: null
    };
  }

  componentWillMount() {
    axios.get('https://cosmari.e-lios.eu/API/Comuni/Detail?id=81')
          .then(res =>
              this.store.dispatch({ type: 'app_opening_done', payload: res.data })
          )
          .catch(error => this.store.dispatch({ type: 'error', payload: error }));
  }

  componentDidMount() {
    const connected = (isConnected) => this.setState({ isConnected });

    NetInfo.isConnected.fetch().done((isConnected) => {
      connected(isConnected);
      NetInfo.isConnected.addEventListener('change', connected);
    });
  }

  store = Store(() => this.setState({ isLoading: false }))

  openMyCityList() {

  }

  renderIcons({ selected, title }) {
    const icons = {
      info: <Ionicons style={{ justifyContent: 'center', textAlign: 'center' }} name="md-information-circle" size={24} color={selected ? '#fff' : '#E0E0E0'} />,
      news: <FontAwesomeIcon style={{ justifyContent: 'center', textAlign: 'center' }} name="newspaper-o" size={24} color={selected ? '#fff' : '#E0E0E0'} />,
      collect: <FontAwesomeIcon style={{ justifyContent: 'center', textAlign: 'center' }} name="truck" size={24} color={selected ? '#fff' : '#E0E0E0'} />,
      report: <FontAwesomeIcon style={{ justifyContent: 'center', textAlign: 'center' }} name="camera" size={24} color={selected ? '#fff' : '#E0E0E0'} />,
    };

    let icon = icons.info;

    switch (title) {
      case 'News':
        icon = icons.news;
        break;
      case 'Collect':
        icon = icons.collect;
        break;
      case 'Photo':
        icon = icons.report;
        break;
      default:
        icon = icons.info;
    }
    return (
      <View>
        {icon}
        {
          selected ? <Text style={{color: selected ? '#fff' : '#E0E0E0'}}>{title}</Text> : <View />
        }

      </View>
    );
  }

  renderOffLine() {
    if (this.state.isConnected) {
      return (
        <View />
      );
    }
    return (
      <Toast
         visible
         position={0}
         shadow
         animation
         hideOnPress={false}
      >
         ilyas
       </Toast>
    );
  }

  render() {
    const navBarLeftBtn = () => {
      return (
        <TouchableOpacity style={styles.leftBtnHolder} onPress={Actions.MyCity}>
          <Text style={{ color: 'rgba(0, 0, 0, 0.87)', fontSize: 18, fontWeight: '500' }}>{I18n.t('header.buttonText')}</Text>
          <Ionicons style={{ marginLeft: 7, marginTop: 5, textAlign: 'center' }} color='rgba(0, 0, 0, 0.87)' name="md-arrow-dropdown" size={30} />
        </TouchableOpacity>);
    };

    const navBarRightBtn = () => (
      <TouchableOpacity onPress={Actions.search}>
        <Ionicons style={{ marginBottom: 5 }} name="md-search" size={26} color='rgba(0, 0, 0, 0.87)' />
      </TouchableOpacity>
    );

    return (
      <Provider store={this.store}>
        <RouterWithRedux
          renderLeftButton={navBarLeftBtn}
          renderRightButton={navBarRightBtn}
          navigationBarStyle={{ backgroundColor: Theme.navBarBGColor, borderBottomWidth: 0 }}
        >

            <Scene key="root">
              {/* Tab Container */}
              <Scene
                key="tabbar"
                tabs
                tabBarStyle={{ backgroundColor: Theme.tabBarBGColor }}
                pressOpacity={0.7}
              >
                {/* Tab and it's scenes */}
                <Scene key="Info" title="Info" icon={this.renderIcons} >
                  <Scene
                    key="InfoMain"
                    component={Info}
                    title=""
                    sceneStyle={styles.sceneStyle}
                    propertyFromParent='hello redux'
                  />
                </Scene>

                {/* Tab and it's scenes */}
                <Scene key="News" title="News" icon={this.renderIcons}>
                  <Scene
                    key="NewsMain"
                    component={News}
                    title=""
                    sceneStyle={styles.sceneStyle}
                  />
                </Scene>

                {/* Tab and it's scenes */}
                <Scene key="Collect" title="Collect" icon={this.renderIcons}>
                  <Scene
                    key="CollectMain"
                    component={Collect}
                    title=""
                    sceneStyle={styles.sceneStyle}
                  />
                </Scene>

                {/* Tab and it's scenes */}
                <Scene key="Photo" title="Photo" icon={this.renderIcons}>
                  <Scene
                    key="PhotoMain"
                    component={Photo}
                    title=""
                    sceneStyle={styles.sceneStyle}
                  />
                </Scene>
              </Scene>

              <Scene
                key='MyCity'
                component={MyCityList}
                leftButtonIconStyle={{ tintColor: '#000' }}
                renderRightButton={null}
                title={I18n.t('sceneTitle.myCityList')}
                sceneStyle={styles.sceneStyle}
              />

              <Scene
                key='AllCity'
                component={AllCity}
                leftButtonIconStyle={{ tintColor: '#000' }}
                title={I18n.t('sceneTitle.cityList')}
                sceneStyle={styles.sceneStyle}
              />
              <Scene
                  key='newsDetail'
                  title='News'
                  hideNavBar={false}
                  leftButtonIconStyle={{ tintColor: '#000' }}
                  navigationBarStyle={{ backgroundColor: '#4CAF50' }}
                  component={NewsDetail}
                  sceneStyle={{ paddingTop: 80 }}
              />
              <Scene
                  key='search'
                  title='bags'
                  hideNavBar={false}
                  leftButtonIconStyle={{ tintColor: '#000' }}
                  navigationBarStyle={{ backgroundColor: '#4CAF50' }}
                  component={Search}
                  sceneStyle={{ paddingTop: 80 }}
                  renderRightButton={null}
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
    justifyContent: 'flex-start'
  },
  sceneStyle: {
    paddingTop: Platform.OS === 'ios' ? 61 : 50,
    paddingBottom: Platform.OS === 'ios' ? 0 : 50,
    backgroundColor: '#fafafa',
  }

});

export default Routes;
