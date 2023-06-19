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

  updateRectangles = newRectangles => {
    this.setState({rectangles: newRectangles});
  };

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
          {this.state.rectangles
            .sort((a, b) => a.order - b.order)
            .map((rectangle, index) => {
              return (
                <Rectangle
                  key={index}
                  index={index}
                  label={rectangle.label}
                  order={rectangle.order}
                  previousRectangles={this.state.rectangles}
                  updateRectangles={this.updateRectangles}
                />
              );
            })}
        </View>
        {this.includeModal()}
      </View>
    );
  }
}

const Rectangle = ({
  index,
  label,
  order,
  previousRectangles,
  updateRectangles,
}) => {
  const elementHeight = 75;
  const [moving, setMoving] = useState(false);

  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue('0deg');

  const gestureHandler = useAnimatedGestureHandler({
    onStart(event, context) {
      runOnJS(setMoving)(true);
      context.rectangleOrder = order;
      context.startY = translateY.value;
      rotateZ.value = withTiming('4deg', {duration: 200});
    },
    onActive(event, context) {
      translateY.value = context.startY + event.translationY;
      const approxPosition = Math.floor(translateY.value);
      if (translateY.value !== 0 && approxPosition % elementHeight === 0) {
        let newOrder;
        const moveByValue = approxPosition / elementHeight;
        if (order + moveByValue <= 0) {
          newOrder = 0;
        } else if (order + moveByValue >= previousRectangles.length - 1) {
          newOrder = previousRectangles.length - 1;
        } else {
          newOrder = order + moveByValue;
        }
        context.newOrder = newOrder;
      }
    },
    onFinish(event, context) {
      runOnJS(setMoving)(false);
      translateY.value = withSpring(0);
      rotateZ.value = withTiming('0deg', {duration: 300});

      const newRectangles = previousRectangles.map(data => {
        if (data.order === order) {
          return {...data, order: context.newOrder};
        }
        if (data.order === context.newOrder) {
          return {...data, order: order};
        }

        return data;
      });

      runOnJS(updateRectangles)(newRectangles);
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
      elevation: withSpring(moving ? 8 : 0),
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
