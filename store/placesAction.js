
import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {

  return async dispatch => {
    const fileName = image.split('/').pop(); 
    const newPath = FileSystem.documentDirectory + fileName;

    try { // Can fail because no enough space on devie storage or permission or whatever
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      })
    } catch (error) {
      console.log(error)
      throw error
    }

    dispatch({
      type: ADD_PLACE,
      payload: {
        title,
        image: newPath
      }
    })
  }
}