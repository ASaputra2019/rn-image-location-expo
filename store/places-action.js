import * as FileSystem from 'expo-file-system';


export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image, description) => {
  return async (dispatch) => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName; // permanent directory

    try {
      FileSystem.moveAsync({
        from: image,
        to: newPath
      });
    } catch (err) {
      throw new Error(err.message);
    }

    dispatch({
      type: ADD_PLACE,
      placeData: {
        title,
        image: newPath,
        description
      }
    });
  }
};