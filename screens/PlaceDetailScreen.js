import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import {useSelector} from 'react-redux'
import MapPreview from '../components/MapPreview'
import Colors from '../constants/Colors'

const PlaceDetailScreen = (props) => {
  const placeId = props.navigation.getParam('placeId');
  const selectedPlace = useSelector(state => state.Places.places.find(place => place.id === placeId))

  const showMapHandler = () => {
    props.navigation.navigate('Map', {readonly: true, initialLocation: selectedLocation})
  }

  const selectedLocation = {lat: selectedPlace.lat, lng: selectedPlace.lng}

  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <Image style={styles.image} source={{uri: selectedPlace.imageUri}} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview style={styles.mapPreview} location={selectedLocation} onPress={showMapHandler} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc'
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
})

PlaceDetailScreen.navigationOptions = navData => ({
  headerTitle: navData.navigation.getParam('placeTitle')
})


export default PlaceDetailScreen
