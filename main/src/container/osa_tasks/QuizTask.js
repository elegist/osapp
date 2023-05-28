import React from 'react';
import {Text, View} from 'react-native';
import AssessmentTask from './AssessmentTask';

/**
 * Class QuizTask
 */
class QuizTask extends AssessmentTask {
  _question = null
  _choices = null
  _correctChoices = null

  constructor(props) {
    super(props);
    this._question = props.question;
    this._choices = props.choices;
    this._correctChoice = props.correctChoice;
  }

  render() {
    return (
      <View>
        <Text>Topic: {this.props.task._topic}</Text>
        <Text>Title: {this.props.task._title}</Text>
        <Text>Question: {this.props.task._question}</Text>
        <Text>Choices: {this.props.task._choices}</Text>
        <Text>Correct choices: {this.props.task._correctChoices}</Text>
        {/* Additional UI elements related to QuizTask */}
      </View>
    )
  }
}
export default QuizTask;
