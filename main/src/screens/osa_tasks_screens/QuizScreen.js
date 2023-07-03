import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
} from 'react-native';
import React, {Component} from 'react';
import Checkbox from '../../components/Checkbox';
import globalStyles from '../../styles/GlobalStyleSheet';
import RadioButton from '../../components/RadioButton';
import {Easing} from 'react-native-reanimated';

const SINGLE_CHOICE = 'single';
const MUTLIPLE_CHOICE = 'multiple';

export class QuizScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioChoice: null,
      checkChoices: [],
    };

    this.fadeAnim = new Animated.Value(0);
    this.moveAnim = new Animated.Value(25);
    this.fadeAnim2 = new Animated.Value(0);
  }

  renderChoices = () => {
    switch (this.props.task.style) {
      case SINGLE_CHOICE:
        return (
          <View style={styles.choicesView}>
            <RadioButton
              choices={this.props.task.choices}
              onSelect={choice => this.setState({radioChoice: choice})}
            />
          </View>
        );
      case MUTLIPLE_CHOICE:
        return (
          <View style={styles.choicesView}>
            <View>
              {this.props.task.choices.map((choice, index) => {
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
      default:
        break;
    }
  };

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this.fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.ease,
      }),

      Animated.parallel([
        Animated.timing(this.fadeAnim2, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(this.moveAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]),
    ]).start();
  }

  checkAnswers = () => {
    switch (this.props.task.style) {
      case SINGLE_CHOICE:
        this.props.task.setSelectedAnswers([this.state.radioChoice])
        break;
    
        case MUTLIPLE_CHOICE:
          this.props.task.setSelectedAnswers(this.state.checkChoices)
        break;
    }
    this.props.nextTask()
  }

  render() {
    return (
      <Animated.View style={{...styles.viewContainer, opacity: this.fadeAnim}}>
        <Text style={globalStyles.textHeadingSecondary}>
          {this.props.task.question}
        </Text>

        <Animated.ScrollView
          persistentScrollbar={true}
          style={{
            ...styles.scrollView,
            opacity: this.fadeAnim2,
            transform: [{translateY: this.moveAnim}],
          }}
          contentContainerStyle={styles.scrollViewContent}>
          {this.renderChoices()}
        </Animated.ScrollView>

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
          onPress={this.checkAnswers}>
          <Text style={globalStyles.textSmallButton}>Abgeben</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    height: '92%',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
    flex: 1,
    marginVertical: 10,
    padding: 5,
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
