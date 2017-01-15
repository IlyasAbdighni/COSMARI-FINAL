import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';

import ListItem from './ListItem';

class List extends Component {

  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(this.props.list);
  }

  renderRow(item) {
    return <ListItem item={item} />;
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

export default List;
