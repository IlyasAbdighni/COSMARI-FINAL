import React from 'react';
import { View, StyleSheet, Linking, Image, Dimensions } from 'react-native';
import { Container, Content, H2, Text, CardItem } from 'native-base';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';

const {height, width} = Dimensions.get('window');

const NewsDetail = ({ newsTitle, newsBody, date }) => {
  const { container, body, titleStyle, dateStyle } = styles;
  const goToUrl = (url) => {
    Linking.openURL(url);
  };
  const newDate = moment(date).format('DD-MM-YYYY');

  return (
    <Container>
      <View>
            <Image 
              source={require('../../assets/bg_7.jpg')} 
              style={{
                flex: 1,
                width,
                height,
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,0)'
              }} 
              blurRadius={5}
            />
          </View>
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
