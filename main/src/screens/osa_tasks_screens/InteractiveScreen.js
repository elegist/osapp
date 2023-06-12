import {Text, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import globalStyles from '../../styles/GlobalStyleSheet';

export default class InteractiveScreen extends Component {
  constructor(props) {
    super(props);
    // TODO: when tasks are implemented call this, to show the next buttons when the task is done!
  }

  render() {
    return (
      <View>
        <Text>Title: {this.props.title}</Text>
        <Text>Text: {this.props.text}</Text>
        {/* Additional UI elements related to InteractiveTask */}
        <TouchableOpacity
          onPress={this.props.nextTask}
          style={globalStyles.smallButton}>
          <Text style={globalStyles.textSmallButton}>Weiter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
