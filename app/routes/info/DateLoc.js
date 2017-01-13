import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ScrollView } from 'react-native';

import { Card, CardSection, Spinner } from '../../components';
import I18n from '../../config/lang/i18';

const {height} = Dimensions.get('window');
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

  renderScrollView() {
    if (this.props.city !== null && this.props.city.hasOwnProperty('Date')) {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {this.renderItems()}
        </ScrollView>
      );
    }
    return (
      <View style={styles.spinnerContainer}>
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

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props === nextProps) {
      return false;
    }
    return true;
  }

  render() {
    const {
      scrollViewContainer,
      textTitleContaner,
      scrollViewContent,
      textTitle
    } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Card>
          <CardSection style={scrollViewContainer}>
            <View style={textTitleContaner}>
              <Text style={textTitle}>{I18n.t('info.leftTab.modeOftransfer')}</Text>
            </View>
            <View style={scrollViewContent}>
              {this.renderScrollView()}
            </View>
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
    height: 180,
    flexDirection: 'column'
  },
  imageStyle: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginLeft: 10,
    marginRight: 10
  },
  imageNameStyle: {
    alignSelf: 'center',
    paddingTop: 5,
    fontSize: 18,
    fontWeight: '500'
  },
  textTitleContaner: {
    padding: 8
  },
  textTitle: {
    color: '#3F51B5',
    fontSize: 18,
    fontWeight: '600'
  },
  imageHolder: {
    marginTop: 5
  },
  spinnerContainer: {
    height: 120
  },
  mapStyle: {
    flex: 1,
    height: height / 3.5
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

export default DateLoc;
