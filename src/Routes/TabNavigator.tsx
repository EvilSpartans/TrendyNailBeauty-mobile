import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import { Tabnav } from '../models/TabNav';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator<Tabnav>();

function TabNavigator(): React.JSX.Element {

  const cartItemsCount = useSelector((state: RootState) => state.cart.items.length); 
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#cf3982',
        tabBarInactiveTintColor: '#8e8e8f',
        tabBarStyle: {
          backgroundColor: '#ffffff',
        },
      }}
    >
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
        name="Panier" 
        component={CartScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={{ position: 'relative' }}>
              <Icon name="shopping-cart" color={color} size={size} />
              {cartItemsCount > 0 && (
                <View style={{ 
                  position: 'absolute', 
                  right: -10, 
                  top: -10, 
                  backgroundColor: '#cf3982', 
                  borderRadius: 10, 
                  width: 20, 
                  height: 20, 
                  justifyContent: 'center', 
                  alignItems: 'center' 
                }}>
                  <Text style={{ color: '#fff', fontSize: 12 }}>{cartItemsCount}</Text>
                </View>
              )}
            </View>
          ),
        }} 
      />
      <Tab.Screen 
        name="Profil" 
        component={ProfileScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
