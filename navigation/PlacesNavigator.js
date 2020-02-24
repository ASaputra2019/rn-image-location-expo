import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';
import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import PlacesScreen from '../screens/PlacesScreen';
import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';



const Stack = createStackNavigator();

const PlacesNavigator = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
          },
        }}
      >
        <Stack.Screen
          name="Places"
          component={PlacesScreen}
          options={(navData) => ({
            title: 'All Places',
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Add a place"
                  iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                  onPress={() => { navData.navigation.navigate('NewPlace') }}
                />
              </HeaderButtons>
            )
          })
          }
        />
        <Stack.Screen
          name="PlaceDetail"
          component={PlaceDetailScreen}
          options={(navData) => ({
            title: navData.route.params.placeTitle
          })}
        />
        <Stack.Screen
          name="NewPlace"
          component={NewPlaceScreen}
          options={(navData) => ({
            title: 'New Place' 
          })}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={(navData) => ({
            title: 'Map' 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PlacesNavigator;