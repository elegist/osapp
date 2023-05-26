import AssessmentTask from './AssessmentTask';

/**
 * Class QuizTask
 */
class QuizTask extends AssessmentTask {
  constructor(props) {
    super(props);
    this.string = 'Ich bin eine QuizTask!';
    this.question = props.question;
    this.choices = props.choices;
    this.correctChoice = props.correctChoice;
  }
}
export default QuizTask;
