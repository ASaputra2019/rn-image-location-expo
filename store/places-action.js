import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../database/db';


export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, description) => {
  return async (dispatch) => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName; // permanent directory

    try {
      FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertPlace(
        title, 
        newPath, 
        description, 
        'Dummy address', 
        15.6, 
        12.3
      );

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title,
          image: newPath,
          description
        }
      });
    } catch (err) {
      throw new Error(err.message);
    }

  }
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({
        type: SET_PLACES,
        places: dbResult.rows._array
      });
    } catch (err) {
      throw err;
    }
  };
};