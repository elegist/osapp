import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/GlobalStyleSheet';
import {ScrollView} from 'react-native-gesture-handler';

export default class InteractiveTaskBase extends Component {
  constructor(props) {
    super(props);
    this.task = props.task;
    this.task.setMaxHints(this.props.help.length - 1);

    this.setDefaultState();

    this.colors = {
      gray: '#D5D5D5',
      green: '#008000',
      red: '#B30000',
    };

    this.baseStyles = StyleSheet.create({
      taskWrapper: {
        height: '90%',
        width: '90%',
        gap: 10,
      },
      codeWindow: {
        flex: 1,
        width: "100%",
        backgroundColor: this.colors.gray,
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingLeft: 10,
      },
      resultWindow: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
      },
      helpButton: {
        position: 'absolute',
        top: -15,
        right: -20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        elevation: 5,
        backgroundColor: '#F4DD08',
        borderRadius: 50,
      },
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
    });
  }

  setDefaultState() {
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
              <Icon name="close" size={32} color="white"></Icon>
            </TouchableOpacity>
            <ScrollView>
              {this.props.help.map((hint, index) => {
                return (
                  <View key={index} style={style.hintBlock}>
                    {index <= this.state.helpIndex ? (
                      <Text style={globalStyles.textParagraph}>{hint}</Text>
                    ) : (
                      <Icon
                        name="question"
                        color="#9B9B9B"
                        size={42}
                        style={{alignSelf: 'center'}}
                      />
                    )}
                    {index !== this.props.help.length - 1 ? (
                      <View
                        style={{
                          ...globalStyles.horizontalLine,
                          marginTop: 20,
                        }}></View>
                    ) : (
                      <></>
                    )}
                  </View>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              disabled={this.props.help.length - 1 === this.state.helpIndex}
              style={
                this.props.help.length - 1 === this.state.helpIndex
                  ? globalStyles.smallButtonDisabled
                  : globalStyles.smallButton
              }
              onPress={() => {
                this.setState({helpIndex: this.state.helpIndex + 1});
                this.task.increaseUsedHints();
              }}>
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
    top: -25,
    right: -25,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    height: '90%',
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    gap: 20,
  },
  hintBlock: {
    marginBottom: 20,
  },
});
