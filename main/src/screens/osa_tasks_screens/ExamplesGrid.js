import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Modal,
  Linking,
} from 'react-native';
import globalStyles from '../../styles/GlobalStyleSheet';
import ImageMapper from '../helper/ImageMapper';
import examplesData from '../../data/examplesData.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageGallery from '../../components/ImageGallery';
import FastImage from 'react-native-fast-image';

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

        <ExampleModal
          modalVisible={this.state.modalVisible}
          onRequestClose={this.closeModal}
          content={this.state.selectedContent}
        />
      </View>
    );
  }
}

const ExampleModal = ({modalVisible, onRequestClose, content}) => {
  const descriptionTruncationLength = 100;
  const [fullDescription, setFullDescription] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);

  const openLink = link => {
    Linking.openURL(link);
  };

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
      width: '80%',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      gap: 20,
    },
    badgeContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: 5,
      marginBottom: 10,
    },
    badge: {
      backgroundColor: '#a1a1a1',
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderRadius: 5,
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
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              onRequestClose();
              setFullDescription(false);
            }}>
            <Icon name="close" size={32} color="white"></Icon>
          </TouchableOpacity>
          {content && (
            <ScrollView>
              <Text
                style={{
                  ...globalStyles.textHeadingSecondary,
                  textAlign: 'center',
                  marginBottom: 5,
                }}>
                {content.title}
              </Text>
              <Text style={{...globalStyles.textSecondary, marginBottom: 5}}>
                Semester:{' '}
                <Text style={globalStyles.textParagraph}>
                  {content.semester}
                </Text>
              </Text>
              <Text style={{...globalStyles.textSecondary, marginBottom: 5}}>
                Technologien:
              </Text>
              <View style={styles.badgeContainer}>
                {content.technologies.map((technology, index) => (
                  <View key={index} style={styles.badge}>
                    <Text
                      style={{...globalStyles.textSecondary, color: 'white'}}>
                      {technology}
                    </Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity onPress={() => setFullscreenImage(true)}>
                <FastImage
                  style={{
                    width: 250,
                    height: 250,
                    alignSelf: 'center',
                    marginVertical: 5,
                  }}
                  source={ImageMapper.getImagePath(content.thumbnail)}
                />
              </TouchableOpacity>
              {content.link && (
                <TouchableOpacity
                  style={{
                    ...globalStyles.smallButton,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 10,
                    marginVertical: 20,
                  }}
                  onPress={() => openLink(content.link)}>
                  <Text style={globalStyles.textSmallButton}>
                    Ressource öffnen
                  </Text>
                  <Icon name="external-link" size={24} color="white" />
                </TouchableOpacity>
              )}
              <View>
                <Text style={{...globalStyles.textSecondary, marginBottom: 5}}>
                  Beschreibung:
                </Text>
                <TouchableOpacity
                  onPress={() => setFullDescription(!fullDescription)}>
                  <Text style={globalStyles.textParagraph}>
                    {fullDescription
                      ? content.description
                      : `${content.description.slice(
                          0,
                          descriptionTruncationLength,
                        )}...`}
                  </Text>
                  <Text style={globalStyles.textSecondary}>
                    {fullDescription ? 'weniger' : 'mehr'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>

      {fullscreenImage && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          }}>
          <TouchableOpacity onPress={() => setFullscreenImage(false)}>
            <FastImage
              source={ImageMapper.getImagePath(content.thumbnail)}
              style={{width: '100%', height: '100%', position: 'relative'}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>
      )}
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
