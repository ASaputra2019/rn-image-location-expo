import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';


const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [loc, setLoc] = useState();
  let mapPickedLocation = props.route.params ? props.route.params.pickedLocation : null ;

  const { onLocationPicked } = props;

  useEffect(() => {
    if (mapPickedLocation) {
      setLoc(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Need Permission',
        'You have to grant permission to access Location to use this app.',
        [{ text: 'OK' }]
      );
      return false;
    } else {
      return true;
    }
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      let location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setLoc({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch (err) {
      Alert.alert('Location Undetected', 'Could not find your location. Please try again, or pick from the map.', [{ text: "OK" }])
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={loc}
        onPress={pickOnMapHandler}
      >
        {isFetching ?
          <ActivityIndicator size='large' color={Colors.primary} /> :
          <Text>No location chosen yet.</Text>
        }
      </MapPreview>
      <View style={styles.buttonContainer}>
        <Button title="Get location" color={Colors.primary} onPress={getLocationHandler} />
        <Button title="Pick on map" color={Colors.primary} onPress={pickOnMapHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default LocationPicker;