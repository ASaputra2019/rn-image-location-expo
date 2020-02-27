import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const MapScreen = props => {
  const [selectedLocation, setSelectedLocation] = useState()
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  const selectLocationHandler = event => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude
    });
  };

  const changeRegionHandler = region => {
    setMapRegion(region);
  };

  useEffect(() => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.setParams({
      pickedLocation: {
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude
      }
    });
  }, [selectedLocation]);

  return (
    <MapView
      region={mapRegion}
      onRegionChangeComplete={changeRegionHandler}
      style={styles.mapView}
      onPress={selectLocationHandler}
    >
      {selectedLocation &&
        <Marker
          title='Picked Location'
          coordinate={selectedLocation}>
        </Marker>
      }
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  }
});

export default MapScreen;