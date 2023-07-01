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
import globalStyles from '../styles/GlobalStyleSheet';

const {width, height} = Dimensions.get('window');

const VideoPlayer = ({onLoad, video, thumbnail}) => {
  const videoRef = useRef(null);
  const [aspectRatio, setAspectRatio] = useState({width: 16, height: 9});
  const [paused, setPaused] = useState(true);
  const [stopped, setStopped] = useState(true);
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

  const handleLoad = event => {
    const {naturalSize} = event;
    setAspectRatio({width: naturalSize.width, height: naturalSize.height});
  };

  const handlePlayPause = () => {
    setPaused(!paused);
    setStopped(false);
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

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={{...styles.absoluteContainer, backgroundColor: 'black'}} />
      {stopped ? (
        <FastImage
          source={ImageMapper.getImagePath(thumbnail)}
          style={styles.video}
          resizeMode={FastImage.resizeMode.cover}
          onLoad={onLoad}
        />
      ) : (
        <Video
          ref={videoRef}
          style={{
            ...styles.video,
            aspectRatio: aspectRatio.width / aspectRatio.height,
            maxHeight: height / 1.4,
          }}
          source={ImageMapper.getImagePath(video)}
          onLoad={handleLoad}
          rate={paused ? 0 : 1}
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
            <View style={styles.sliderContainer}>
              <TouchableOpacity style={{flex: 1}} onPress={handleMuteUnmute}>
                <Icon
                  name={muted ? 'volume-off' : 'volume-up'}
                  size={getResponsiveSizing(24)}
                  color="#8CBA45"
                />
              </TouchableOpacity>
              <Slider
                style={{flex: 6}}
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
                size={getResponsiveSizing(62)}
                color="#8CBA45"
              />
            </TouchableOpacity>
            <View style={styles.sliderContainer}>
              <Slider
                style={{flex: 8}}
                value={currentTime}
                disabled={stopped}
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
              <Text style={{...globalStyles.textSecondary, color: 'white'}}>
                {duration > 0
                  ? `${formatTime(currentTime)} / ${formatTime(duration)}`
                  : '--:-- / --:--'}
              </Text>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '100%',
    height: '100%',
    aspectRatio: 16 / 9,
  },
  controlsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
  },
  sliderVolume: {
    width: '70%',
  },
  sliderTime: {
    width: '85%',
  },
});

export default VideoPlayer;
