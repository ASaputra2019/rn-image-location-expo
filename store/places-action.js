export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image, description) => {
  return {
    type: ADD_PLACE,
    placeData: {
      title,
      image,
      description
    }
  };
};