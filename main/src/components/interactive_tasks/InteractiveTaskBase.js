import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/GlobalStyleSheet';

export default class InteractiveTaskBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      helpIndex: 0,
    };
  }

  includeModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => this.setState({modalVisible: false})}>
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <TouchableOpacity
              style={style.closeButton}
              onPress={() => this.setState({modalVisible: false})}>
              <Icon name="close" size={40} color="white"></Icon>
            </TouchableOpacity>
            <Text style={globalStyles.textParagraph}>
              {this.props.help[this.state.helpIndex]}
            </Text>
            <TouchableOpacity
              disabled={this.props.help.length - 1 === this.state.helpIndex}
              style={
                this.props.help.length - 1 === this.state.helpIndex
                  ? globalStyles.smallButtonDisabled
                  : globalStyles.smallButton
              }
              onPress={() =>
                this.setState({helpIndex: this.state.helpIndex + 1})
              }>
              <Text style={globalStyles.textSmallButton}>nächster Tipp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const style = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: -40,
    right: -40,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    elevation: 5,
    backgroundColor: '#dd4040',
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  modalContent: {
    maxWidth: '60%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    gap: 20,
  },
});
