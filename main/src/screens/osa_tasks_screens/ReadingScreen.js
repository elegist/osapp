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

/**
 * View element of ReadingTask
 */
export class ReadingScreen extends Component {
  contentArray = [];
  fadeTextAnim = new Animated.Value(0);
  scaleTextAnim = new Animated.Value(1);
  swipeTextAnim = new Animated.Value(0);
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
   * Called when the user swipes up, proceeds to next text or finished task after last one
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
            this.fadeInText();
          }
        });
      });
    }

    if (nextIndex === this.contentArray.length) {
      this.fadeOutText(this.props.nextTask);
    }
  };

  /**
   * Called when the user swipes down
   */
  goBack = () => {
    const { currentIndex } = this.state;
    const previousIndex = currentIndex - 1;
  
    if (previousIndex >= 0 && previousIndex < this.contentArray.length) {
      this.fadeOutText(() => {
        this.setState({ currentIndex: previousIndex }, () => {
          if (this.contentArray[previousIndex]['isImage']) {
            this.setState({
              currentImage: this.contentArray[previousIndex]['value'],
            });
            this.fadeInImage();
          } else {
            this.fadeInText();
          }
        });
      });
    }
  };
  
  // Animations
  fadeInText = () => {
    this.swipeTextAnim.setValue(0);
    this.scaleTextAnim.setValue(1);
    Animated.parallel([
      Animated.timing(this.fadeTextAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.easeIn,
      }),
    ]).start();
  };

  fadeOutText = callback => {
    Animated.parallel([
      Animated.timing(this.fadeTextAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.easeIn,
      }),
      Animated.timing(this.scaleTextAnim, {
        toValue: 0,
        duration: 750,
        useNativeDriver: true,
        easing: Easing.easeOut,
      }),
      Animated.timing(this.swipeTextAnim, {
        toValue: -600,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.easeOut,
      }),
    ]).start(callback);
  };

  fadeInImage = () => {
    this.backgroundColorAnim.setValue(0);
    this.fadeImageAnim.setValue(0);
  
    Animated.sequence([
      // 1st part of the animation (fading in)
      Animated.parallel([
        Animated.timing(this.fadeImageAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]),
      Animated.delay(450), // Delay before the image goes green
    ]).start(() => {
      this.proceed();
      // 2nd part of the animation (fading out to half green)
      Animated.parallel([
        Animated.timing(this.fadeImageAnim, {
          toValue: 0.2,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.easeIn,
        }),
        Animated.timing(this.backgroundColorAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
          easing: Easing.easeIn,
        }),
      ]).start();
    });
  };  

  render() {
    const {currentIndex, currentImage} = this.state;
    const animTextStyle = {
      opacity: this.fadeTextAnim,
      transform: [
        {scale: this.scaleTextAnim},
        {translateY: this.swipeTextAnim},
      ],
    };
    const animImageStyle = {
      opacity: this.fadeImageAnim
    };
    const backgroundColorStyle = {
      backgroundColor: this.backgroundColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['transparent', '#80ba24'], // Initial and final background colors
      }),
    };
    return (
      <TouchableWithoutFeedback>
        <View
          onTouchStart={e => (this.touchY = e.nativeEvent.pageY)}
          onTouchEnd={e => {
            if (this.touchY - e.nativeEvent.pageY > 20) this.proceed();
            else if (this.touchY - e.nativeEvent.pageY < -20)
              this.goBack();
          }}
          style={globalStyles.fullContainer}>
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
