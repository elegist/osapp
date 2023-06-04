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
  contentArray = [];
  fadeAnimation = new Animated.Value(0);
  scaleAnimation = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.initReadingTask(this.props.props.content);
    this.state = {
      currentIndex: 0, // Starting index for display
      currentImage: '',
    };
  }

  componentDidMount() {
    this.fadeInText(); // Trigger the fade-in animation when the component mounts the first time
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
        entry['value'] = '../../assets/osa_images/' + matchImage[1];
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
          // TODO: logic to cycle through images
          if (this.contentArray[nextIndex]['isImage']) {
            console.log('Is Image: ', this.contentArray[nextIndex]['value']);
            this.setState({
              currentImage: this.contentArray[nextIndex]['value'],
            });
          } else {
            this.fadeInText();
          }
          if (nextIndex === this.contentArray.length - 1)
            this.props.onTextEnd(); // Callback provided by the parent component
        });
      });
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
    const {currentIndex, currentImage} = this.state;
    const fadeStyle = {
      opacity: this.fadeAnimation,
      transform: [{scale: this.scaleAnimation}],
    };
    return (
      <TouchableWithoutFeedback onPress={this.proceed}>
        <View style={globalStyles.fullContainer}>
          {this.contentArray[currentIndex]['isImage'] && (
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: '100%',
                position: 'absolute',
                borderRadius: 50,
                zIndex: -1,
              }}>
              <FastImage
                source={{uri: this.contentArray[currentIndex]['value']}}
                style={globalStyles.osaImage}
              />
            </View>
          )}
          <Text style={globalStyles.textSecondary}>{this.props.topic}</Text>
          <Animated.View>
            <Animated.Text style={[globalStyles.textReadingTask, fadeStyle]}>
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
