import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../../styles/GlobalStyleSheet';

export default function Rectangle({label, submitted}) {
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
}

const style = StyleSheet.create({
  rectangle: {
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
});
