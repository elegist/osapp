import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/GlobalStyleSheet';
import InteractiveTaskBase from './InteractiveTaskBase';

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
            <Text style={{...globalStyles.textCodeBold, color: '#dd4040'}}>
              if{' '}
            </Text>
            rectangle.
            <Text style={{...globalStyles.textCodeItalic, color: '#7ff54a'}}>
              index
            </Text>{' '}
            <Text style={{...globalStyles.textCodeBold, color: '#dd4040'}}>
              is{' '}
            </Text>
            even:
          </Text>

          <Text style={globalStyles.textCodeRegular}>
            <Text>
              rectangle.
              <Text style={{...globalStyles.textCodeItalic, color: '#7ff54a'}}>
                color{' '}
              </Text>
            </Text>
            <Text style={{...globalStyles.textCodeBold, color: '#dd4040'}}>
              is{' '}
            </Text>
            red
          </Text>
        </View>

        <View style={this.baseStyles.resultWindow}>
          {this.rectangles.map(rectangle => (
            <Rectangle
              key={rectangle.index}
              label={rectangle.label}
              submitted={this.props.submitted}
            />
          ))}
        </View>
        {this.includeModal()}
      </View>
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
      margin: 5,
      paddingVertical: 20,
      paddingHorizontal: 40,
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
