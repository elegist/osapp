import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import globalStyles from '../../styles/GlobalStyleSheet';
import ImageMapper from '../helper/ImageMapper';
import examplesData from '../../data/examplesData.json';
import {ScrollView} from 'react-native-gesture-handler';

class ExamplesGrid extends Component {
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
                      onPress={() => {
                        console.log(example.title);
                        // Add functionality here
                      }}
                      style={styles.thumbnailContainer}>
                      <Image
                        source={ImageMapper.getImagePath(example.thumbnail)}
                        style={styles.thumbnail}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                {index < examplesData.length - 1 && (
                  <View
                    style={{
                      ...globalStyles.horizontalLine,
                      width: '90%',
                      marginVertical: 20,
                    }}
                  />
                )}
              </View>
            );
          })}
        </ScrollView>
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
    height: '95%',
    padding: 10,
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderRadius: 10,
    marginVertical: 5,
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
