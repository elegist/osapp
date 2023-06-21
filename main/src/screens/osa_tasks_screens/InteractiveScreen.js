import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {Component} from 'react';
import globalStyles from '../../styles/GlobalStyleSheet';
import TaskCs1 from '../interactive_tasks/TaskCs1';
import TaskCs2 from '../interactive_tasks/TaskCs2';

export default class InteractiveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      explanationTextVisible: true,
      explanationTextIndex: 0,
    };
  }

  renderTask = () => {
    switch (this.props.slug) {
      case 'cs1':
        return (
          <TaskCs1 help={this.props.help} submitted={this.state.submitted} />
        );
      case 'cs2':
        return (
          <TaskCs2 help={this.props.help} submitted={this.state.submitted} />
        );
      default:
        break;
    }
  };

  handlePress = () => {
    if (!this.state.submitted) {
      this.setState({submitted: true});
    } else {
      this.props.nextTask();
    }
  };

  render() {
    return (
      <View style={style.taskContainer}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.explanationTextVisible}
          onRequestClose={() => this.setState({explanationTextVisible: false})}>
          <View style={style.modalContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                if (
                  this.state.explanationTextIndex <
                  this.props.content.length - 1
                ) {
                  this.setState({
                    explanationTextIndex: this.state.explanationTextIndex + 1,
                  });
                } else {
                  this.setState({explanationTextVisible: false});
                }
              }}>
              <View style={style.modalContent}>
                <Text style={globalStyles.textParagraph}>
                  {this.props.content[this.state.explanationTextIndex]}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
        {this.renderTask()}
        <TouchableOpacity
          style={globalStyles.smallButton}
          onPress={this.handlePress}>
          <Text style={globalStyles.textSmallButton}>
            {this.state.submitted ? 'Fortfahren' : 'Abgeben'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  taskContainer: {
    height: '99%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  modalContent: {
    width: '80%',
    height: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    gap: 20,
  },
});
