import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import {Theme} from '../styles';

import I18n from '../config/lang/i18.js';

class NoCity extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }} >
                <Text style={{ textAlign:'center' }} >{I18n.t('blankPageText')}</Text>
                <TouchableOpacity style={styles.button} onPress={Actions.AllCity} >
                    <Text style={{ color: '#fff' }} >{I18n.t('header.buttonText')}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    button: {
        width: 120, 
        height: 40,
        borderRadius: 3, 
        backgroundColor: Theme.navBarBGColor, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginVertical: 10
    }

}); 

export { NoCity };
