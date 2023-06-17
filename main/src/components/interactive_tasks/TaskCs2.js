import {Text, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import InteractiveTaskBase from './InteractiveTaskBase';

export default class TaskCs2 extends InteractiveTaskBase {
  constructor(props) {
    super(props);
  }

  render() {
    return <View style={this.baseStyles.taskWrapper}></View>;
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
