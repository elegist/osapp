import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import Checkbox from '../../components/Checkbox';
import globalStyles from '../../styles/GlobalStyleSheet';
import RadioButton from '../../components/RadioButton';

export class QuizScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerChecked: false,
      radioChoice: null,
      checkChoices: [],
    };
  }

  handleCheckAnswer = () => {
    this.setState({answerChecked: true});
    this.props.onQuizFinished();
  };

  renderChoices = () => {
    const SINGLE_CHOICE = 'single';
    const MUTLIPLE_CHOICE = 'multiple';

    if (this.props.style == SINGLE_CHOICE) {
      return (
        <View>
          <RadioButton
            choices={this.props.choices}
            onSelect={choice => this.setState({radioChoice: choice})}
          />
        </View>
      );
    } else if (this.props.style == MUTLIPLE_CHOICE) {
      return (
        <View style={styles.choiceContainer}>
          {this.props.choices.map((choice, index) => {
            return (
              <Checkbox
                key={index}
                index={index}
                label={choice}
                onSelect={choice => {
                  if (this.state.checkChoices.includes(choice)) {
                    const array = this.state.checkChoices;
                    const index = array.indexOf(choice);

                    array.splice(index, 1);

                    this.setState({checkChoices: array});
                  } else {
                    this.setState({
                      checkChoices: [...this.state.checkChoices, choice],
                    });
                  }
                }}></Checkbox>
            );
          })}
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.quizContainer}>
        <Text style={globalStyles.textHeadingSecondary}>
          {this.props.question}
        </Text>

        <ScrollView persistentScrollbar={true} style={{maxHeight: "60%"}}>
          {this.renderChoices()}
        </ScrollView>

        <TouchableOpacity
          disabled={
            this.state.radioChoice === null &&
            this.state.checkChoices.length === 0
          }
          style={
            this.state.radioChoice === null &&
            this.state.checkChoices.length === 0
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
  quizContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  choiceContainer: {
    marginVertical: 16,
  },
});

export default QuizScreen;
