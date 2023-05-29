import {Text, View} from 'react-native';
import React, {Component} from 'react';

export class ReadingScreen extends Component {
  render() {
    return (
      <View>
        <Text>Topic: {this.props.topic}</Text>
        <Text>Title: {this.props.title}</Text>
        <Text>Message: {this.props.text}</Text>
        {/* Additional UI elements related to ReadingTask */}
      </View>
    );
  }
}

export default ReadingScreen;
