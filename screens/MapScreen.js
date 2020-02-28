import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const MapScreen = ({navigation, route}) => {
  let initialLocation;
  let readOnly;
  if(route.params) {
    initialLocation = route.params.initLoc;
    readOnly = route.params.readOnly;
  }
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [mapRegion, setMapRegion] = useState({
    latitude: initialLocation ? initialLocation.latitude : 37.78,
    longitude: initialLocation ? initialLocation.longitude : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  const selectLocationHandler = event => {
    if (readOnly) {
      return;
    }
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
    navigation.setParams({
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