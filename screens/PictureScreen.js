import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions } from 'react-native';


const PicScreen = props => {
  const width = Dimensions.get('window').height * 16 / 9 * 0.89;
  const image = props.route.params.pic;
  return(
    <ScrollView contentContainerStyle={styles.container} horizontal={true} >
      <Image source={{ uri: image }} style={{...styles.image, width: width}} resizeMode="cover"/>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
  },
  image: {
    minHeight: "100%",
    height: "100%"
  }
});

export default PicScreen;