import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Checkbox({label}) {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity
      style={styles.checkBoxContainer}
      onPress={() => setChecked(!checked)}>
      <View style={styles.checkbox}>
        {checked && <Icon name="check"></Icon>}
      </View>
      <Text style={styles.checkBoxLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'center'
  },
  checkbox: {
    display: 'flex',
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkBoxLabel: {
    marginHorizontal: 8,
  },
});
