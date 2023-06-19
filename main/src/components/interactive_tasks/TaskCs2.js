import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import InteractiveTaskBase from './InteractiveTaskBase';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/GlobalStyleSheet';
import Animated, {
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

export default class TaskCs2 extends InteractiveTaskBase {
  constructor(props) {
    super(props);
    super.setDefaultState();
    this.state = {
      ...this.state,
      rectangles: [
        {
          order: 0,
          label: 'index: 0',
        },
        {
          order: 1,
          label: 'index: 1',
        },
        {
          order: 2,
          label: 'index: 2',
        },
        {
          order: 3,
          label: 'index: 3',
        },
        {
          order: 4,
          label: 'index: 4',
        },
      ],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.submitted !== this.props.submitted) {
      //TODO: evaluate the users solution here
    }
  }

  render() {
    return (
      <View style={this.baseStyles.taskWrapper}>
        <View style={this.baseStyles.codeWindow}>
          <TouchableOpacity
            disabled={this.props.submitted}
            style={this.baseStyles.helpButton}
            onPress={() => this.setState({modalVisible: true})}>
            <Icon name="question" size={40} color="white" />
          </TouchableOpacity>

          <Text style={globalStyles.textCodeRegular}>
            rectangles.
            <Text style={{...globalStyles.textCodeItalic, color: '#7ff54a'}}>
              sortByColor(red)
            </Text>
          </Text>
        </View>

        <View style={this.baseStyles.resultWindow}>
          {this.state.rectangles.map((rectangle, index) => {
            return (
              <Rectangle
                key={index}
                index={index}
                label={rectangle.label}
                order={rectangle.order}
              />
            );
          })}
        </View>
        {this.includeModal()}
      </View>
    );
  }
}

const Rectangle = ({index, label, order}) => {
  const elementHeight = 75;
  const [moving, setMoving] = useState(false);

  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue('0deg');

  const gestureHandler = useAnimatedGestureHandler({
    onStart(event, context) {
      runOnJS(setMoving)(true);
      context.rectangleOrder = order;
      context.startY = translateY.value;
      rotateZ.value = withTiming('5deg', {duration: 100});
    },
    onActive(event, context) {
      translateY.value = context.startY + event.translationY;
    },
    onFinish(event, context) {
      runOnJS(setMoving)(false);
      translateY.value = withSpring(context.startY);
      rotateZ.value = withTiming('0deg', {duration: 150});
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: order * elementHeight,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 40,
      borderRadius: 10,
      backgroundColor: '#D9D9D9',
      elevation: withSpring(moving ? 6 : 0),
      zIndex: moving ? 10 : 0,
      transform: [{translateY: translateY.value}, {rotateZ: rotateZ.value}],
    };
  }, [moving]);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={animatedStyle}>
        <Animated.View>
          <Text style={globalStyles.textParagraph}>{label}</Text>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};
