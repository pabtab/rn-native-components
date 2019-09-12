import { ADD_PLACE } from "./placesAction"
import Place from "../models/place"

const initialState = {
  places: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case ADD_PLACE:
    const newPlace = new Place(new Date().toString(), payload.title)
    return {
      places: state.places.concat(newPlace)
    }

  default:
    return state
  }
}
