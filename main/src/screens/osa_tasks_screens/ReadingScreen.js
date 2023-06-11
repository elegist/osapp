import {
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Easing,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import globalStyles from '../../styles/GlobalStyleSheet';
import FastImage from 'react-native-fast-image';
import ImageMapper from '../helper/ImageMapper';

const MAX_TEXT_LENGTH = 100;

/**
 * View element of ReadingTask
 */
export class ReadingScreen extends Component {
  contentArray = [];
  fadeTextAnim = new Animated.Value(0);
  scaleTextAnim = new Animated.Value(1);
  fadeImageAnim = new Animated.Value(0);
  backgroundColorAnim = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.initReadingTask(this.props.props.content);
    this.state = {
      currentIndex: 0,
      currentImage: '',
    };
  }

  componentDidMount() {
    this.fadeInText();
  }

  /**
   * Takes in the content prop and populates this instance with data
   * @param {Array} taskContents Collection of the task's text and images
   */
  initReadingTask = taskContents => {
    const startsWithImg = /^\[img\](.*)/;
    taskContents.forEach(element => {
      const entry = {
        isImage: false,
        value: '',
      };
      const matchImage = element.match(startsWithImg);
      if (matchImage && matchImage.length > 1) {
        entry['isImage'] = true;
        const imageName = matchImage[1];
        entry['value'] = ImageMapper.getImagePath(imageName);
      } else {
        entry['value'] = element;
      }
      this.contentArray.push(entry);
    });
  };

  /**
   * Call this when user touches the screen. Iterates through text array
   */
  proceed = () => {
    const {currentIndex} = this.state;
    const nextIndex = currentIndex + 1;

    if (nextIndex < this.contentArray.length) {
      this.fadeOutText(() => {
        this.setState({currentIndex: nextIndex}, () => {
          if (this.contentArray[nextIndex]['isImage']) {
            this.setState({
              currentImage: this.contentArray[nextIndex]['value'],
            });
            this.fadeInImage();
          } else {
            this.makeImageTransparent();
            this.fadeInText();
          }
        });
      });
    }

    if (nextIndex === this.contentArray.length) {
      this.fadeOutText(this.props.nextTask);
    }
  };

  // Animations
  fadeInText = () => {
    this.fadeTextAnim.setValue(0);
    this.scaleTextAnim.setValue(1);
    Animated.sequence([
      Animated.delay(200),
      Animated.timing(this.fadeTextAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]).start();
  };

  fadeOutText = callback => {
    Animated.parallel([
      Animated.timing(this.fadeTextAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(this.scaleTextAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]).start(callback);
  };

  fadeInImage = () => {
    this.fadeImageAnim.setValue(0);
    Animated.timing(this.fadeImageAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start(() => {
      // Animation completed, update background color
      this.updateBackgroundColor();
    });
  };
  updateBackgroundColor = () => {
    Animated.timing(this.backgroundColorAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  makeImageTransparent = () => {
    Animated.timing(this.fadeImageAnim, {
      toValue: 0.2,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  render() {
    const {currentIndex, currentImage} = this.state;
    const animTextStyle = {
      opacity: this.fadeTextAnim,
      transform: [{scale: this.scaleTextAnim}],
    };
    const animImageStyle = {
      opacity: this.fadeImageAnim,
    };
    const backgroundColorStyle = {
      backgroundColor: this.backgroundColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['transparent', '#80ba24'], // Initial and final background colors
      }),
    };
    return (
      <TouchableWithoutFeedback onPress={this.proceed}>
        <View style={globalStyles.fullContainer}>
          {currentImage && (
            <Animated.View
              style={[
                {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  borderRadius: 50,
                  zIndex: -1,
                },
                backgroundColorStyle, // Apply background color animation here
              ]}>
              <Animated.Image
                source={currentImage}
                style={[globalStyles.osaImage, animImageStyle]}
              />
            </Animated.View>
          )}
          <Text style={globalStyles.textSecondary}>{this.props.topic}</Text>
          <Animated.View>
            <Animated.Text
              style={[globalStyles.textReadingTask, animTextStyle]}>
              {this.contentArray[currentIndex]['value']}
            </Animated.Text>
            {/* Additional UI elements related to ReadingTask */}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ReadingScreen;
