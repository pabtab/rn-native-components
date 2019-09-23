import React, {useState} from 'react'
import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

import Colors from '../constants/Colors'

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState()

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    if (result.status !== 'granted') {
      Alert('Insufficient Permissions!', 'You need to granted camera permission to use this app', [{ text: 'Okay'}])
      return false
    }

    return true
  }

  const takeImageHandler = async () => {
    const hasPermissions = await verifyPermissions();

    if (!hasPermissions) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // crop image
      aspect: [16, 9],
      quality: 0.5
    });

    setPickedImage(image.uri)
    props.onImageTaken(image.uri)
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        { pickedImage 
          ? <Image style={styles.image} source={{uri: pickedImage}} />
          : <Text>No images picked</Text>
        }
      </View> 
      <Button 
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
})

export default ImgPicker
