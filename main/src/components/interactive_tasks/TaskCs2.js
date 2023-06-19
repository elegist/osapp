import {Text, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import InteractiveTaskBase from './InteractiveTaskBase';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/GlobalStyleSheet';

export default class TaskCs2 extends InteractiveTaskBase {
  constructor(props) {
    super(props);
    super.setDefaultState();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.submitted !== this.props.submitted) {
      //TODO: evaluate the users solution here
    }
  }

  render() {
    return (
      <View style={this.baseStyles.taskWrapper}>
        <View style={this.baseStyles.codeWindow}>
          <TouchableOpacity
            disabled={this.props.submitted}
            style={this.baseStyles.helpButton}
            onPress={() => this.setState({modalVisible: true})}>
            <Icon name="question" size={40} color="white" />
          </TouchableOpacity>

          <Text style={globalStyles.textCodeRegular}>
            rectangles.
            <Text style={{...globalStyles.textCodeItalic, color: '#7ff54a'}}>
              sortByColor(red)
            </Text>
          </Text>
        </View>

        <View style={this.baseStyles.resultWindow}></View>
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
