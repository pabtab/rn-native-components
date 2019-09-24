
import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';
import vars from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES'; 


const getAddress =  async (location) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${vars.googleApiKey}`)

  if (!response.ok) {
    throw new Error('Something went wrong!')
  }

  const resData = await response.json()

  if (!resData.results) throw new Error('Something went wrong!')

  return resData.results[0].formatted_address
}

export const addPlace = (title, image, location) => {

  return async dispatch => {
    const address = await getAddress(location)
    const fileName = image.split('/').pop(); 
    const newPath = FileSystem.documentDirectory + fileName;

    try { // Can fail because no enough space on devie storage or permission or whatever
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      })

      const dbResult = await insertPlace(title, image, address, location.lat, location.lng)

      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title,
          image: newPath,
          address,
          coords: {
            lat: location.lat,
            lng: location.lng
          }
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
      dispatch({ type: SET_PLACES, payload: dbResult.rows._array})
    } catch (error) {
      throw error
    }
  }
}