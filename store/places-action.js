import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces, deletePlace } from '../database/db';
import ENV from '../env';


export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
export const DELETE_PLACE = 'DELETE_PLACE';

export const addPlace = (title, image, description, location) => {
  return async (dispatch) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${
      location.lat
    },${
      location.lng
    }&key=${
      ENV.googleApiKey
    }`);
    if (!response.ok) {
      throw new Error('Something wrong with google geocoding api');
    }
    const resData = await response.json();
    if (!resData || !resData.results) {
      throw new Error('Something wrong with google geocoding api');
    }

    const address = resData.results[0].formatted_address || "";
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
        address, 
        location.lat, 
        location.lng
      );

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title,
          image: newPath,
          description,
          address,
          coords: {
            lat: location.lat, 
            lng: location.lng
          }
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

export const delPlace = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await deletePlace(id);
      dispatch({
        type: DELETE_PLACE,
        delId: id
      })
    } catch (err) {
      throw err;
    }
  };
};