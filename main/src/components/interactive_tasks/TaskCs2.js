import {Text, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import InteractiveTaskBase from './InteractiveTaskBase';

export default class TaskCs2 extends InteractiveTaskBase {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {this.includeModal()}
        <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
          <Text>open</Text>
        </TouchableOpacity>
        <Text>{this.props.help[0]}</Text>
      </View>
    );
  }
}
