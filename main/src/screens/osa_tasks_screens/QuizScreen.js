import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import Checkbox from '../../components/Checkbox';
import globalStyles from '../../styles/GlobalStyleSheet';

export class QuizScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerChecked: false,
    };
  }

  handleCheckAnswer = () => {
    this.setState({answerChecked: true});
    this.props.onQuizFinished();
  };

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
        <TouchableOpacity
          disabled={this.state.answerChecked}
          style={
            this.state.answerChecked
              ? globalStyles.smallButtonDisabled
              : globalStyles.smallButton
          }
          onPress={this.handleCheckAnswer}>
          <Text style={globalStyles.textSmallButton}>Check answer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  choiceContainer: {
    marginVertical: 16,
  },
});

export default QuizScreen;
