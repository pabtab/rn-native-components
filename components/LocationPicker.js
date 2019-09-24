import React, {useState, useEffect } from 'react'
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native'
import * as Location  from 'expo-location'
import * as Permissions  from 'expo-permissions'
import Colors from '../constants/Colors'
import MapPreview from './MapPreview'

const LocationPicker = (props) => {
  const [isFetching, setisFetching] = useState(false)
  const [pickedLocation, setPickedLocation] = useState()

  const mapPickedLocation = props.navigation.getParam('pickedLocation')

  const { onLocationPicked } = props

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation)
      onLocationPicked(mapPickedLocation)
    }
  }, [mapPickedLocation, onLocationPicked])

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION)
    if (result.status !== 'granted') {
      Alert('Insufficient Permissions!', 'You need to granted Location permission to use this app', [{ text: 'Okay'}])
      return false
    }

    return true
  }

  const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) return

    try {
      setisFetching(true)
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      })

      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      })

      onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      })
    } catch (error) {
      Alert.alert(
        'Couldnt fetch location',
        'Please try again or pick location on the map',
        [{ text: 'Okay'}]
      )
    }

    setisFetching(false)
  }

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map')
  }

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
          {
            isFetching
            ? <ActivityIndicator size="large" color={Colors.primary }/>
            : <Text>No location yet</Text>
          }
        </MapPreview>
      </View>
      <View style={styles.actions}>

        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,

  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center' 
  },
  actions: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%'
  }
})

export default LocationPicker
