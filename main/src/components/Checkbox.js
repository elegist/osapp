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
        {checked && <Icon style={styles.check} name="check"></Icon>}
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
    marginVertical: 4,
    alignItems: 'center',
    alignSelf: 'center',
    width: '40%',
  },
  checkbox: {
    display: 'flex',
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#8CBA45',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  check: {
    color: '#1C2327',
  },
  checkBoxLabel: {
    marginHorizontal: 8,
  },
});
