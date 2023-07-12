import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  BackHandler,
} from 'react-native';
import globalStyles, {getResponsiveSizing} from '../styles/GlobalStyleSheet';
import FastImage from 'react-native-fast-image';
import TopBar from '../components/TopBar';
import TaskManager, {taskManagerIsInitialized} from '../container/TaskManager';

export default class HomeScreen extends Component {
  showContinueButton = taskManagerIsInitialized;
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
    };
  }

  pressBegin = () => {
    let taskManager = TaskManager.getInstance()
    taskManager.resetTaskManager()
    this.setState({isPressed: true});
    this.props.navigation.navigate('osaScreen', {resetOsa: true});
    this.showContinueButton = true;
    this.setState({isPressed: false});
  };

  pressContinue = () => {
    this.setState({isPressed: true});
    this.props.navigation.navigate('osaScreen', {resetOsa: false});
    this.showContinueButton = true;
    this.setState({isPressed: false});
  };

  render() {
    const {isPressed} = this.state;
    const {navigation} = this.props;

    return (
      <ImageBackground
        source={require('../assets/Background.png')}
        style={globalStyles.mainBackground}>
        <TopBar navigation={navigation} />
        <View style={styles.mainContainer}>
          <FastImage
            style={{
              width: getResponsiveSizing(250),
              height: getResponsiveSizing(125),
            }}
            source={require('../assets/OSAPP.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          {this.showContinueButton == false ? (
            <TouchableOpacity
              style={[styles.bigButton, isPressed && styles.bigButtonPressed]}
              onPress={this.pressBegin}>
              <Text
                style={[
                  styles.textBigButton,
                  isPressed && globalStyles.textParagraph,
                ]}>
                Online Self Assessment beginnen!
              </Text>
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity
                style={[styles.bigButton, isPressed && styles.bigButtonPressed]}
                onPress={this.pressContinue}>
                <Text
                  style={[
                    styles.textBigButton,
                    isPressed && globalStyles.textParagraph,
                  ]}>
                  OSA Fortfahren
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallButton,
                  isPressed && styles.bigButtonPressed,
                ]}
                onPress={this.pressBegin}>
                <Text
                  style={[
                    styles.textSmallButton,
                    isPressed && globalStyles.textParagraph,
                  ]}>
                  Neu starten
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
  },
  bigButton: {
    backgroundColor: '#8CBA45',
    borderRadius: 10,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  bigButtonPressed: {
    backgroundColor: '#FFFFFF',
  },
  textBigButton: {
    fontFamily: 'PTSans-Bold',
    fontSize: getResponsiveSizing(24),
    color: 'white',
    textAlign: 'center',
  },
  smallButton: {
    backgroundColor: '#8CBA45',
    borderRadius: 10,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textSmallButton: {
    fontFamily: 'PTSans-Bold',
    fontSize: getResponsiveSizing(18),
    color: 'white',
    textAlign: 'center',
  },
});
