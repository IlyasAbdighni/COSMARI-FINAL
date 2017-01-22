import React, { Component } from 'react';
import { ListView, RefreshControl } from 'react-native';

import NewsItem from './NewsItem';
import { api } from '../../config';

class NewsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      loaded: true,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  componentWillMount() {
    this.dataSource = this.state.dataSource.cloneWithRows(this.props.news);
  }

  renderRow(newsItem) {
    return <NewsItem newsItem={newsItem} />;
  }

  _onRefresh(refresh) {
    console.log('ilyas');
    refresh && this.setState({ isRefreshing: true });

    console.log(api);

  }

  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
      />
    );
  }
}
export default NewsList;
