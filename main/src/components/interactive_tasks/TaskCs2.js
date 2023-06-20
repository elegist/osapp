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
          index: 0,
          label: 'index: 0',
          color: '#FD4F4F',
          order: 0,
        },
        {
          index: 1,
          label: 'index: 1',
          color: '#D9D9D9',
          order: 1,
        },
        {
          index: 2,
          label: 'index: 2',
          color: '#FD4F4F',
          order: 2,
        },
        {
          index: 3,
          label: 'index: 3',
          color: '#D9D9D9',
          order: 3,
        },
        {
          index: 4,
          label: 'index: 4',
          color: '#FD4F4F',
          order: 4,
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

    console.log(JSON.stringify(newRectangles, null, 2));
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
            .map(rectangle => {
              const key = `${rectangle.id}-${rectangle.order}`;
              return (
                <Rectangle
                  key={key}
                  label={rectangle.label}
                  color={rectangle.color}
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
  label,
  color,
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
      context.startY = translateY.value;
      rotateZ.value = withTiming('4deg', {duration: 200});
      context.newOrder = order;
    },
    onActive(event, context) {
      translateY.value = event.translationY;
      const approxPosition = Math.floor(translateY.value);
      const moduloLeeway = 20;
      if (
        (Math.abs(approxPosition) >= elementHeight &&
          approxPosition % elementHeight <= moduloLeeway) ||
        approxPosition % 75 >= 75 - moduloLeeway
      ) {
        let newOrder;
        const moveByValue = Math.round(approxPosition / elementHeight);
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
          return {...data, order: context.newOrder, color: color};
        }
        if (data.order === context.newOrder) {
          return {...data, order: order, color: data.color};
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
      backgroundColor: color,
      elevation: withSpring(moving ? 8 : 0),
      transform: [{translateY: translateY.value}, {rotateZ: rotateZ.value}],
    };
  }, [moving, color]);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={animatedStyle}>
        <Text style={globalStyles.textParagraph}>{label}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};
