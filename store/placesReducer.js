import { ADD_PLACE, SET_PLACES } from "./placesAction"
import Place from "../models/place"

const initialState = {
  places: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case ADD_PLACE:
    const newPlace = new Place(
      payload.id,
      payload.title,
      payload.image,
      payload.address,
      payload.coords.lat,
      payload.coords.lng
    )

    console.log(newPlace)
    return {
      places: state.places.concat(newPlace)
    }

  case SET_PLACES: 
    return {
      places: payload.map(pl => new Place(
        pl.id.toString(),
        pl.title,
        pl.imageUri,
        pl.address,
        pl.coords.lat,
        pl.coords.lng
      ))
    }


  default:
    return state
  }
}
