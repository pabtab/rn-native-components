
import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES'; 


export const addPlace = (title, image) => {

  return async dispatch => {
    const fileName = image.split('/').pop(); 
    const newPath = FileSystem.documentDirectory + fileName;

    try { // Can fail because no enough space on devie storage or permission or whatever
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      })

      const dbResult = await insertPlace(title, image, 'mock address', 15.6, 12.3)
      console.log(dbResult)

      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title,
          image: newPath
        }
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces()
      console.log(dbResult)
      dispatch({ type: SET_PLACES, payload: dbResult.rows._array})
    } catch (error) {
      throw error
    }
  }
}