import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/GlobalStyleSheet';
import InteractiveTaskBase from './InteractiveTaskBase';

export default class TaskCs1 extends InteractiveTaskBase {
  constructor(props) {
    super(props);

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
      <View style={style.taskWrapper}>
        <View style={style.codeWindow}>
          <TouchableOpacity
            disabled={this.props.submitted}
            style={style.helpButton}
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

        <View style={style.resultWindow}>
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

const style = StyleSheet.create({
  taskWrapper: {
    height: '90%',
    width: '80%',
    gap: 10,
  },
  codeWindow: {
    flex: 1,
    backgroundColor: '#ABABAB',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultWindow: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButton: {
    position: 'absolute',
    top: -20,
    right: -25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    elevation: 5,
    backgroundColor: '#F4DD08',
    borderRadius: 50,
  },
  closeButton: {
    position: 'absolute',
    top: -40,
    right: -40,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    elevation: 5,
    backgroundColor: '#dd4040',
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  modalContent: {
    maxWidth: '60%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    gap: 20,
  },
  rectangle: {
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
});
