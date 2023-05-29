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
        {checked && <Icon name="check"></Icon>}
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
    width: '30%',
  },
  checkbox: {
    display: 'flex',
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#8CBA45',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxLabel: {
    marginHorizontal: 8,
  },
});
