import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import ImageMapper from '../screens/helper/ImageMapper';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import {getResponsiveSizing} from '../styles/GlobalStyleSheet';

const VideoPlayer = ({video, thumbnail}) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={{width: '14%'}} onPress={handleMuteUnmute}>
          <Icon
            name={muted ? 'volume-off' : 'volume-up'}
            size={getResponsiveSizing(36)}
            color="black"
          />
        </TouchableOpacity>
        <Slider
          value={volume}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          vertical={true}
          style={styles.slider}
          minimumTrackTintColor="#8CBA45"
          maximumTrackTintColor="#bababa"
          thumbTintColor="#8CBA45"
        />
      </View>

      {paused ? (
        <FastImage
          source={ImageMapper.getImagePath(thumbnail)}
          style={{
            width: getResponsiveSizing(320),
            height: getResponsiveSizing(180),
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      ) : (
        <Video
          ref={videoRef}
          source={ImageMapper.getImagePath(video)}
          paused={paused}
          muted={muted}
          volume={volume}
          onProgress={handleProgress}
          resizeMode="contain"
          style={{
            width: getResponsiveSizing(320),
            height: getResponsiveSizing(180),
          }}
        />
      )}

      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={handlePlayPause}>
          <Icon
            name={paused ? 'play-circle-o' : 'pause-circle-o'}
            size={getResponsiveSizing(40)}
            color="black"
          />
        </TouchableOpacity>

        <Slider
          value={currentTime}
          minimumValue={0}
          maximumValue={duration}
          step={0.01}
          onValueChange={handleSeek}
          style={styles.slider}
          minimumTrackTintColor="#8CBA45"
          maximumTrackTintColor="#bababa"
          thumbTintColor="#8CBA45"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  controlsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  slider: {
    width: '70%',
  },
});

export default VideoPlayer;
