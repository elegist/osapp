import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import Checkbox from '../../components/Checkbox';

export class QuizScreen extends Component {
  render() {
    return (
      <View>
        <Text>Topic: {this.props.topic}</Text>
        <Text>Title: {this.props.title}</Text>
        <Text>Question: {this.props.question}</Text>
        <Text>Choices: {this.props.choices}</Text>
        <Text>Correct choices: {this.props.correctChoices}</Text>
        {/* Additional UI elements related to QuizTask */}
        <Checkbox label={"test1"}></Checkbox>
      </View>
    );
  }
}

export default QuizScreen;
