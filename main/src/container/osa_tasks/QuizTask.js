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
    this.style = props.style;
    this.choices = props.choices;
    this.correctChoices = props.correctChoices;
  }
}
export default QuizTask;
