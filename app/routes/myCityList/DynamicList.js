'use strict';
import React, {Component} from 'react';
import {
    View, Text, Alert, ListView, StyleSheet,
    TouchableOpacity, InteractionManager, RefreshControl, Animated
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { getCommunityList, getCommunity } from '../../actions/AppActions';
import I18n from '../../config/lang/i18';
import rowData from './data.json';

const data = rowData;

class DynamicListRow extends Component {

    // these values will need to be fixed either within the component or sent through props
    _defaultHeightValue = 60;
    _defaultTransition  = 300;

    state = {
        _rowHeight  : new Animated.Value(this._defaultHeightValue),
        _rowOpacity : new Animated.Value(0)
    };

    componentDidMount() {
        Animated.timing(this.state._rowOpacity, {
            toValue  : 1,
            duration : this._defaultTransition
        }).start();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.remove) {
            this.onRemoving(nextProps.onRemoving);
        } else {
            this.resetHeight();
        }
    }

    onRemoving(callback) {
        console.log("removing");
        Animated.timing(this.state._rowHeight, {
            toValue  : 0,
            duration : this._defaultTransition
        }).start(callback);
    }

    resetHeight() {
        Animated.timing(this.state._rowHeight, {
            toValue  : this._defaultHeightValue,
            duration : 0
        }).start();
    }

    render() {
        return (
            <Animated.View
                style={{height: this.state._rowHeight, opacity: this.state._rowOpacity}}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

class DynamicList extends Component {

    /**
     * Default state values
     * */
    state = {
        loading     : true,
        dataSource  : new ListView.DataSource({
            rowHasChanged : (row1, row2) => true
        }),
        refreshing  : false,
        rowToDelete : null
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._loadData()
        });
    }

    _loadData(refresh) {
        refresh && this.setState({
            refreshing : true
        });
        const result = [];
        data.forEach(item => {
          result.push(item);
        })

        this.dataLoadSuccess({result});
    }

    dataLoadSuccess(result) {
        this._data = result.result;

        const ds = this.state.dataSource.cloneWithRows(this._data);

        this.setState({
            loading     : false,
            refreshing  : false,
            rowToDelete : -1,
            dataSource  : ds
        });
    }

    goToCommunityList() {
      this.props.getCommunityList();
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.addPanel}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => this.goToCommunityList()}
                    >
                        <Text style={styles.addButtonText}> + {I18n.t('selectANewCity')}</Text>
                    </TouchableOpacity>
                </View>
                <ListView
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._loadData.bind(this, true)}
                        tintColor="#00AEC7"
                        title="Loading..."
                        titleColor="#00AEC7"
                        colors={['#FFF', '#FFF', '#FFF']}
                        progressBackgroundColor="#00AEC7"

                      />
                    }
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                />
            </View>
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <DynamicListRow
                remove={rowData.id === this.state.rowToDelete}
                onRemoving={this._onAfterRemovingElement.bind(this)}
            >
                <View style={styles.rowStyle}>
                    <TouchableOpacity disabled={rowData.selected} style={styles.deleteWrapper} onPress={this._deleteItem.bind(this, rowData.id)}>
                        {
                          rowData.selected ? <Icon name='md-remove-circle' size={20} style={{color: '#eee', textAlign: 'center'}} />
                          : <Icon name='md-remove-circle' size={20} style={{color: '#d9534f', textAlign: 'center'}} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.contact}
                      onPress={() => this.props.getCommunity(rowData.id, null)}
                    >
                        <Text style={[styles.name]}>{rowData.name}</Text>
                        {
                          rowData.selected ? <Icon name='md-checkmark' size={20} style={{color: '#5cb85c'}} />
                          : <View />
                        }
                    </TouchableOpacity>

                </View>
            </DynamicListRow>
        );
    }

    componentWillUpdate(nexProps, nexState) {
        if (nexState.rowToDelete !== null) {
            this._data = this._data.filter((item) => {
                if (item.id !== nexState.rowToDelete) {
                  return item;
                }
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.rowToDelete !== null) {
          const cityIdToBeDeleted = data.filtered(`id = ${prevState.rowToDelete}`);
          realm.write(() => {
            realm.delete(cityIdToBeDeleted);
          });
      }
    }

    _deleteItem(id) {
      Alert.alert(
        I18n.t('warning.title'),
        I18n.t('warning.warningText'),
        [
          {text: I18n.t('warning.cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: I18n.t('warning.yes'),
          onPress: () => {
            this.setState({ rowToDelete : id });
          }},
        ]
      );
    }

    _deleteAMyCity(id) {
      this.setState({
          rowToDelete : id
      });
    }

    _onAfterRemovingElement() {
        this.setState({
            rowToDelete : null,
            dataSource  : this.state.dataSource.cloneWithRows(this._data)
        });
    }

}

const styles = StyleSheet.create({
    container : {
        flex            : 1,
        backgroundColor : '#fff'
    },
    noData    : {
        color     : '#000',
        fontSize  : 18,
        alignSelf : 'center',
        top       : 200
    },

    addPanel      : {
        paddingTop      : 20,
        paddingBottom   : 20,
        backgroundColor : '#F9F9F9'
    },
    addButton     : {
        backgroundColor : '#4CAF50',
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf       : 'flex-end',
        marginRight     : 10,
        padding         : 5,
        borderRadius    : 5
    },
    addButtonText : {
        color     : '#fff',
        alignSelf : 'center'
    },

    rowStyle : {
        flex: 1,
        backgroundColor   : '#FFF',
        paddingVertical   : 5,
        paddingHorizontal : 10,
        borderBottomColor : '#ccc',
        borderBottomWidth : 1,
        flexDirection     : 'row'
    },

    rowIcon : {
        width            : 30,
        alignSelf        : 'flex-start',
        marginHorizontal : 10,
        fontSize         : 24
    },

    name    : {
        color    : '#212121',
        fontSize : 14
    },
    phone   : {
        color    : '#212121',
        fontSize : 10
    },
    contact : {
        flex: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    deleteWrapper : {
        flex: 1,
        paddingVertical : 10,
        alignSelf       : 'center',
        alignItems: 'center'
    },
    deleteIcon    : {
        fontSize  : 24,
        color     : '#DA281C',
        alignSelf : 'center',
        textAlign: 'center'
    }
});

export default connect(null, { getCommunityList, getCommunity })(DynamicList);
