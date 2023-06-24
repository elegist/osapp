import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import React, {createRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/GlobalStyleSheet';
import InteractiveTaskBase from './InteractiveTaskBase';
import {Easing} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import tapImage from '../../assets/misc/tap.webp';

export default class TaskCs1 extends InteractiveTaskBase {
  tapHintAnim = new Animated.Value(1);
  blendInTapHintAnim = new Animated.Value(0);

  constructor(props) {
    super(props);
    super.setDefaultState();

    this.containerRef = createRef();

    this.state = {
      ...this.state,
      tutorialVisible: true,
      tutorialOverlayPosition: null,
      tutorialOverlaySize: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
    };

    this.rectangles = [
      {
        index: 0,
        label: 'index: 0',
      },
      {
        index: 1,
        label: 'index: 1',
      },
      {
        index: 2,
        label: 'index: 2',
      },
      {
        index: 3,
        label: 'index: 3',
      },
      {
        index: 4,
        label: 'index: 4',
      },
    ];

    this.fadeAnim = new Animated.Value(0);
    this.moveAnim = new Animated.Value(25);
    this.fadeAnim2 = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(this.blendInTapHintAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.tapHintAnim, {
            toValue: 0.8,
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
    ]).start();

    Animated.sequence([
      Animated.timing(this.fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.ease,
      }),

      Animated.parallel([
        Animated.timing(this.fadeAnim2, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(this.moveAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]),
    ]).start();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.submitted !== this.props.submitted) {
      //TODO: evaluate the users solution here
    }
  }

  handlePress = () => {
    this.setState({modalVisible: true, tutorialVisible: false});
    this.props.activateButton();
  };

  handleContainerLayout = () => {
    const {width, height} = Dimensions.get('window');
    this.containerRef.current.measureInWindow((x, y) => {
      this.setState({
        tutorialOverlayPosition: {top: y, left: x},
      });
    });
  };

  render() {
    const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
    const animateTapStyle = {
      opacity: this.blendInTapHintAnim,
      transform: [{scale: this.tapHintAnim}],
    };

    return (
      <Animated.View
        ref={this.containerRef}
        onLayout={this.handleContainerLayout}
        style={{
          ...this.baseStyles.taskWrapper,
          opacity: this.fadeAnim,
        }}>
        <View style={{...this.baseStyles.codeWindow, zIndex: 10}}>
          <TouchableOpacity
            disabled={this.props.submitted}
            style={this.baseStyles.helpButton}
            onPress={this.handlePress}>
            <Icon name="question" size={36} color="white" />
            {this.state.tutorialVisible && (
              <AnimatedFastImage
                style={[
                  {
                    width: 60,
                    height: 60,
                    position: 'absolute',
                    top: 25,
                    right: -10,
                  },
                  animateTapStyle,
                ]}
                source={tapImage}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
          </TouchableOpacity>

          <Text style={globalStyles.textCodeRegular}>
            <Text
              style={{...globalStyles.textCodeBold, color: this.colors.red}}>
              if{' '}
            </Text>
            rectangle.
            <Text
              style={{
                ...globalStyles.textCodeItalic,
                color: this.colors.green,
              }}>
              index
            </Text>{' '}
            <Text
              style={{...globalStyles.textCodeBold, color: this.colors.red}}>
              is{' '}
            </Text>
            even:
          </Text>

          <Text style={{...globalStyles.textCodeRegular, paddingLeft: 20}}>
            <Text>
              rectangle.
              <Text
                style={{
                  ...globalStyles.textCodeItalic,
                  color: this.colors.green,
                }}>
                color{' '}
              </Text>
            </Text>
            <Text
              style={{...globalStyles.textCodeBold, color: this.colors.red}}>
              is{' '}
            </Text>
            red
          </Text>
        </View>

        <Animated.View
          style={{
            ...this.baseStyles.resultWindow,
            opacity: this.fadeAnim2,
            transform: [{translateY: this.moveAnim}],
          }}>
          {this.rectangles.map(rectangle => (
            <Rectangle
              key={rectangle.index}
              label={rectangle.label}
              submitted={this.props.submitted}
              tutorialVisible={this.state.tutorialVisible}
            />
          ))}
        </Animated.View>
        {this.includeModal()}
        {this.state.tutorialOverlayPosition && this.state.tutorialVisible && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              top: -this.state.tutorialOverlayPosition.top,
              left: -this.state.tutorialOverlayPosition.left,
              width: this.state.tutorialOverlaySize.width,
              height: this.state.tutorialOverlaySize.height,
            }}
          />
        )}
      </Animated.View>
    );
  }
}

const Rectangle = ({label, submitted, tutorialVisible}) => {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(!pressed);
  };

  const style = StyleSheet.create({
    rectangle: {
      width: '50%',
      height: '15%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
      borderRadius: 10,
    },
  });

  return (
    <TouchableOpacity
      disabled={submitted || tutorialVisible}
      style={
        pressed
          ? {...style.rectangle, backgroundColor: '#FD4F4F'}
          : {...style.rectangle, backgroundColor: '#D9D9D9'}
      }
      onPress={handlePress}>
      <Text style={globalStyles.textParagraph}>{label}</Text>
    </TouchableOpacity>
  );
};
