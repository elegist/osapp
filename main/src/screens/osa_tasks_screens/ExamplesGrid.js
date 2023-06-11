import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

class ExamplesGrid extends Component {
  render() {
    const thumbnails = [
      require('../../assets/project_examples/thumbnails/thumb1.jpg'),
      require('../../assets/project_examples/thumbnails/thumb2.jpg'),
      require('../../assets/project_examples/thumbnails/thumb3.jpg'),
      require('../../assets/project_examples/thumbnails/thumb1.jpg'),
      require('../../assets/project_examples/thumbnails/thumb2.jpg'),
      require('../../assets/project_examples/thumbnails/thumb3.jpg'),
      require('../../assets/project_examples/thumbnails/thumb1.jpg'),
      require('../../assets/project_examples/thumbnails/thumb2.jpg'),
      require('../../assets/project_examples/thumbnails/thumb3.jpg'),
      require('../../assets/project_examples/thumbnails/thumb1.jpg'),
      require('../../assets/project_examples/thumbnails/thumb2.jpg'),
      require('../../assets/project_examples/thumbnails/thumb3.jpg'),
      require('../../assets/project_examples/thumbnails/thumb1.jpg'),
      require('../../assets/project_examples/thumbnails/thumb2.jpg'),
      require('../../assets/project_examples/thumbnails/thumb3.jpg'),
      require('../../assets/project_examples/thumbnails/thumb1.jpg'),
      require('../../assets/project_examples/thumbnails/thumb2.jpg'),
      require('../../assets/project_examples/thumbnails/thumb3.jpg'),
      require('../../assets/project_examples/thumbnails/thumb1.jpg'),
      require('../../assets/project_examples/thumbnails/thumb2.jpg'),
      require('../../assets/project_examples/thumbnails/thumb3.jpg'),
      // Add more image paths as needed
    ];

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {thumbnails.map((thumbnail, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              console.log(`Thumbnail ${index + 1} pressed!`);
              // Add functionality here
            }}
            style={styles.thumbnailContainer}
          >
            <Image source={thumbnail} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  thumbnailContainer: {
    margin: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});

export default ExamplesGrid;
