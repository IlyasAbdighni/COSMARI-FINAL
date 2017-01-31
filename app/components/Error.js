import React from 'react';
import { View, Text } from 'react-native';
 
const Error = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text {...props} >{props.children}</Text>
        </View>
    );
};

export {Error};
