import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Platform, PixelRatio } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Spinner } from 'native-base';
import HTMLView from 'react-native-htmlview';

import { Card, CardSection, Error } from '../../components';
import { realm } from '../../config';
import I18n from '../../config/lang/i18';
import { Theme } from '../../styles';

const { width } = Dimensions.get('window');
const absolutePath = 'https://cosmari.e-lios.eu';

class DateLoc extends Component {

  constructor(props) {
    super(props);
    this.state = { error: null };
    this.goToNativeMapApp = this.goToNativeMapApp.bind(this);
  }

  componentDidMount() {
    setTimeout(
      () => { 
        if (this.props.error !== null) {
          this.setState({
            error: true
          });
        }
       },
      30000
    );
  }

  renderDate(d) {
    const day = new Date(d);
    const weekNum = day.getDay();
    const today = new Date();

    const week = I18n.t('week');
    const monthNum = day.getDate();
    if (today.getDate() === day.getDate()) {
      return I18n.t('today');
    } else {
      const tommorow = today.getDate() + 1;
      if (tommorow === day.getDate()) {
        return I18n.t('tomorrow');
      } else {
        return `${week[weekNum]} ${monthNum}`;
      }
    }
  }

  goToNativeMapApp() {
    console.log(this.props);
    const latitude = this.props.city.Comune.CentriRaccolta[0].Latitudine;
    const longitude = this.props.city.Comune.CentriRaccolta[0].Longitudine;
    Linking.openURL(`http://maps.apple.com/?daddr=${latitude},${longitude}`);
  }

  renderScrollView() {
    if (!this.props.loading) {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {this.renderItems()}
        </ScrollView>
      );
    }
    return (
      <View style={[styles.spinnerContainer, {alignItems: 'center'}]}>
        <Spinner color='green' size='large' />
      </View>
    );
  }

  renderItems() {
    const {
      imageStyle,
      imageNameStyle,
      imageHolder
    } = styles;
    const items = this.props.city.Date;
    return (
      items.map((item, i) => {
        const newDay = this.renderDate(item.Data, i);
        const imageURL = absolutePath + item.ImmagineCassonetto;
        return (
          <View style={imageHolder} key={i} >
            <View style={{ width: 65, height: 65 }} >
              <Image
                indicator={false}
                source={{ uri: imageURL }}
                style={imageStyle}
                resizeMode={Platform.OS === 'ios' ? 'contain' : 'cover'}
              />
            </View>
            
            <Text
                style={[imageNameStyle, { color: item.ColoreCassonetto }]}
            >
              {newDay ? newDay : ''}
            </Text>
          </View>
        );
      })

    );
  }

  renderMapCallout(title, description) {
    return (
      <TouchableOpacity
        onPress={this.goToNativeMapApp}
      >
        <View>
          <Text style={styles.mapCalloutTitle}>
            <HTMLView
              value={title}
            />
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 12 }}>
            <HTMLView
              value={description}
            />
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderMapView() {
    if (!this.props.loading) {
      const cityArea = this.props.city.Comune.CentriRaccolta;

      return (
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: cityArea[0].Latitudine,
              longitude: cityArea[0].Longitudine,
              latitudeDelta: 0.005,
              longitudeDelta: 0.003,
            }}
          >
            {cityArea.map((marker, i) => (
              <MapView.Marker
                coordinate={{
                  latitude: marker.Latitudine,
                  longitude: marker.Longitudine
                }}
                title={marker.IndirizzoCentroDiRaccolta}
                description={marker.Orario}
                onCalloutPress={this.goToNativeMapApp}
                key={i}
              >
                <MapView.Callout
                  style={{ width: width * 0.6 }}
                >
                  {this.renderMapCallout(marker.IndirizzoCentroDiRaccolta, marker.Orario)}
                </MapView.Callout>
              </MapView.Marker>

            ))}
              
          </MapView>

      );
    }
    return (
      <View style={[styles.spinnerContainer, {flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
        <Spinner color='green' size='large' />
      </View>
    );
  }

  render() {
    const {
      scrollViewContainer,
      textTitleContaner,
      scrollViewContent,
      textTitle
    } = styles;
    return (
      <View style={{ flex: 1, paddingBottom: Theme.scenePaddingBottom }}>
      {
        this.state.error ? 
        <Error>{I18n.t('serverError')}</Error> :
        <Card style={{ flex: 1 }}>
          <CardSection style={[scrollViewContainer, {flex: 1}]}>
            <View style={textTitleContaner}>
              <Text style={textTitle}>{I18n.t('info.leftTab.modeOftransfer')}</Text>
            </View>
            <View style={scrollViewContent}>
              {this.renderScrollView()}
            </View>
          </CardSection>
          <CardSection style={{ flex: 2, flexDirection: 'column'}} >
            {this.renderMapView()}
            <View style={styles.mapLabel}>
              <Text style={{ backgroundColor: 'rgba(255,255,255,0.7)', paddingHorizontal: 10, borderRadius: 5, fontWeight: '500' }} >Centro di raccolta</Text>
            </View>
          </CardSection>
        </Card>
      } 
      </View>

    );
  }
}

const MyCustomCalloutView = () => {
  return (
    <View>
      <Text>dajf dsal fdklsa </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5
  },
  scrollViewContainer: {
    flexDirection: 'column'
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
    marginLeft: 10,
    marginRight: 10,
    overflow: 'visible'
  },
  imageNameStyle: {
    alignSelf: 'center',
    paddingTop: 2,
    fontSize: 14,
    fontWeight: '500'
  },
  textTitleContaner: {
    padding: 8
  },
  textTitle: {
    color: '#3F51B5',
    fontSize: 16,
    fontWeight: '600'
  },
  imageHolder: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinnerContainer: {
    flex: 1
  },
  mapStyle: {
    flex: 1
  },
  mapCalloutTitle: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 12
  },
  mapCalloutDescription: {
    justifyContent: 'center'
  },
  mapLabel: {
    position: 'absolute',
    top: 10,
    width,
    color: 'black',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = state => {
  return {
    city: state.city.city,
    loading: state.city.loading,
    error: state.city.error
   };
};

export default connect(mapStateToProps)(DateLoc);
