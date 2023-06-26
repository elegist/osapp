import React from 'react';
import {Text, View} from 'react-native';
import AssessmentTask from './AssessmentTask';

/**
 * Class InteractiveTask -
 * represents a more complex task which needs specific user interaction
 */
class InteractiveTask extends AssessmentTask {
  #usedHints = 0;
  #maxHints = 0;

  constructor(props) {
    super(props);
    this.slug = props.slug;
    this.help = props.help;
  }

  increaseUsedHints = () => {
    this.#usedHints++;
  }

  getUsedHints = () => {
    return this.#usedHints;
  }

  setMaxHints = (value) => {
    this.#maxHints = value;
  }
}

export default InteractiveTask;
