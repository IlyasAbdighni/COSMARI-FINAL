import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TextInput } from 'react-native';
import SearchBar from 'react-native-material-design-searchbar';

import ListItem from './ListItem';

class List extends Component {

  constructor(props) {
    super(props);
    this._arrayToMap.bind(this);
    this.renderSectionHeader.bind(this);
    this._onSearchChange.bind(this);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(this._arrayToMap())
    };
  }

  _arrayToMap() {
    const { list } = this.props;
    const listMap = {};  
    list.length > 0 && list.forEach(item => {
      if (!listMap[item.NomeVocabolario.charAt(0)]) {
        listMap[item.NomeVocabolario.charAt(0)] = [];
      }
      listMap[item.NomeVocabolario.charAt(0)].push(item);
    });
    return listMap;
  }

  _onSearchChange(text) {
    console.log(text, 'onSearchChange');
  }

  _searchOnFocus() {
    this.setState({
      dataSource: []
    });
  }

  _searchOnBlur() {
    console.log('On Blur');
  }

  renderSectionHeader(sectionData, category) {
    return (
      <Text style={{fontWeight: "700", fontSize: 20, backgroundColor: '#eee', paddingHorizontal: 10, paddingVertical: 10}}>{category}</Text>
    );
  }
  renderRow(item) {
    return <ListItem item={item} />;
  } 

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <SearchBar
            onSearchChange={(text) => this._onSearchChange(text)}
            height={30}
            onFocus={() => this._searchOnFocus()}
            onBlur={() => this._searchOnBlur()}
            placeholder={'Search...'}
            autoCorrect={false}
            padding={5}
            returnKeyType={'search'}
            inputStyle={{ backgroundColor: '#eee', borderRadius: 5 }}
          />
        </View>
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />
        
      </View>
      
    );
  }
}

export default List;
