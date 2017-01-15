import React, { Component } from 'react';
import { ListView, Text } from 'react-native';

import NewsItem from './NewsItem';

class NewsList extends Component {

  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(this.props.news);
  }

  renderRow(newsItem) {
    return <NewsItem newsItem={newsItem} />;
  }

  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}
export default NewsList;
