import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import Checkbox from '../../components/Checkbox';
import globalStyles from '../../styles/GlobalStyleSheet';
import RadioButton from '../../components/RadioButton';

export class QuizScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerChecked: false,
      userChoice: null,
    };
  }

  handleCheckAnswer = () => {
    this.setState({answerChecked: true});
    this.props.onQuizFinished();
  };

  renderQuestion = () => {
    const SINGLE_CHOICE = 'single';
    const MUTLIPLE_CHOICE = 'multiple';

    if (this.props.style == SINGLE_CHOICE) {
      return (
        <View>
          <RadioButton
            choices={this.props.choices}
            onSelect={choice => this.setState({userChoice: choice})}
          />
        </View>
      );
    } else if (this.props.style == MUTLIPLE_CHOICE) {
      return (
        <View style={styles.choiceContainer}>
          {this.props.choices.map((choice, index) => {
            return <Checkbox key={index} label={choice}></Checkbox>;
          })}
        </View>
      );
    }
  };

  render() {
    return (
      <View>
        <Text style={globalStyles.textSecondary}>{this.props.topic}</Text>
        <Text style={globalStyles.textHeadingSecondary}>
          {this.props.question}
        </Text>

        <View>{this.renderQuestion()}</View>

        <TouchableOpacity
          disabled={this.state.answerChecked}
          style={
            this.state.answerChecked
              ? globalStyles.smallButtonDisabled
              : globalStyles.smallButton
          }
          onPress={this.props.nextTask}>
          <Text style={globalStyles.textSmallButton}>Abgeben</Text>
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
