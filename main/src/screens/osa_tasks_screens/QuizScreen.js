import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import Checkbox from '../../components/Checkbox';
import globalStyles from '../../styles/GlobalStyleSheet';

export class QuizScreen extends Component {
  render() {
    return (
      <View>
        {/* <Text>Topic: {this.props.topic}</Text>
        <Text>Title: {this.props.title}</Text>
        <Text>Question: {this.props.question}</Text>
        <Text>Choices: {this.props.choices}</Text>
        <Text>Correct choices: {this.props.correctChoices}</Text> */}
        {/* Additional UI elements related to QuizTask */}
        <Text style={globalStyles.textHeadingSecondary}>
          {this.props.question}
        </Text>
        <View style={styles.choiceContainer}>
          {this.props.choices.map((choice, index) => {
            return <Checkbox key={index} label={choice}></Checkbox>;
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  choiceContainer: {
    marginVertical: 16,
  }
})

export default QuizScreen;
