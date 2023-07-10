import {Component} from 'react';

/**
 * AssessmentTask class - this is the parent class of all task subclasses
 */
class AssessmentTask extends Component {
  #taskSuccess = false;
  #startTime = null;
  #timeElapsed = null;

  constructor(props) {
    super(props);
    this.id = props.id;
    this.title = props.title;
    this.topic = props.topic;
    this.summarySubSection = props.summarySubSection;
  }

  getTaskSuccess = () => {
    return this.#taskSuccess;
  };

  setTaskSuccess = value => {
    this.#taskSuccess = value;
  };

  getTimeElapsed = () => {
    return this.#timeElapsed;
  };

  getTimeElapsedFormatted = () => {
    return this.#formatTime(this.#timeElapsed);
  };

  startTimeMeasurement = () => {
    this.#startTime = performance.now();
  };

  stopTimeMeasurement = () => {
    const timeNow = performance.now();
    this.#timeElapsed = timeNow - this.#startTime;
    const formattedTime = this.#formatTime(this.#timeElapsed);
  };

  #formatTime = milliseconds => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
    const remainingMilliseconds = Math.floor(milliseconds % 1000);

    let formattedTime = '';

    if (hours > 0) {
      formattedTime += `${hours}h `;
    }
    if (remainingMinutes > 0 || formattedTime !== '') {
      formattedTime += `${remainingMinutes}m `;
    }
    if (remainingSeconds > 0 || formattedTime !== '') {
      formattedTime += `${remainingSeconds}s `;
    }
    if (remainingMilliseconds > 0 && formattedTime === '') {
      formattedTime += `<1s`;
    }

    return formattedTime;
  };
}

export default AssessmentTask;
