import {Text, View, TouchableOpacity, Animated} from 'react-native';
import React, {useState} from 'react';
import InteractiveTaskBase from './InteractiveTaskBaseScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/GlobalStyleSheet';
import { Easing } from 'react-native-reanimated';

export default class TaskCs3 extends InteractiveTaskBase {
  constructor(props) {
    super(props);
    super.setDefaultState();
    this.state = {
      ...this.state,
      rectangles: [
        {
          index: 0,
          color: '#D9D9D9',
        },
        {
          index: 1,
          color: '#D9D9D9',
        },
        {
          index: 2,
          color: '#D9D9D9',
        },
        {
          index: 3,
          color: '#D9D9D9',
        },
        {
          index: 4,
          color: '#D9D9D9',
        },
        {
          index: 5,
          color: '#D9D9D9',
        },
        {
          index: 6,
          color: '#D9D9D9',
        },
        {
          index: 7,
          color: '#D9D9D9',
        },
        {
          index: 8,
          color: '#D9D9D9',
        },
      ],
    };
    this.fadeAnim = new Animated.Value(0);
    this.moveAnim = new Animated.Value(25);
    this.fadeAnim2 = new Animated.Value(0);
  }

  componentDidMount() {
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

  updateRectangles = newRectangles => {
    this.setState({rectangles: newRectangles});
  };

  // check if user's answer is correct before unmounting
  componentWillUnmount() {
    let taskSuccess = true;
    this.state.rectangles.forEach(rectangle => {
      if (rectangle.index % 2 == 0 && rectangle.color != "#86B300") {
        taskSuccess = false;
      } else if (rectangle.index % 2 != 0 && rectangle.color != "#FD4F4F") {
        taskSuccess = false;
      }
    });
    this.props.task.setTaskSuccess(taskSuccess);
  }

  render() {
    return (
      <View style={this.baseStyles.taskWrapper}>
        <Animated.View
          style={{...this.baseStyles.codeWindow, opacity: this.fadeAnim}}>
          <TouchableOpacity
            disabled={this.props.submitted}
            style={this.baseStyles.helpButton}
            onPress={() => this.setState({modalVisible: true})}>
            <Icon name="question" size={36} color="white" />
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
              index{' '}
            </Text>
            % 2{' '}
            <Text
              style={{...globalStyles.textCodeBold, color: this.colors.red}}>
              is{' '}
            </Text>
            0:
          </Text>
          <Text style={{...globalStyles.textCodeRegular, paddingLeft: 20}}>
            rectangle.
            <Text
              style={{
                ...globalStyles.textCodeItalic,
                color: this.colors.green,
              }}>
              color{' '}
            </Text>
            <Text
              style={{...globalStyles.textCodeBold, color: this.colors.red}}>
              is{' '}
            </Text>
            green
          </Text>

          <Text style={globalStyles.textCodeRegular}>
            <Text
              style={{...globalStyles.textCodeBold, color: this.colors.red}}>
              else if{' '}
            </Text>
            rectangle.
            <Text
              style={{
                ...globalStyles.textCodeItalic,
                color: this.colors.green,
              }}>
              index{' '}
            </Text>
            % 2{' '}
            <Text
              style={{...globalStyles.textCodeBold, color: this.colors.red}}>
              is not{' '}
            </Text>
            0:
          </Text>
          <Text style={{...globalStyles.textCodeRegular, paddingLeft: 20}}>
            rectangle.
            <Text
              style={{
                ...globalStyles.textCodeItalic,
                color: this.colors.green,
              }}>
              color{' '}
            </Text>
            <Text
              style={{...globalStyles.textCodeBold, color: this.colors.red}}>
              is{' '}
            </Text>
            red
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            ...this.baseStyles.resultWindow,
            opacity: this.fadeAnim2,
            transform: [{translateY: this.moveAnim}],
          }}>
          <RectangleContainer
            rectangles={this.state.rectangles}
            updateRectangles={this.updateRectangles}
          />
        </Animated.View>
        {this.includeModal()}
      </View>
    );
  }
}

const Rectangle = ({data, rectangles, updateRectangles}) => {
  const [colorIndex, setColorIndex] = useState(1);
  const colors = ['#D9D9D9', '#FD4F4F', '#86B300'];

  const handlePress = () => {
    if (colorIndex < colors.length - 1) {
      setColorIndex(colorIndex + 1);
    } else {
      setColorIndex(0);
    }

    const newRectangles = rectangles.map((rect, index) => {
      if (data.index === rect.index) {
        return {...rect, color: colors[colorIndex]};
      }

      return rect;
    });

    updateRectangles(newRectangles);
    // const newRectangles = rectangles.map((entry, index) => {
    //   return {...entry, color: '#FF0000'};
    // });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        width: '33.33%',
        backgroundColor: data.color,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={globalStyles.textParagraph}>index: {data.index}</Text>
    </TouchableOpacity>
  );
};

const RectangleContainer = ({rectangles, updateRectangles}) => {
  const rows = [];

  for (let i = 0; i < rectangles.length; i += 3) {
    const row = rectangles.slice(i, i + 3);
    rows.push(row);
  }

  return (
    <View style={{flexDirection: 'column', gap: 10, alignSelf: 'center'}}>
      {rows.map((row, index) => {
        return (
          <View
            key={index}
            style={{flexDirection: 'row', gap: 10, alignSelf: 'center'}}>
            {row.map(item => {
              return (
                <Rectangle
                  key={item.index}
                  data={item}
                  rectangles={rectangles}
                  updateRectangles={updateRectangles}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};
