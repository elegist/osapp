import React from 'react';
import {Text, View} from 'react-native';
import AssessmentTask from './AssessmentTask';

/**
 * Class QuizTask -
 * represents a task which contains something like a multiple choice or single choice quiz
 */
class QuizTask extends AssessmentTask {
  constructor(props) {
    super(props);
    this.question = props.question;
    this.choices = props.choices;
    this.correctChoice = props.correctChoice;
  }
}
export default QuizTask;
