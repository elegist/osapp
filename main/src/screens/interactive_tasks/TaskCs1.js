import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/GlobalStyleSheet';
import InteractiveTaskBase from './InteractiveTaskBase';
import {Easing} from 'react-native-reanimated';

export default class TaskCs1 extends InteractiveTaskBase {
  constructor(props) {
    super(props);
    super.setDefaultState();

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
    this.setState({modalVisible: true});
  };

  render() {
    return (
      <Animated.View
        style={{
          ...this.baseStyles.taskWrapper,
          opacity: this.fadeAnim,
        }}>
        <View style={this.baseStyles.codeWindow}>
          <TouchableOpacity
            disabled={this.props.submitted}
            style={this.baseStyles.helpButton}
            onPress={this.handlePress}>
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
            />
          ))}
        </Animated.View>
        {this.includeModal()}
      </Animated.View>
    );
  }
}

const Rectangle = ({label, submitted}) => {
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
      disabled={submitted}
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
