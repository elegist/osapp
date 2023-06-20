import {View, Animated, TouchableWithoutFeedback, Easing} from 'react-native';
import React, {Component} from 'react';
import globalStyles from '../../styles/GlobalStyleSheet';
import TaskManager from '../../container/TaskManager';
import ImageMapper from '../helper/ImageMapper';
import FastImage from 'react-native-fast-image';
import swipeImage from '../../assets/misc/swipe_up.webp';
import tapImage from '../../assets/misc/tap.webp';

/**
 * View element of ReadingTask
 */
export class ReadingScreen extends Component {
  taskManager = TaskManager.getInstance();
  contentArray = [];
  // text animations
  fadeTextAnim = new Animated.Value(0);
  scaleTextAnim = new Animated.Value(1);
  swipeTextAnim = new Animated.Value(0);
  // card image animations
  fadeImageAnim = new Animated.Value(0);
  pulsateImageAnim = new Animated.Value(1);
  backgroundColorAnim = new Animated.Value(0);
  // hint animations
  swipeHintAnim = new Animated.Value(0);
  blendInSwipeHintAnim = new Animated.Value(0);

  tapHintAnim = new Animated.Value(1);
  blendInTapHintAnim = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.initReadingTask(this.props.props.content);
    this.state = {
      currentIndex: 0,
      currentImage: '',
      imageIsDisplayedOnly: false,
      tapHintWasDisplayed: false,
    };
  }

  componentDidMount() {
    this.fadeInText();
    // Check if this is the first screen to display swipe hint animation
    if (this.taskManager.getUsersOverallProgress() == 0) {
      this.startSwipeHintAnim();
    }
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

    this.stopSwipeHintAnim();

    if (nextIndex < this.contentArray.length) {
      this.fadeOutText(() => {
        this.setState(
          {
            currentIndex: nextIndex,
            firstScreen: false,
          },
          () => {
            if (this.contentArray[nextIndex]['isImage']) {
              this.setState({
                currentImage: this.contentArray[nextIndex]['value'],
                imageIsDisplayedOnly: true,
              });
              this.fadeInImage();
            } else {
              this.setState({
                imageIsDisplayedOnly: false,
              });
              this.stopPulsatingImage();
              this.fadeInText();
            }
          },
        );
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
    const {currentIndex} = this.state;
    const previousIndex = currentIndex - 1;

    if (previousIndex >= 0 && previousIndex < this.contentArray.length) {
      this.fadeOutText(() => {
        this.setState({currentIndex: previousIndex}, () => {
          if (this.contentArray[previousIndex]['isImage']) {
            this.backgroundColorAnim.setValue(0);
            this.fadeImageAnim.setValue(0);
            this.goBack();

            /*             this.setState({
              currentImage: this.contentArray[previousIndex]['value'],
            });
            this.fadeInImage(); */
          } else {
            this.setState({
              imageIsDisplayedOnly: false,
            });
            this.fadeInText();
          }
        });
      }, true);
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

  /**
   * Fades out the current text to make room for the next one
   * @param {Function} callback Call anything after animation finishes
   * @param {Boolean} reverseSwipe default = false; swipe animation plays forwards, pass true for reverse animation
   */
  fadeOutText = (callback, reverseSwipe = false) => {
    const swipeTo = reverseSwipe ? 600 : -600;
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
        toValue: swipeTo,
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
    ]).start(this.startPulsatingImage());
  };

  makeImageTransparent = () => {
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
  };

  startPulsatingImage = () => {
    if (
      this.taskManager.getUsersOverallProgress() == 0 &&
      !this.state.tapHintWasDisplayed
    ) {
      this.tapHintAnimSequence = Animated.sequence([
        Animated.delay(3800),
        Animated.timing(this.blendInTapHintAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(this.tapHintAnim, {
              toValue: .9,
              duration: 650,
              useNativeDriver: true,
              easing: Easing.cubic,
            }),
            Animated.timing(this.tapHintAnim, {
              toValue: 1,
              duration: 650,
              useNativeDriver: true,
            }),
          ]),
        ),
      ]);
      this.tapHintAnimSequence.start();
    } else {
      Animated.sequence([
        Animated.delay(5000),
        Animated.loop(
          Animated.sequence([
            Animated.timing(this.pulsateImageAnim, {
              toValue: 0.99,
              duration: 650,
              useNativeDriver: true,
              easing: Easing.bounce,
            }),
            Animated.timing(this.pulsateImageAnim, {
              toValue: 1,
              duration: 650,
              useNativeDriver: true,
            }),
          ]),
        ),
      ]).start();
    }
  };

  stopPulsatingImage = () => {
    this.state.tapHintWasDisplayed = true;
    if(this.tapHintAnimSequence) {
      this.tapHintAnimSequence.stop();
    }
    this.blendInTapHintAnim.setValue(0);
    this.pulsateImageAnim.stopAnimation();
  };

  startSwipeHintAnim = () => {
    this.swipeHintAnimSequence = Animated.sequence([
      Animated.delay(5000),
      Animated.timing(this.blendInSwipeHintAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.delay(50),
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.swipeHintAnim, {
            toValue: -40,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.cubic,
          }),
          Animated.delay(1000),
          Animated.timing(this.swipeHintAnim, {
            toValue: 0,
            duration: 1,
            useNativeDriver: true,
          }),
        ]),
      ),
    ]);

    this.swipeHintAnimSequence.start();
  };

  stopSwipeHintAnim = () => {
    if (this.swipeHintAnimSequence) {
      this.swipeHintAnimSequence.stop();
    }
    this.blendInSwipeHintAnim.setValue(0);
  };

  render() {
    const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
    const {currentIndex, currentImage, imageIsDisplayedOnly, firstScreen} =
      this.state;
    const animTextStyle = {
      opacity: this.fadeTextAnim,
      transform: [
        {scale: this.scaleTextAnim},
        {translateY: this.swipeTextAnim},
      ],
    };
    const animImageStyle = {
      opacity: this.fadeImageAnim,
      transform: [{scale: this.pulsateImageAnim}],
    };
    const backgroundColorStyle = {
      backgroundColor: this.backgroundColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['transparent', '#80ba24'], // Initial and final background colors
      }),
    };
    const animateSwipeStyle = {
      opacity: this.blendInSwipeHintAnim,
      transform: [{translateY: this.swipeHintAnim}],
    };
    const animateTapStyle = {
      opacity: this.blendInTapHintAnim,
      transform: [{scale: this.tapHintAnim}],
    };
    return (
      <TouchableWithoutFeedback
        onPress={e => {
          if (imageIsDisplayedOnly) {
            this.proceed();
            this.makeImageTransparent();
          }
        }}
        onPressIn={e => (this.touchY = e.nativeEvent.pageY)}
        onPressOut={e => {
          const touchDifference = this.touchY - e.nativeEvent.pageY;
          const touchThreshold = 20;

          if (touchDifference > touchThreshold && !imageIsDisplayedOnly)
            this.proceed();
          else if (touchDifference < -touchThreshold && !imageIsDisplayedOnly)
            this.goBack();
        }}>
        <View style={globalStyles.fullContainer}>
          <AnimatedFastImage
            style={[
              {
                width: 60,
                height: 60,
                position: 'absolute',
                zIndex: 10,
                top: 80,
                right: 30,
              },
              animateSwipeStyle,
            ]}
            source={swipeImage}
            resizeMode={FastImage.resizeMode.contain}
          />
          <AnimatedFastImage
            style={[
              {
                width: 60,
                height: 60,
                position: 'absolute',
                zIndex: 10,
                bottom: 80,
                left: 80,
              },
              animateTapStyle,
            ]}
            source={tapImage}
            resizeMode={FastImage.resizeMode.contain}
            pointerEvents={'none'}
          />

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
