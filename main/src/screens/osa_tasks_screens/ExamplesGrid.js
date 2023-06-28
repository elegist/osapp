import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import globalStyles from '../../styles/GlobalStyleSheet';
import ImageMapper from '../helper/ImageMapper';
import FastImage from 'react-native-fast-image';
import {ExampleModal} from './ExampleModal';

import examplesData from '../../data/examplesData.json';

class ExamplesGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedContent: null,
    };
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
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          {examplesData.map((topic, index) => {
            return (
              <View key={index} style={styles.topicContainer}>
                <Text style={globalStyles.textSecondary}>{topic.name}</Text>
                <View style={styles.exampleContainer}>
                  {topic.examples.map((example, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => this.openModalWithContent(example)}
                      style={styles.thumbnailContainer}>
                      <FastImage
                        source={ImageMapper.getImagePath(example.thumbnail)}
                        style={styles.thumbnail}
                      />
                    </TouchableOpacity>
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
