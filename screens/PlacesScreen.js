import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places-action';


const PlacesScreen = props => {
  const placesArray = useSelector(state => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={placesArray}
      keyExtractor={item => item.id}
      renderItem={itemData => {
        return (
          <PlaceItem
            title={itemData.item.title}
            image={itemData.item.imageUri}
            description={itemData.item.description}
            address={itemData.item.address}
            onSelect={() => {
              props.navigation.navigate('PlaceDetail', {
                placeTitle: itemData.item.title,
                placeId: itemData.item.id
              })
            }}
          />
        )
      }
      } />
  );
};

const styles = StyleSheet.create({});

export default PlacesScreen;