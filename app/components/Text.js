import React from 'react';
import HTMLView from 'react-native-htmlview';

const Text = (props) => {
    return (
      <HTMLView
        stylesheet={props.style}
        value={props.children}
        onLinkPress={(url) => false}
      />
    );
};

export { Text };
