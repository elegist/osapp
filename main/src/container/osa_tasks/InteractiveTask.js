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
    this.slug = props.slug;
    this.content = props.content;
    this.help = props.help;
  }
}

export default InteractiveTask;
