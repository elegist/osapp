import {View, TouchableOpacity, Animated, Easing} from 'react-native';
import React, {useRef, useState} from 'react';
import VideoPlayer from './VideoPlayer';
import FastImage from 'react-native-fast-image';
import ImageMapper from '../screens/helper/ImageMapper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getResponsiveSizing} from '../styles/GlobalStyleSheet';

const MaterialGallery = ({materials, thumbnail}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState({width: 16, height: 9});

  const [swipeDirection, setSwipeDirection] = useState(-1);

  const animationDuration = 280;
  const translateDistance = 400;
  const initialScale = 1.6;

  const easingType = Easing.ease;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(initialScale)).current;
  const swipeAnimationValue = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    return Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: animationDuration,
        easing: easingType,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: animationDuration,
        easing: easingType,
        useNativeDriver: true,
      }),
      Animated.timing(swipeAnimationValue, {
        toValue: 1,
        duration: animationDuration,
        easing: easingType,
        useNativeDriver: true,
      }),
    ]);
  };

  const fadeOut = () => {
    return Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: animationDuration / 2,
        easing: easingType,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: initialScale,
        duration: animationDuration,
        easing: easingType,
        useNativeDriver: true,
      }),
      Animated.timing(swipeAnimationValue, {
        toValue: 0,
        duration: animationDuration,
        easing: easingType,
        useNativeDriver: true,
      }),
    ]);
  };

  const translateXStyle = (direction = 1) => {
    return swipeAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [translateDistance * direction, 0],
    });
  };

  const handleLoad = event => {
    setSwipeDirection(swipeDirection * -1);
    const {nativeEvent} = event;
    setAspectRatio({
      width: nativeEvent.width,
      height: nativeEvent.height,
    });
    fadeIn().start();
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
        return (
          <VideoPlayer
            video={material.source}
            thumbnail={thumbnail}
            onLoad={() => {
              setSwipeDirection(swipeDirection * -1);
              fadeIn().start();
            }}
          />
        );
      default:
        break;
    }
  };

  return (
    <View>
      <View>
        <Animated.View
          style={[
            {
              opacity: opacityValue,
              transform: [
                {translateX: translateXStyle(swipeDirection)},
                {scale: scaleValue},
              ],
            },
          ]}>
          {renderMaterial(materials[currentIndex])}
        </Animated.View>
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
                setSwipeDirection(1);
                fadeOut().start(() => {
                  currentIndex > 0
                    ? setCurrentIndex(currentIndex - 1)
                    : setCurrentIndex(materials.length - 1);
                });
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
                setSwipeDirection(-1);
                fadeOut().start(() => {
                  currentIndex < materials.length - 1
                    ? setCurrentIndex(currentIndex + 1)
                    : setCurrentIndex(0);
                });
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
