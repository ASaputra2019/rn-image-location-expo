import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import PlaceItem from '../components/PlaceItem';


const PlacesScreen = props => {
  const placesArray = useSelector(state => state.places.places);
  return (
    <FlatList
      data={placesArray}
      keyExtractor={item => item.id}
      renderItem={itemData =>
        <PlaceItem
          description={itemData.item.description}
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address=''
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            })
          }}
        />
      } />
  );
};

const styles = StyleSheet.create({});

export default PlacesScreen;