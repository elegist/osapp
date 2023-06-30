import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
import VideoPlayer from './VideoPlayer';
import FastImage from 'react-native-fast-image';
import ImageMapper from '../screens/helper/ImageMapper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getResponsiveSizing} from '../styles/GlobalStyleSheet';

const MaterialGallery = ({materials, thumbnail}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState({width: 16, height: 9});

  const handleLoad = event => {
    const {nativeEvent} = event;
    setAspectRatio({
      width: nativeEvent.width,
      height: nativeEvent.height,
    });
  };

  const renderMaterial = material => {
    switch (material.type) {
      case 'img':
        return (
          <FastImage
            onLoad={handleLoad}
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              aspectRatio: aspectRatio.width / aspectRatio.height,
              alignSelf: 'center',
              marginVertical: 5,
            }}
            source={ImageMapper.getImagePath(material.source)}
          />
        );
      case 'video':
        return <VideoPlayer video={material.source} thumbnail={thumbnail} />;
      default:
        break;
    }
  };

  return (
    <View>
      <View>
        {renderMaterial(materials[currentIndex])}
        {materials.length > 1 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                currentIndex > 0
                  ? setCurrentIndex(currentIndex - 1)
                  : setCurrentIndex(materials.length - 1);
              }}>
              <Icon
                name="chevron-circle-left"
                color="#8CBA45"
                size={getResponsiveSizing(36)}
              />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', gap: 10}}>
              {materials.map((_, index) => (
                <Icon
                  key={index}
                  name={index === currentIndex ? 'circle' : 'circle-o'}
                  color="#8CBA45"
                  size={getResponsiveSizing(16)}
                />
              ))}
            </View>
            <TouchableOpacity
              onPress={() => {
                currentIndex < materials.length - 1
                  ? setCurrentIndex(currentIndex + 1)
                  : setCurrentIndex(0);
              }}>
              <Icon
                name="chevron-circle-right"
                color="#8CBA45"
                size={getResponsiveSizing(36)}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default MaterialGallery;
