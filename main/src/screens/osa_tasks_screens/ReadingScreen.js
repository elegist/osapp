import {
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from 'react-native';
import React, {Component} from 'react';
import globalStyles from '../../styles/GlobalStyleSheet';
import FastImage from 'react-native-fast-image';

const MAX_TEXT_LENGTH = 100;

/**
 * View element of ReadingTask
 */
export class ReadingScreen extends Component {
  content = [];
  textArray = [];
  imagesArray = [];
  fadeAnimation = new Animated.Value(0); // Animated value for fade animation
  scaleAnimation = new Animated.Value(0); // Animated value for scale animation

  constructor(props) {
    super(props);
    this.initReadingTask(this.props.props.content);
    this.state = {
      currentIndex: 0, // Starting index for display
    };
  }

  componentDidMount() {
    this.fadeInText(); // Trigger the fade-in animation when the component mounts the first time
  }

  initReadingTask = contentArray => {
    console.log(contentArray);
    const startsWithImg = /^\[img\](.*)/;
    contentArray.forEach(element => {
      const matchImage = element.match(startsWithImg);
      if (matchImage && matchImage.length > 1) {
        const image = './src/assets/osa_images/' + matchImage[1];
        this.imagesArray.push(image);
      } else {
        this.textArray.push(element);
      }
    });
    console.log('Texts: ', this.textArray);
    console.log('Images: ', this.imagesArray);
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
      if (nextIndex == this.textArray.length - 1) this.props.onTextEnd(); // Callback provided by the parent component
    }
  };

  // Animations
  fadeInText = () => {
    this.scaleAnimation.setValue(0);
    this.fadeAnimation.setValue(0);
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
      transform: [{scale: this.scaleAnimation}],
    };
    return (
      <TouchableWithoutFeedback onPress={this.proceed}>
        <View style={globalStyles.fullContainer}>
          <View style={{ backgroundColor: 'white', width: '100%', height: '100%', position: 'absolute', borderRadius: 50 }}>
            <FastImage
              source={require('../../assets/osa_images/thm-haupteingang.jpg')}
              style={globalStyles.osaImage}
            />
          </View>
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
