import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/GlobalStyleSheet';

export default function TaskCs1() {
  return (
    <View style={style.taskWrapper}>
      <View style={style.codeWindow}>
        <TouchableOpacity style={style.helpButton}>
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
      <View style={style.resultWindow}></View>
    </View>
  );
}

const style = StyleSheet.create({
  taskWrapper: {
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
    flex: 2,
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
});
