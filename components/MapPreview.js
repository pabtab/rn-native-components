import React from 'react'
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import vars from '../env'

const MapPreview = ({location, children, style, onPress}) => {
  let imagePreviewUrl;

  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=13&size=400x200&maptype=roadmap
    &markers=color:green%7Clabel:A%7C${location.lat},${location.lng}
    &key=${vars.googleApiKey}`
  }

  return (
    <TouchableOpacity onPress={onPress} style={{...styles.mapPreview, ...style}}>
      {
        location 
        ? <Image style={styles.mapImage} source={{uri: imagePreviewUrl}} />
        : children
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
})

export default MapPreview
