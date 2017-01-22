import React, { Component } from 'react';

import FoldView from 'react-native-foldview';

const Frontface = (props) => (/*...*/);
const Backface = (props) => (/*...*/);
const Base = (props) => (/*...*/);

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  componentWillMount() {
    this.flip = this.flip.bind(this);
  }

  flip() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  renderFrontface() {
    return (
      <View>
        <Text>ilyas</Text>
      </View>
    );
  }

  renderBackface() {
    /**
     * You can nest <FoldView>s here to achieve the folding effect shown in the GIF above.
     * A reference implementation can be found in examples/Simple.
     */
    return (
      <View>
        <Text>abdighni</Text>
      </View>
    );
  }

  render() {
    return (
      <FoldView
        expanded={this.state.expanded}
        renderBackface={this.renderBackface}
        renderFrontface={this.renderFrontface}
      >
        <Base />
      </FoldView>
    );
  }
}

export default Search;