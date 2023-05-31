import {Text, View} from 'react-native';
import React, {Component} from 'react';

export default class InteractiveScreen extends Component {
  constructor(props) {
    super(props);
    // TODO: when tasks are implemented call this, to show the next buttons when the task is done!
    this.props.onTaskFinished();
  }

  render() {
    return (
      <View>
        <Text>Topic: {this.props.topic}</Text>
        <Text>Title: {this.props.title}</Text>
        <Text>Text: {this.props.text}</Text>
        {/* Additional UI elements related to InteractiveTask */}
      </View>
    );
  }
}
