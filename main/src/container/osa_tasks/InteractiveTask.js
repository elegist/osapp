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
}

export default InteractiveTask;
