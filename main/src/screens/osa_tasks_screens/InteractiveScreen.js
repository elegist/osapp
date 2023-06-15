import {Text, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import globalStyles from '../../styles/GlobalStyleSheet';
import TaskCs1 from '../../components/interactive_tasks/TaskCs1';
import TaskCs2 from '../../components/interactive_tasks/TaskCs2';

export default class InteractiveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
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
      <View style={globalStyles.fullContainer}>
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
