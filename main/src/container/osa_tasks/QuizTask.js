import AssessmentTask from './AssessmentTask';

/**
 * Class QuizTask -
 * represents a task which contains something like a multiple choice or single choice quiz
 */
class QuizTask extends AssessmentTask {
  #selectedAnswers = [];
  constructor(props) {
    super(props);
    this.question = props.question;
    this.style = props.style;
    this.choices = props.choices;
    this.correctChoices = props.correctChoices;
  }

  setSelectedAnswers = value => {
    this.#selectedAnswers = value;
    this.validateAnswers();
  };

  /**
   * Processes answers and checks if they are correct or false
   * can be used to display summary screen and feedback
   */
  validateAnswers = () => {
    const SINGLE_CHOICE = 'single';
    const MUTLIPLE_CHOICE = 'multiple';
    switch (this.style) {
      case SINGLE_CHOICE:
        this.correctChoices.includes(this.#selectedAnswers[0]) ? this.setTaskSuccess(true) : this.setTaskSuccess(false);
        break;
      case MUTLIPLE_CHOICE:
        let maxPoints = this.choices.length;
        let pointsEach = 1 / maxPoints;
        let pointsReached = 0;
        this.choices.forEach(choice => {
          if(this.correctChoices.includes(choice)) { // choosing this answer is correct
            this.#selectedAnswers.includes(choice) ? pointsReached += pointsEach : {};
          } else { // not choosing this answer is correct
            !this.#selectedAnswers.includes(choice) ? pointsReached += pointsEach : {};
          }
        });
        pointsReached >= .5 ? this.setTaskSuccess(true) : this.setTaskSuccess(false);
        break;
    }
  };
}
export default QuizTask;
