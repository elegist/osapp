import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../styles/GlobalStyleSheet';

export default function RadioButton({choices, onSelect}) {
  const [userChoice, setUserChoice] = useState(null);

  const onSelectHandler = choice => {
    onSelect(choice);
    setUserChoice(choice);
  };

  return (
    <View>
      {choices.map((choice, index) => {
        return (
          <TouchableOpacity
            style={styles.radioButtonContainer}
            onPress={() => onSelectHandler(choice)}
            key={index}>
            <View style={styles.radioButton}>
              {choice === userChoice && (
                <Icon style={styles.check} name="check-circle"></Icon>
              )}
            </View>
            <Text style={{...globalStyles.textChoiceButton, marginLeft: 8}}>
              {choice}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  radioButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 12,
    alignItems: 'center',
    alignSelf: 'center',
    width: '40%',
  },
  radioButton: {
    display: 'flex',
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#8CBA45',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  check: {
    color: '#8CBA45',
    fontSize: 20,
  },
  radioButtonLabel: {
    marginHorizontal: 8,
  },
});
