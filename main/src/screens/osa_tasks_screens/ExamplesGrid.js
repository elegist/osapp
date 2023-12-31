import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Animated,
} from 'react-native';
import globalStyles from '../../styles/GlobalStyleSheet';
import MediaMapper from '../helper/MediaMapper';
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

    this.animationOpacity = new Animated.Value(0);

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

    Animated.sequence([
      Animated.timing(this.animationOpacity, {
        toValue: 1,
        duration: animationDuration / 2,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.stagger(400, opacityAnimations),
        Animated.stagger(400, scaleAnimations),
      ]),
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
    return (
      <Animated.View
        style={[styles.container, {opacity: this.animationOpacity}]}>
        <ScrollView style={styles.scrollContainer}>
          {examplesData.map((topic, index) => {
            return (
              <View key={index} style={styles.topicContainer}>
                <Text style={globalStyles.textSecondary}>{topic.name}</Text>
                <View style={styles.exampleContainer}>
                  {topic.examples.map((example, index) => (
                    <Animated.View
                      key={index}
                      style={[
                        {
                          opacity: this.staggerOpacity[index],
                          transform: [{scale: this.staggerScale[index]}],
                        },
                      ]}>
                      <TouchableOpacity
                        onPress={() => this.openModalWithContent(example)}
                        style={styles.thumbnailContainer}>
                        <FastImage
                          source={MediaMapper.getExampleThumbnail(example.thumbnail)}
                          style={styles.thumbnail}
                        />
                      </TouchableOpacity>
                    </Animated.View>
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
      </Animated.View>
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
