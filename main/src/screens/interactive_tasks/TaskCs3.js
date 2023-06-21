import {Text, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import InteractiveTaskBase from './InteractiveTaskBase';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/GlobalStyleSheet';

export default class TaskCs3 extends InteractiveTaskBase {
  constructor(props) {
    super(props);
    super.setDefaultState();
  }

  render() {
    return (
      <View style={this.baseStyles.taskWrapper}>
        <View style={this.baseStyles.codeWindow}>
          <TouchableOpacity
            disabled={this.props.submitted}
            style={this.baseStyles.helpButton}
            onPress={() => this.setState({modalVisible: true})}>
            <Icon name="question" size={40} color="white" />
          </TouchableOpacity>
          <Text style={globalStyles.textCodeRegular}>
            <Text
              style={{...globalStyles.textCodeBold, color: this.colors.red}}>
              if{' '}
            </Text>
            rectangle.
            <Text
              style={{
                ...globalStyles.textCodeItalic,
                color: this.colors.green,
              }}>
              index{' '}
            </Text>
            % 2{' '}
            <Text
              style={{...globalStyles.textCodeBold, color: this.colors.red}}>
              is{' '}
            </Text>
            0:
          </Text>
          <Text style={{...globalStyles.textCodeRegular, paddingLeft: 20}}>
            rectangle.
            <Text
              style={{
                ...globalStyles.textCodeItalic,
                color: this.colors.green,
              }}>
              color{' '}
            </Text>
            <Text
              style={{...globalStyles.textCodeBold, color: this.colors.red}}>
              is{' '}
            </Text>
            green
          </Text>

          <Text style={globalStyles.textCodeRegular}>
            <Text
              style={{...globalStyles.textCodeBold, color: this.colors.red}}>
              else if{' '}
            </Text>
            rectangle.
            <Text
              style={{
                ...globalStyles.textCodeItalic,
                color: this.colors.green,
              }}>
              index{' '}
            </Text>
            % 2{' '}
            <Text
              style={{...globalStyles.textCodeBold, color: this.colors.red}}>
              is not{' '}
            </Text>
            0:
          </Text>
          <Text style={{...globalStyles.textCodeRegular, paddingLeft: 20}}>
            rectangle.
            <Text
              style={{
                ...globalStyles.textCodeItalic,
                color: this.colors.green,
              }}>
              color{' '}
            </Text>
            <Text
              style={{...globalStyles.textCodeBold, color: this.colors.red}}>
              is{' '}
            </Text>
            red
          </Text>
        </View>
        <View style={this.baseStyles.resultWindow}></View>
        {this.includeModal()}
      </View>
    );
  }
}
