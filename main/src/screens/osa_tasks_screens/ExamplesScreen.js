import {TouchableOpacity, Text, View, ImageBackground, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import globalStyles from '../../styles/GlobalStyleSheet';
import ExamplesGrid from './ExamplesGrid';

export class ExamplesScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const source =
      typeof this.props.route !== 'undefined'
        ? this.props.route.params.source
        : this.props.source;
    // conditional rendering depending on the calling component- drawer or task manager:
    if (source === 'drawer') {
      return (
        <ImageBackground
          source={require('../../assets/Background.png')}
          style={globalStyles.mainBackground}>
          <Text style={styles.heading}>MI Examples Screen called from source: {source}</Text>
          <ExamplesGrid />
        </ImageBackground>
      );
    } else if (source === 'tasks') {
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>{this.props.title}</Text>
          {/* Additional UI elements related to ExamplesTask */}
          <ExamplesGrid />

          {source !== 'drawer' && (
            <TouchableOpacity onPress={this.props.nextTask} style={globalStyles.smallButton}>
              <Text style={globalStyles.textSmallButton}>Weiter</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={require('../../assets/Background.png')}
          style={globalStyles.mainBackground}>
          <Text style={styles.heading}>
            MI Examples Screen called from unkown but defined source: {source}
          </Text>
          <ExamplesGrid />
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'PTSans-Regular',
    fontSize: 25,
    color: '#1C2327',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default ExamplesScreen
