import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import globalStyles from '../styles/GlobalStyleSheet';

/**
 * SummaryScreen - presents an overall summary of the finished OSA for the user to review
 */
export default function SummaryScreen({ navigation, route }) {

  return (
    <View style={globalStyles.flexContainer}>
        <Text>This is going to becoma a fully functional summary screen at some point.</Text>
    </View>
  );
}


const styles = StyleSheet.create({
});
