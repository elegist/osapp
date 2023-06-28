import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Animated,
} from 'react-native';
import globalStyles from '../../styles/GlobalStyleSheet';
import ImageMapper from '../helper/ImageMapper';
import FastImage from 'react-native-fast-image';
import {ExampleModal} from './ExampleModal';

import examplesData from '../../data/examplesData.json';
import {Easing} from 'react-native-reanimated';

class ExamplesGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedContent: null,
    };

    this.staggerOpacity = [];
    this.staggerScale = [];

    examplesData.forEach(topic => {
      topic.examples.forEach((_, index) => {
        this.staggerOpacity[index] = new Animated.Value(0);
        this.staggerScale[index] = new Animated.Value(0);
      });
    });
  }

  componentDidMount() {
    const animationDuration = 1000;
    const opacityAnimations = [];
    const scaleAnimations = [];

    this.staggerOpacity.forEach((animation, index) => {
      opacityAnimations[index] = Animated.timing(animation, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      });
    });

    this.staggerScale.forEach((animation, index) => {
      scaleAnimations[index] = Animated.timing(animation, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.elastic(1.5),
        useNativeDriver: true,
      });
    });

    Animated.parallel([
      Animated.stagger(400, opacityAnimations),
      Animated.stagger(400, scaleAnimations),
    ]).start();
  }

  openModalWithContent = content => {
    this.setState({selectedContent: content});
    this.setState({modalVisible: true});
  };

  closeModal = () => {
    this.setState({modalVisible: false});
  };

  render() {
    const AnimatedTouchableOpacity =
      Animated.createAnimatedComponent(TouchableOpacity);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          {examplesData.map((topic, index) => {
            return (
              <View key={index} style={styles.topicContainer}>
                <Text style={globalStyles.textSecondary}>{topic.name}</Text>
                <View style={styles.exampleContainer}>
                  {topic.examples.map((example, index) => (
                    <AnimatedTouchableOpacity
                      key={index}
                      onPress={() => this.openModalWithContent(example)}
                      style={[
                        styles.thumbnailContainer,
                        {
                          opacity: this.staggerOpacity[index],
                          transform: [{scale: this.staggerScale[index]}],
                        },
                      ]}>
                      <FastImage
                        source={ImageMapper.getImagePath(example.thumbnail)}
                        style={styles.thumbnail}
                      />
                    </AnimatedTouchableOpacity>
                  ))}
                </View>
                <View
                  style={{
                    ...globalStyles.horizontalLine,
                    width: '90%',
                    marginVertical: 20,
                    borderBottomWidth: index < examplesData.length - 1 ? 1 : 0,
                  }}
                />
              </View>
            );
          })}
        </ScrollView>

        {this.state.selectedContent && (
          <ExampleModal
            modalVisible={this.state.modalVisible}
            onRequestClose={() => {
              this.closeModal();
              this.setState({selectedContent: null});
            }}
            content={this.state.selectedContent}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scrollContainer: {
    height: '98%',
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
  topicContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exampleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailContainer: {
    margin: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});

export default ExamplesGrid;
