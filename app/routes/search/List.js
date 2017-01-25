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
    this._renderListView.bind(this);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      hasMatchFound: true,
      withsectionHeader: true,
      dataSource: ds.cloneWithRowsAndSections(this._arrayToMap())
    };
  }

  _arrayToMap() {
    const { list } = this.props;
    const listMap = {};  
    list.length > 0 && list.forEach(item => {
      if (!listMap[item.NomeVocabolario.trim().charAt(0)]) {
        listMap[item.NomeVocabolario.charAt(0)] = [];
      }
      listMap[item.NomeVocabolario.charAt(0)].push(item);
    });
    return listMap;
  }

  _onSearchChange(text) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    const list = this._arrayToMap();
    const textToSearch = /^[a-zA-Z]+$/.test(text) && text.trim().toUpperCase();
    let listToshow = [];
    if (/^[a-zA-Z]+$/.test(text)) {
      if(list.hasOwnProperty(textToSearch.charAt(0))) {
        if (textToSearch.substring(1)) {
          list[textToSearch.charAt(0)].forEach((t, index, arr) => {
            console.log(t.NomeVocabolario[1] === textToSearch[1].toLowerCase());
            if (t.NomeVocabolario[1] === textToSearch[1].toLowerCase()) {
              listToshow.push(arr[index]);
            }
          });
        } else {
          listToshow = list[textToSearch.charAt(0)];
        }
        this.setState({
          hasMatchFound: true,
          withsectionHeader: false,
          dataSource: ds.cloneWithRows(listToshow)
        });
      } else {
        this.setState({
          hasMatchFound: false,
        });
      }
      
    } else {
      this.setState({
        hasMatchFound: true,
        withsectionHeader: true,
        dataSource: ds.cloneWithRowsAndSections(this._arrayToMap())
      });
    }
  }

  _searchOnFocus(e) {
    console.log(e);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.setState({
      hasMatchFound: true,
      withsectionHeader: false,
      dataSource: ds.cloneWithRows([])
    });
  }

  _searchOnBlur() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      hasMatchFound: true,
      dataSource: ds.cloneWithRowsAndSections(this._arrayToMap())
    };
  }

  renderSectionHeader(sectionData, category) {
    return (
      <Text style={{fontWeight: "700", fontSize: 20, backgroundColor: '#eee', paddingHorizontal: 10, paddingVertical: 10}}>{category}</Text>
    );
  }
  renderRow(item) {
    return <ListItem item={item} />;
  } 

  _renderListView() {
    if (this.state.hasMatchFound) {
      if (this.state.withsectionHeader) {
        return (
            <ListView
                enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderSectionHeader={this.renderSectionHeader}
            />
          ); 
      }
      return (
        <ListView
            enableEmptySections
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
        />
      );
    } else {
      return (
        <Text>No match found!!!</Text>
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <SearchBar
            onSearchChange={(text) => this._onSearchChange(text)}
            height={30}
            onFocus={(e) => this._searchOnFocus(e)}
            onBlur={() => this._searchOnBlur()}
            placeholder={'Search...'}
            autoCorrect={false}
            padding={5}
            returnKeyType={'search'}
            inputStyle={{ backgroundColor: '#eee', borderRadius: 5 }}
          />
        </View>
        {this._renderListView()}
      </View>
      
    );
  }
}

export default List;
