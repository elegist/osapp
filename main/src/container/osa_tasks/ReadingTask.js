import React from 'react';
import {Text, View} from 'react-native';
import AssessmentTask from './AssessmentTask';

/**
 * Class ReadingTask -
 * represents a task which contains information to read through as well as some images
 */
class ReadingTask extends AssessmentTask {
  constructor(props) {
    super(props);
    this.text = props.text;
    this.images = props.images;
  }
}

export default ReadingTask;
