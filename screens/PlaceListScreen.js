import React, {useEffect} from 'react'
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton'
import PlaceItem from '../components/PlaceItem'
import { loadPlaces } from '../store/placesAction'



const PlaceListScreen = (props) => {

  const places = useSelector(state => state.Places.places)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaces())
  }, [dispatch])

  return (
    <FlatList 
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (<PlaceItem
        image={itemData.item.imageUri}
        title={itemData.item.title}
        address={itemData.item.address}
        onSelect={() => {
          props.navigation.navigate('PlacesDetail', {
            placeTitle: itemData.item.title,
            placeId: itemData.item.id
          })
        }}
      />)}
    />
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
