import React from 'react';
import {Text, View} from 'react-native';
import AssessmentTask from './AssessmentTask';

/**
 * Class ReadingTask -
 * represents a task which only contains text to read
 */
class ReadingTask extends AssessmentTask {
  constructor(props) {
    super(props);
    this.text = props.text;
  }
}

export default ReadingTask;
