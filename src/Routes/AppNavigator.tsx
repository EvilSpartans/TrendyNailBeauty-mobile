import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import CheckoutScreen from '../screens/shop/CheckoutScreen';
import ProductScreen from '../screens/shop/ProductScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator();

function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Article" component={ProductScreen} />
        <Stack.Screen name="Commande" component={CheckoutScreen} />
        <Stack.Screen name="Connexion" component={LoginScreen} options={{ title: 'Mon compte' }} />
        <Stack.Screen name="Inscription" component={RegisterScreen} options={{ title: 'Mon compte' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
