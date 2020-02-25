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
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
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
      selectedLocation
    });
  }, [selectedLocation]);

  let markerCoordinate;
  if (selectedLocation) {
    markerCoordinate = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      region={mapRegion}
      onRegionChange={changeRegionHandler}
      style={styles.mapView}
      onPress={selectLocationHandler}
    >
      {markerCoordinate &&
        <Marker
          title='Picked Location'
          coordinate={markerCoordinate}>
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