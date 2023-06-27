import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Modal,
} from 'react-native';
import globalStyles from '../../styles/GlobalStyleSheet';
import ImageMapper from '../helper/ImageMapper';
import examplesData from '../../data/examplesData.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageGallery from '../../components/ImageGallery';

class ExamplesGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalContent: null,
    };
  }

  openModalWithContent = content => {
    this.setState({modalVisible: true});
    this.setState({modalContent: content});
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
                      <Image
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

        {this.state.modalContent && (
          <ExampleModal
            modalVisible={this.state.modalVisible}
            onRequestClose={this.closeModal}
            content={this.state.modalContent}
          />
        )}
      </View>
    );
  }
}

const ExampleModal = ({modalVisible, onRequestClose, content}) => {
  const styles = StyleSheet.create({
    closeButton: {
      position: 'absolute',
      top: -35,
      right: -35,
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
      height: '90%',
      width: '70%',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      gap: 20,
    },
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onRequestClose}>
            <Icon name="close" size={32} color="white"></Icon>
          </TouchableOpacity>
          <ImageGallery />
        </View>
      </View>
    </Modal>
  );
};

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
