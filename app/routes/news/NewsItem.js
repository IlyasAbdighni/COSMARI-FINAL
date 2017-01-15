import React, { Component } from 'react';
import { View, Text, TouchableOpacity, PixelRatio } from 'react-native';
import { Actions } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import I18n from '../../config/lang/i18';

class NewsItem extends Component {

  goToNewsDetail() {
    Actions.newsDetail({ newsTitle: this.props.newsItem.Titolo, newsBody: this.props.newsItem.Corpo, date: this.props.newsItem.DataPubblicazione });
  }

  render() {
    const {
      newsStyle,
      newsTitleStyle,
      newsBriefStyle,
      newsBriefContent,
      newsDate,
      newsDateContainer
    } = styles;

    const {
      Titolo: title,
      Corpo: intro,
      DataPubblicazione: date
    } = this.props.newsItem;

    const renderDate = dateOfNews => {
      const d = new Date(dateOfNews);
      const monthOfTheDay = d.getMonth();
      const day = d.getDate();
      const month = I18n.t('months');
      return `${day} ${month[monthOfTheDay]}`;
    };

    return (
      <TouchableOpacity onPress={this.goToNewsDetail.bind(this)} style={newsStyle}>
        <View>
          <Text style={newsTitleStyle}>{title}</Text>
        </View>
        <View style={newsBriefStyle}>
          <View style={{ flex: 5 }}>
            <Text
              numberOfLines={2}
              style={newsBriefContent}
            >
              <HTMLView
                value={intro}
                onLinkPress={(url) => console.log(url)}
                selectable
              />
            </Text>
          </View>
          <View style={newsDateContainer}>
              <Text style={newsDate}>
                {renderDate(date)}
              </Text>
          </View>
        </View>

      </TouchableOpacity>
    );
  }
}

const styles = {
  newsStyle: {
    padding: 10,
    borderColor: '#9E9E9E',
    borderWidth: 0,
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  newsTitleStyle: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 22,
    fontWeight: '500'
  },
  newsBriefStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  newsBriefContent: {
    fontSize: 12,
    color: '#212121'
  },
  newsDateContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  newsDate: {
    alignSelf: 'flex-end',
    color: '#757575'
  }
};

export default NewsItem;
