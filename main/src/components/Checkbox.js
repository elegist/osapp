import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../styles/GlobalStyleSheet';

export default function Checkbox({label}) {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity
      style={styles.checkBoxContainer}
      onPress={() => setChecked(!checked)}>
      <View style={styles.checkbox}>
        {checked && <Icon style={styles.check} name="check-square"></Icon>}
      </View>
      <Text style={{...globalStyles.textChoiceButton, marginLeft: 8}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 12,
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    width: '70%',
  },
  checkbox: {
    display: 'flex',
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#8CBA45',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  check: {
    color: '#8CBA45',
    fontSize: 20,
  },
  checkBoxLabel: {
    marginHorizontal: 8,
  },
});
