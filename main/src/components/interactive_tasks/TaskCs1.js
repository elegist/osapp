import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/GlobalStyleSheet';
import Rectangle from './Rectangle';

export default function TaskCs1({help}) {
  const [modalVisibile, setModalVisible] = useState(false);
  const [helpIndex, setHelpIndex] = useState(0);

  const taskData = [
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

  return (
    <View style={style.taskWrapper}>
      <View style={style.codeWindow}>
        <TouchableOpacity
          style={style.helpButton}
          onPress={() => setModalVisible(true)}>
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
        {taskData.map(rectangle => (
          <Rectangle key={rectangle.index} label={rectangle.label} />
        ))}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibile}
        onRequestClose={() => setModalVisible(false)}>
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <TouchableOpacity
              style={style.closeButton}
              onPress={() => setModalVisible(false)}>
              <Icon name="close" size={40} color="white"></Icon>
            </TouchableOpacity>
            <Text style={globalStyles.textParagraph}>{help[helpIndex]}</Text>
            <TouchableOpacity
              disabled={help.length - 1 === helpIndex}
              style={
                help.length - 1 === helpIndex
                  ? globalStyles.smallButtonDisabled
                  : globalStyles.smallButton
              }
              onPress={() => setHelpIndex(helpIndex + 1)}>
              <Text style={globalStyles.textSmallButton}>nächster Tipp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
});
