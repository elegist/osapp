import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import ImageMapper from '../screens/helper/ImageMapper';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import {getResponsiveSizing} from '../styles/GlobalStyleSheet';

const {width, height} = Dimensions.get('window');

const VideoPlayer = ({video, thumbnail}) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);

  const [usingSlider, setUsingSlider] = useState(false);

  const controlsTimeout = 3000;
  const controlsOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!paused && !usingSlider) {
      const timer = setTimeout(() => {
        setControlsVisible(false);
        fadeOutControls();
      }, controlsTimeout);

      return () => clearTimeout(timer);
    }
  }, [paused, usingSlider, controlsVisible]);

  const handlePlayPause = () => {
    setPaused(!paused);
  };

  const handleMuteUnmute = () => {
    setMuted(!muted);
  };

  const handleVolumeChange = value => {
    setVolume(value);
  };

  const handleSeek = value => {
    videoRef.current.seek(value);
    setCurrentTime(value);
  };

  const handleProgress = data => {
    setCurrentTime(data.currentTime);
    setDuration(data.playableDuration);
  };

  const handleVideoPress = () => {
    setControlsVisible(true);
    fadeInControls();
  };

  const fadeOutControls = () => {
    Animated.timing(controlsOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeInControls = () => {
    Animated.timing(controlsOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={{...styles.absoluteContainer, backgroundColor: 'black'}} />
      {paused ? (
        <FastImage
          source={ImageMapper.getImagePath(thumbnail)}
          style={styles.video}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <Video
          ref={videoRef}
          style={styles.video}
          source={ImageMapper.getImagePath(video)}
          paused={paused}
          muted={muted}
          volume={volume}
          onProgress={handleProgress}
          onTouchStart={handleVideoPress}
          resizeMode="contain"
        />
      )}

      {controlsVisible && (
        <View style={styles.absoluteContainer}>
          <Animated.View
            style={[styles.controlsContainer, {opacity: controlsOpacity}]}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{width: '14%'}}
                onPress={handleMuteUnmute}>
                <Icon
                  name={muted ? 'volume-off' : 'volume-up'}
                  size={getResponsiveSizing(24)}
                  color="white"
                />
              </TouchableOpacity>
              <Slider
                style={styles.sliderVolume}
                value={volume}
                minimumValue={0}
                maximumValue={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                onTouchStart={() => setUsingSlider(true)}
                onTouchEnd={() => setUsingSlider(false)}
                minimumTrackTintColor="#8CBA45"
                maximumTrackTintColor="#bababa"
                thumbTintColor="#8CBA45"
              />
            </View>
            <TouchableOpacity onPress={handlePlayPause}>
              <Icon
                name={paused ? 'play-circle' : 'pause-circle'}
                size={getResponsiveSizing(56)}
                color="white"
              />
            </TouchableOpacity>
            <Slider
              style={styles.sliderTime}
              value={currentTime}
              minimumValue={0}
              maximumValue={duration}
              step={0.01}
              onValueChange={handleSeek}
              onTouchStart={() => setUsingSlider(true)}
              onTouchEnd={() => setUsingSlider(false)}
              minimumTrackTintColor="#8CBA45"
              maximumTrackTintColor="#bababa"
              thumbTintColor="#8CBA45"
            />
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: getResponsiveSizing(160 * 1.2),
    height: getResponsiveSizing(90 * 1.2),
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controlsContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sliderVolume: {
    width: '70%',
  },
  sliderTime: {
    width: '85%',
  },
});

export default VideoPlayer;
