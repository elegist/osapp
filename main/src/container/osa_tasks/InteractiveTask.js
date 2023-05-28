import React from 'react';
import {Text, View} from 'react-native';
import AssessmentTask from './AssessmentTask'

/**
 * Class InteractiveTask
 */
class InteractiveTask extends AssessmentTask {
  _text = null

  constructor(props) {
    super(props);
    this._text = props.text;
  }

  render() {
    return (
      <View>
        <Text>Topic: {this.props.task._topic}</Text>
        <Text>Title: {this.props.task._title}</Text>
        <Text>Text: {this.props.task._text}</Text>
        {/* Additional UI elements related to InteractiveTask */}
      </View>
    )
  }
}
export default InteractiveTask