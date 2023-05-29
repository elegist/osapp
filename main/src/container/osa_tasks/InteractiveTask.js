import React from 'react';
import {Text, View} from 'react-native';
import AssessmentTask from './AssessmentTask';

/**
 * Class InteractiveTask -
 * represents a more complex task which needs specific user interaction
 */
class InteractiveTask extends AssessmentTask {
  constructor(props) {
    super(props);
    this.text = props.text;
  }

  render() {
    return (
      <View>
        <Text>Topic: {this.topic}</Text>
        <Text>Title: {this.title}</Text>
        <Text>Text: {this.text}</Text>
        {/* Additional UI elements related to InteractiveTask */}
      </View>
    );
  }
}
export default InteractiveTask;
