import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Cities from './pages/Cities';
import Restaurants from './pages/Restaurants';
import RestaurantDetails from './pages/RestaurantDetails';

const Stack = createStackNavigator();


const Router = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cities" node="card" headerMode='none'>
        <Stack.Screen name="Cities" component={Cities} />

        <Stack.Screen name="Restaurants" component={Restaurants}
          options={({ route }) => ({ name: route.params.name })}
        />

        <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Router;
