import React, { useCallback } from 'react';
import { ScrollView, Image, View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { delPlace } from '../store/places-action';


const PlaceDetailScreen = ({ navigation, route }) => {
  const placeId = route.params.placeId;
  const selectedPlace = useSelector(state => state.places.places.find(place => place.id === placeId));
  const imageClickHandler = useCallback(() => {
    navigation.navigate("Picture", {
      desc: selectedPlace.description,
      pic: selectedPlace.imageUri
    });
  }, []);

  const dispatch = useDispatch();
  const deleteHandler = () => {
    navigation.navigate('Places');
    dispatch(delPlace(placeId));
  };

  return selectedPlace ? (
    <ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%' }}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={imageClickHandler}
      >
        <Image
          style={styles.image}
          source={{ uri: selectedPlace.imageUri }}
        />
      </TouchableOpacity>
      <View style={styles.addressContainer}>
        <Text>{selectedPlace.description}</Text>
      </View>
      <View style={styles.locContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={{
            lat: selectedPlace.lat,
            lng: selectedPlace.lng
          }}
          navigation={navigation}
          route={route}
          onPress={() => {
            navigation.navigate("Map", {
              readOnly: true,
              initLoc: {
                latitude: selectedPlace.lat,
                longitude: selectedPlace.lng
              }
            });
          }}
        />
      </View>
      <View style={styles.button} >
        <Button title='DELETE' onPress={deleteHandler} />
      </View>
    </ScrollView>
  ): <View></View>;
};

const styles = StyleSheet.create({
  imageContainer: {
    height: '35%',
    minHeight: 300,
    minWidth: '100%',
    backgroundColor: '#ccc'
  },
  image: {
    flex: 1,
  },
  locContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  button: {
    marginBottom: 50,
    width: '100%',
    maxWidth: 350,
  }
});

export default PlaceDetailScreen;