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
    let timeInSeconds = this.getTimeElapsed() / 1000;
    let hintRatio = this.getHintRatio();

    let feedbackText = '';

    if (this.getTaskSuccess()) {
      feedbackText += this.#addSuccessText(timeInSeconds);
      feedbackText += this.#addHintsText(hintRatio);
    } else {
      feedbackText += this.#addFailureText(timeInSeconds);
      feedbackText += this.#addHintsText(hintRatio);
    }

    feedbackText +=
      '\n\nReflektiere darüber, ob dir dieses Thema Spaß gemacht, oder zumindest dein Interesse geweckt hat. Kannst du dir vorstellen, im Studium tiefer in das Thema einzutauchen?';
    return feedbackText;
  };

  #addSuccessText = timeInSeconds => {
    let successText = 'Du hast die Aufgabe ';
    if (timeInSeconds < 10)
      successText +=
        'sehr schnell gelöst. Das scheint genau dein Thema zu sein!';
    else if (timeInSeconds < 60)
      successText += 'in weniger als einer Minute gelöst. Sehr gut gemacht!';
    else if (timeInSeconds < 120)
      successText += 'in weniger als zwei Minuten gelöst. Gut gemacht!';
    else if (timeInSeconds < 300)
      successText +=
        'nach einiger Zeit gelöst. Es ist gut, sich Zeit für eine Aufgabe zu nehmen, um sie gründlich zu verstehen!';
    else if (timeInSeconds > 300)
      successText +=
        'gelöst, obwohl du etwas länger gebraucht hast, um sie zu verstehen. Es ist wichtig, sich Zeit zu nehmen, um eine Aufgabe vollständig zu erfassen. Überlege jedoch, ob das Thema wirklich deinen Interessen entspricht.';
    return successText;
  };

  #addFailureText = timeInSeconds => {
    let failText = 'Du hast ';
    if (timeInSeconds < 10)
      failText +=
        'die Aufgabe anscheinend übersprungen. Bedenke: Dieses Thema ist ein fester Bestandteil des Studiums.';
    else if (timeInSeconds < 60)
      failText +=
        'dich nur kurz mit dieser Aufgabe beschäftigt. Nimm dir ruhig mehr Zeit, um Aufgaben zu verstehen und zu lösen. Bedenke: Dieses Thema ist ein fester Bestandteil des Studiums.';
    else if (timeInSeconds < 300)
      failText +=
        'dich zwar etwas mit dieser Aufgabe beschäftigt, aber vielleicht hättest du mit etwas mehr Geduld eine Lösung finden können. Bedenke: Dieses Thema ist ein fester Bestandteil des Studiums.';
    else if (timeInSeconds > 300)
      failText +=
        'dich sehr lange mit dieser Aufgabe beschäftigt, ohne sie zu lösen. Vielleicht liegt dir das Thema gar nicht. Bedenke, dass dieses Thema ein fester Bestandteil des Studiums ist!';
    return failText;
  };

  #addHintsText = hintRatio => {
    let hintsText = '';
    hintsText += ' Von den Hilfen hast du ';
    if (hintRatio == 1) hintsText += 'alle in Anspruch genommen.';
    else if (hintRatio >= 0.8)
      hintsText += 'einen Großteil in Anspruch genommen.';
    else if (hintRatio >= 0.5)
      hintsText += 'über die Hälfte in Anspruch genommen.';
    else if (hintRatio > 0) hintsText += 'nur sehr wenige Anspruch genommen.';
    else if (hintRatio == 0) hintsText += 'gar keine in Anspruch genommen.';
    return hintsText;
  };
}

export default InteractiveTask;
