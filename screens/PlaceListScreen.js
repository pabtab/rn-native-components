import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton'



const PlaceListScreen = (props) => {
  return (
    <View>
      <Text>Places list screen</Text>
    </View>
  )
}

PlaceListScreen.navigationOptions = navData => ({
  headerTitle: 'All Places',
  headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item
      title='Add Place'
      iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
      onPress={() => {
        navData.navigation.navigate('NewPlace')
      }}
    />
  </HeaderButtons>
})

const styles = StyleSheet.create({})

export default PlaceListScreen
