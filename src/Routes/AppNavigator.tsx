import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import CheckoutScreen from '../screens/CheckoutScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createNativeStackNavigator();

function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Article" component={ProductScreen} />
        <Stack.Screen name="Commande" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
