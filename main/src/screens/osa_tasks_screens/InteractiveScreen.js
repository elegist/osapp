import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import globalStyles from '../../styles/GlobalStyleSheet';
import TaskCs1 from '../interactive_tasks/TaskCs1';
import TaskCs2 from '../interactive_tasks/TaskCs2';
import TaskCs3 from '../interactive_tasks/TaskCs3';

export default class InteractiveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      explanationTextVisible: true,
      explanationTextIndex: 0,
      buttonDisabled: false,
    };
  }

  componentDidMount() {
    if (this.props.task.slug === 'cs1') {
      this.setState({buttonDisabled: true});
    }
  }

  activateButton = () => {
    this.setState({buttonDisabled: false});
  };

  renderTask = () => {
    switch (this.props.task.slug) {
      case 'cs1':
        return (
          <TaskCs1
            help={this.props.task.help}
            submitted={this.state.submitted}
            activateButton={this.activateButton}
            task={this.props.task}
          />
        );
      case 'cs2':
        return (
          <TaskCs2
            help={this.props.task.help}
            submitted={this.state.submitted}
            task={this.props.task}
          />
        );
      case 'cs3':
        return (
          <TaskCs3
            help={this.props.task.help}
            submitted={this.state.submitted}
            task={this.props.task}
          />
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
        {this.renderTask()}
        <TouchableOpacity
          disabled={this.state.buttonDisabled}
          style={{...globalStyles.smallButton, zIndex: -1}}
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
});
