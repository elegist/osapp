import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to my app!</Text>
        <Button title="Go to test screen" onPress={() => navigation.navigate('Test')} />
    </View>
  )
}

const styles = StyleSheet.create({})