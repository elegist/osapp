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
  };

  renderChoices = () => {
    const SINGLE_CHOICE = 'single';
    const MUTLIPLE_CHOICE = 'multiple';

    if (this.props.style == SINGLE_CHOICE) {
      return (
        <View style={styles.choicesView}>
          <RadioButton
            choices={this.props.choices}
            onSelect={choice => this.setState({radioChoice: choice})}
          />
        </View>
      );
    } else if (this.props.style == MUTLIPLE_CHOICE) {
      return (
        <View style={styles.choicesView}>
          <View>
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
                  }}
                />
              );
            })}
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.viewContainer}>
        <Text style={globalStyles.textHeadingSecondary}>
          {this.props.question}
        </Text>

        <ScrollView
          persistentScrollbar={true}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
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
  viewContainer: {
    height: '92%',
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  scrollView: {
    flex: 0,
    marginVertical: 10,
    padding: 5,
    flexGrow: 0,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  choicesView: {
    alignItems: 'center',
  },
});

export default QuizScreen;
