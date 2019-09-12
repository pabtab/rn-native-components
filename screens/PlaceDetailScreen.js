import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PlaceDetailScreen = (props) => {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({})

PlaceDetailScreen.navigationOptions = navData => ({
  headerTitle: navData.navigation.getParam('placeTitle')
})


export default PlaceDetailScreen
