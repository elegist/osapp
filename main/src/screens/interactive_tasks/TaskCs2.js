import {
  Text,
  View,
  TouchableOpacity,
  Animated as ReactAnimated,
} from 'react-native';
import React, {useState} from 'react';
import InteractiveTaskBase from './InteractiveTaskBaseScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles, {getResponsiveSizing} from '../../styles/GlobalStyleSheet';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
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

    this.fadeAnim = new ReactAnimated.Value(0);
    this.moveAnim = new ReactAnimated.Value(25);
    this.fadeAnim2 = new ReactAnimated.Value(0);
  }

  componentDidMount() {
    ReactAnimated.sequence([
      ReactAnimated.timing(this.fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.ease,
      }),

      ReactAnimated.parallel([
        ReactAnimated.timing(this.fadeAnim2, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        ReactAnimated.timing(this.moveAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]),
    ]).start();
  }

  // check if user's answer is correct before unmounting
  componentWillUnmount() {
    let taskSuccess = true;
    this.state.rectangles.forEach(rectangle => {
      if (rectangle.order <= 2 && rectangle.color != '#FD4F4F') {
        taskSuccess = false;
      } else if (rectangle.order > 2 && rectangle.color != '#D9D9D9') {
        taskSuccess = false;
      }
    });
    this.props.task.setTaskSuccess(taskSuccess)
  }

  updateRectangles = newRectangles => {
    this.setState({rectangles: newRectangles});
  };

  render() {
    return (
      <View style={this.baseStyles.taskWrapper}>
        <ReactAnimated.View
          style={{...this.baseStyles.codeWindow, opacity: this.fadeAnim}}>
          <TouchableOpacity
            disabled={this.props.submitted}
            style={this.baseStyles.helpButton}
            onPress={() => this.setState({modalVisible: true})}>
            <Icon name="question" size={36} color="white" />
          </TouchableOpacity>

          <Text style={globalStyles.textCodeRegular}>
            rectangles.
            <Text
              style={{
                ...globalStyles.textCodeItalic,
                color: this.colors.green,
              }}>
              sortByColor(red)
            </Text>
          </Text>
        </ReactAnimated.View>

        <ReactAnimated.View
          style={{
            ...this.baseStyles.resultWindow,
            opacity: this.fadeAnim2,
            transform: [{translateY: this.moveAnim}],
          }}>
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
        </ReactAnimated.View>
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
  const elementHeight = getResponsiveSizing(54);
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
      top: order * elementHeight + elementHeight / 4,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      height: elementHeight - 10,
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
