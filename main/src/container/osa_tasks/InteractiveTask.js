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

  increaseUsedHints = () => this.#usedHints++;

  getUsedHints = () => this.#usedHints;

  setMaxHints = value => (this.#maxHints = value);

  getMaxHints = () => this.#maxHints;

  getHintRatio = () => (this.#usedHints / this.#maxHints).toFixed(2);

  /**
   * Generate user feedback for summary screen
   */
  getUserFeedback = () => {
    let time = this.getTimeElapsed();
    let hintRatio = this.getHintRatio();

    let feedbackText = '';

    if (this.getTaskSuccess()) {
      feedbackText += 'Du hast die Aufgabe gelöst!\n';
      if (time < 10000)
        feedbackText +=
          'Und zwar sehr schnell. Das scheint genau dein Thema zu sein!';
      else if (time < 60000)
        feedbackText += 'In weniger als einer Minute. Sehr gut gemacht!';
      else if (time < 120000)
        feedbackText += 'In weniger als zwei Minuten. Gut gemacht!';
      else if (time < 300000)
        feedbackText +=
          'Du scheinst dir auch etwas Zeit für die Bearbeitung genommen zu haben, das ist gut!';
      else if (time > 300000)
        feedbackText +=
          'Du hast dich zwar etwas an dieser Aufgabe aufgehalten, jedoch gewissenhaft und in Ruhe arbeiten zu wollen ist eine gute Voraussetzung fürs Studium!';

      feedbackText += ' Außerdem hast du ';
      if (hintRatio >= 0.8)
        feedbackText += 'einen Großteil oder alle Hilfen in Anspruch genommen.';
      else if (hintRatio >= 0.5)
        feedbackText += 'über die Hälfte der Hilfen in Anspruch genommen.';
      else if (hintRatio <= 0.5)
        feedbackText +=
          'weniger als die Hälfte oder gar keine Hilfen in Anspruch genommen.';

    } else {
      feedbackText += 'Du hast die Aufgabe leider nicht gelöst!\n';
      if (time < 10000)
        feedbackText +=
          'Du scheinst diese Aufgabe übersprungen zu haben. Bedenke: Dieses Thema ist ein fester Bestandteil des Studiums.';
      else if (time < 120000)
        feedbackText +=
          'Du hast dich nur sehr kurz damit beschäftigt. Du solltest dir mehr Zeit lassen um Aufgaben zu verstehen und lösen zu können. Bedenke: Dieses Thema ist ein fester Bestandteil des Studiums.';
      else if (time < 300000)
        feedbackText += 'Beschäftigt hast du dich mit dieser Aufgabe für weniger als fünf Minuten. Das ist ok, doch vielleicht hättest du Sie mit ein wenig mehr Geduld lösen können.';
      else if (time > 300000) feedbackText += 'Du hast dich sehr lange damit beschäftigt. Vielleicht liegt dir das Thema gar nicht. Bedenke, dass dieses Thema ein Pflichtthema im Studium ist!';

      feedbackText += ' Außerdem hast du ';
      if (hintRatio >= 0.8)
        feedbackText += 'einen Großteil oder alle Hilfen in Anspruch genommen.';
      else if (hintRatio >= 0.5)
        feedbackText += 'über die Hälfte der Hilfen in Anspruch genommen.';
      else if (hintRatio <= 0.5)
        feedbackText +=
          'weniger als die Hälfte oder gar keine Hilfen in Anspruch genommen.';
    }

    feedbackText +=
      '\n\nReflektiere darüber, ob dir dieses Thema Spaß gemacht, oder zumindest dein Interesse geweckt hat. Kannst du dir Vorstellen im Studium tiefer in das Thema einzutauchen?';
    return feedbackText;
  };
}

export default InteractiveTask;
