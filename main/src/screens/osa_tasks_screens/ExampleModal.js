import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  Linking,
} from 'react-native';
import globalStyles from '../../styles/GlobalStyleSheet';
import ImageMapper from '../helper/ImageMapper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageGallery from '../../components/ImageGallery';
import FastImage from 'react-native-fast-image';
import VideoPlayer from '../../components/VideoPlayer';

export const ExampleModal = ({modalVisible, onRequestClose, content}) => {
  const colors = {
    yellow: '#EFF186',
    blue: '#86D8F1',
    red: '#F9A6B6',
  };
  const descriptionTruncationLength = 100;
  const [fullDescription, setFullDescription] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);

  const [materialType, setMaterialType] = useState(null);
  const [materialSource, setMaterialSource] = useState(null);

  const materialDetails = /^\[(.*?)\](.*)/;

  useEffect(() => {
    setMaterialType(content.material.match(materialDetails)[1]);
    setMaterialSource(content.material.match(materialDetails)[2]);
  });

  const renderMaterial = () => {
    switch (materialType) {
      case 'img':
        return (
          <TouchableOpacity onPress={() => setFullscreenImage(true)}>
            <FastImage
              style={{
                width: 250,
                height: 250,
                alignSelf: 'center',
                marginVertical: 5,
              }}
              source={ImageMapper.getImagePath(materialSource)}
            />
          </TouchableOpacity>
        );
      case 'video':
        return (
          <VideoPlayer video={materialSource} thumbnail={content.thumbnail} />
        );
      default:
        break;
    }
  };

  const openLink = link => {
    Linking.openURL(link);
  };

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

              <View style={styles.informationContainer}>
                <View
                  style={{
                    ...styles.informationBox,
                    flex: 1,
                    backgroundColor: colors.blue,
                  }}>
                  <Text style={globalStyles.textSecondary}>Semester</Text>
                  <Text
                    style={{
                      ...globalStyles.textParagraphBold,
                      textAlign: 'center',
                    }}>
                    {content.semester}
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.informationBox,
                    flex: 3,
                    backgroundColor: colors.blue,
                  }}>
                  <Text style={globalStyles.textSecondary}>Technologien:</Text>
                  <View style={styles.badgeContainer}>
                    {content.technologies.map((technology, index) => (
                      <View key={index} style={styles.badge}>
                        <Text
                          style={{
                            ...globalStyles.textSecondary,
                            color: 'white',
                          }}>
                          {technology}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              {renderMaterial()}
              {content.link && (
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 5,
                    marginVertical: 5,
                  }}
                  onPress={() => openLink(content.link)}>
                  <Text style={globalStyles.textLink}>Ressource öffnen</Text>
                  <Icon name="external-link" size={16} color="#8CBA45" />
                </TouchableOpacity>
              )}
              <View
                style={{
                  ...styles.informationBox,
                  backgroundColor: colors.yellow,
                  marginTop: 15,
                }}>
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
              source={ImageMapper.getImagePath(materialSource)}
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
  closeButton: {
    position: 'absolute',
    top: -25,
    right: -25,
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
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    gap: 20,
  },
  informationContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 15,
  },
  informationBox: {
    padding: 15,
    borderRadius: 10,
  },
  badgeContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#808080',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
