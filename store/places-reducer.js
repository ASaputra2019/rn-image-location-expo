import { ADD_PLACE, SET_PLACES, DELETE_PLACE } from './places-action';
import Place from '../models/place';


const initialState = {
  places: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(), 
        action.placeData.title, 
        action.placeData.image,
        action.placeData.description,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );
      return {
        places: state.places.concat(newPlace)
      };
    case SET_PLACES:
      return {
        places: action.places.map(p => new Place(
          p.id.toString(),
          p.title,
          p.imageUri,
          p.description,
          p.address,
          p.lat,
          p.lng
        ))
      }
    case DELETE_PLACE:
      return {
        places: state.places.filter(p => p.id != action.delId)
      }
    default:
      return state;
  };
};