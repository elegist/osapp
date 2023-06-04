import {
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from 'react-native';
import React, {Component} from 'react';
import globalStyles from '../../styles/GlobalStyleSheet';

const MAX_TEXT_LENGTH = 100;

/**
 * View element of ReadingTask
 */
export class ReadingScreen extends Component {
  textArray = [];
  imagesArray = [];
  fadeAnimation = new Animated.Value(0); // Animated value for fade animation
  scaleAnimation = new Animated.Value(0); // Animated value for scale animation

  constructor(props) {
    super(props);
    this.textArray = this.splitText(this.props.text, MAX_TEXT_LENGTH);
    this.imagesArray = this.initImagesArray(this.props.images);
    this.state = {
      currentIndex: 0, // Starting index for display
    };
  }

  componentDidMount() {
    this.fadeInText(); // Trigger the fade-in animation when the component mounts the first time
  }

  initImagesArray = (images) => {
    const array = []
    images.forEach(element => {
      const image = '../src/assets/osa_images/' + element + '.jpg'
      array.push(image)
    });
    console.log(array);
    return array
  }

  /**
   * Splits given text into whole sentences with a max word count.
   * @param {String} text Text to be displayed
   * @param {Number} maxWordLength Max length of one sentence
   * @returns {Array} Array containing the split text
   */
  splitText = (text, maxWordLength) => {
    const sentences = text.match(/[^.!?]+[.!?]/g) || [];
    let currentSplit = '';
    const resultArray = [];

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      if (currentSplit.length + sentence.length > maxWordLength) {
        resultArray.push(currentSplit.trim());
        currentSplit = sentence + ' ';
      } else {
        currentSplit += sentence + ' ';
      }
    }

    if (currentSplit.trim().length > 0) {
      resultArray.push(currentSplit.trim());
    }

    return resultArray;
  };

  /**
   * Call this when user touches the screen. Iterates through text array
   */
  proceed = () => {
    const {currentIndex} = this.state;
    const nextIndex = currentIndex + 1;

    if (nextIndex < this.textArray.length) {
      this.fadeOutText(() => {
        this.setState({currentIndex: nextIndex}, () => {
          this.fadeInText();
        });
      });
      if(nextIndex == this.textArray.length - 1) this.props.onTextEnd(); // Callback provided by the parent component
    }
  };

  // Animations
  fadeInText = () => {
    this.scaleAnimation.setValue(0)
    this.fadeAnimation.setValue(0)
    Animated.parallel([
      Animated.timing(this.fadeAnimation, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(this.scaleAnimation, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.out(Easing.back()),
      }),
    ]).start();
  };

  fadeOutText = callback => {
    Animated.timing(this.fadeAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(callback);
  };

  render() {
    const {currentIndex} = this.state;
    const fadeStyle = {
      opacity: this.fadeAnimation,
      transform: [{ scale: this.scaleAnimation }],
    };
    return (
      <TouchableWithoutFeedback onPress={this.proceed}>
        <View style={globalStyles.fullContainer}>
          <Text style={globalStyles.textSecondary}>{this.props.topic}</Text>
          <Animated.View>
            <Animated.Text style={[globalStyles.textReadingTask, fadeStyle]}>
              {this.textArray[currentIndex]}
            </Animated.Text>
            {/* Additional UI elements related to ReadingTask */}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ReadingScreen;
