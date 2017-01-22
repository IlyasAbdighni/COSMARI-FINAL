import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Platform, PixelRatio } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import { Card, CardSection, Spinner } from '../../components';
import I18n from '../../config/lang/i18';
import Theme from '../../styles';

const {height, width} = Dimensions.get('window');
const absolutePath = 'https://cosmari.e-lios.eu';

class DateLoc extends Component {

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
      <View style={[styles.spinnerContainer, {paddingTop: 25}]}>
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
    let index = -1;
    const items = this.props.city.Date;
    return (
      items.map(item => {
        const newDay = this.renderDate(item.Data, ++index);
        return (
          <View style={imageHolder} key={++index}>
            <Image
              source={{ uri: absolutePath + item.ImmagineCassonetto }}
              style={imageStyle}
            />
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
        onPress={this.goToNativeMapApp.bind(this)}
      >
        <View>
          <Text style={styles.mapCalloutTitle}>{title}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 12 }}>{description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderMapView() {
    if (!this.props.loading) {
      const title = this.props.city.Comune.CentriRaccolta[0].IndirizzoCentroDiRaccolta;
      const description = this.props.city.Comune.CentriRaccolta[0].Orario;

      return (
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: this.props.city.Comune.CentriRaccolta[0].Latitudine,
            longitude: this.props.city.Comune.CentriRaccolta[0].Longitudine,
            latitudeDelta: 0.005,
            longitudeDelta: 0.003,
          }}
          onCalloutPress={this.goToNativeMapApp}
        >
          <MapView.Marker
          coordinate={{
            latitude: this.props.city.Comune.CentriRaccolta[0].Latitudine,
            longitude: this.props.city.Comune.CentriRaccolta[0].Longitudine
            // latitude: 37.78825,
            // longitude: -122.4324,
          }}
          title={title}
          description={description}
          onCalloutPress={this.goToNativeMapApp}
          onPress={this.goToNativeMapApp}
          >
            <MapView.Callout
              style={{ width: width * 0.6 }}
            >
              {this.renderMapCallout(title, description)}
            </MapView.Callout>
          </MapView.Marker>
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
        <Card style={{ flex: 1 }}>
          <CardSection style={[scrollViewContainer, {flex: 1}]}>
            <View style={textTitleContaner}>
              <Text style={textTitle}>{I18n.t('info.leftTab.modeOftransfer')}</Text>
            </View>
            <View style={scrollViewContent}>
              {this.renderScrollView()}
            </View>
          </CardSection>
          <CardSection style={{ flex: 2}} >
            {this.renderMapView()}
          </CardSection>
        </Card>
      </View>

    );
  }
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
    width: 30 * PixelRatio.get(),
    height: 30 * PixelRatio.get(),
    resizeMode: 'contain',
    marginLeft: 10,
    marginRight: 10
  },
  imageNameStyle: {
    alignSelf: 'center',
    paddingTop: 5,
    fontSize: 16,
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
  }
});

const mapStateToProps = state => {
  return {
    city: state.city.city,
    loading: state.city.loading
   };
};

export default connect(mapStateToProps)(DateLoc);
