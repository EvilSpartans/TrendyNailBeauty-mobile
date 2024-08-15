import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

function TabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen 
        name="Accueil" 
        component={HomeScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Rechercher" 
        component={SearchScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Articles" 
        component={ProductScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
