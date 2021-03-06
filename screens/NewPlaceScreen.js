import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import { addPlace } from '../store/places-action';
import ImgPicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';


const NewPlaceScreen = props => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState();
  const [description, setDescription] = useState('');
  const [selectedLocation, setSelectedLocation] = useState();

  const inputChangeHandler = (setChanges, text) => {
    setChanges(text) ;
  };
  const saveHandler = () => {
    dispatch(addPlace(title, image, description, selectedLocation));
    props.navigation.goBack();
  };
  const imageTakenHandler = (uri) => {
    setImage(uri);
  };
  const locationPickedHandler = useCallback((loc) => {
    setSelectedLocation(loc);
  }, []);

  return (
    <ScrollView >
      <View style={styles.form}>
        <Text style={styles.title}>Title</Text>
        <TextInput style={styles.textInput} value={title} onChangeText={inputChangeHandler.bind(this, setTitle)} />
        <Text style={styles.title}>Description</Text>
        <TextInput style={styles.textInput} value={description} onChangeText={inputChangeHandler.bind(this, setDescription)} />
        <ImgPicker 
          onImageTake={imageTakenHandler}
        />
        <LocationPicker 
          navigation={props.navigation} 
          route={props.route} 
          onLocationPicked={locationPickedHandler}
        />
        <Button title='Save' color={Colors.primary} onPress={saveHandler} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  title: {
    fontSize: 18,
    marginBottom: 20
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;