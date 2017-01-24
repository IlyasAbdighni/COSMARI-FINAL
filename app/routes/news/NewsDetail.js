import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Container, Content, H2, Text, CardItem } from 'native-base';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';

const NewsDetail = ({ newsTitle, newsBody, date }) => {
  const { container, body, titleStyle, dateStyle } = styles;
  const goToUrl = (url) => {
    Linking.openURL(url);
  };
  const newDate = moment(date).format('DD-MM-YYYY');

  return (
    <Container>
      <Content>
        <View style={container}>
          <CardItem style={titleStyle}>
            <H2>
              {newsTitle}
            </H2>
            <View>
              <Text style={dateStyle}>{newDate}</Text>
            </View>
          </CardItem>

          <CardItem>
            <Text
              style={body}
              selectable
            >
              <HTMLView
                value={newsBody}
                onLinkPress={(url) => goToUrl(url)}
                selectable
              />
            </Text>
          </CardItem>
        </View>

      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 5
  },
  body: {
    textAlign: 'justify'
  },
  titleStyle: {
    marginBottom: 5
  },
  dateStyle: {
    marginTop: 10,
    color: '#9E9E9E'
  }
});

export default NewsDetail;
