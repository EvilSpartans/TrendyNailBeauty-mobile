import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import CheckoutScreen from '../screens/shop/CheckoutScreen';
import ProductScreen from '../screens/shop/ProductScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ContactScreen from '../screens/main/ContactScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import UserInfoScreen from '../screens/account/UserInfoScreen';
import UserAdressScreen from '../screens/account/UserAddressScreen';
import UserOrdersScreen from '../screens/account/UserOrdersScreen';
import UserPasswordScreen from '../screens/account/UserPasswordScreen';
import ProductsScreen from '../screens/shop/ProductsScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

function AppNavigator(): React.JSX.Element {

  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = !!user.token; 

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false, headerTitle: '' }} />
        <Stack.Screen name="Article" component={ProductScreen} options={{ title: 'Article' }} />
        <Stack.Screen name="AllProducts" component={ProductsScreen} options={{ title: 'Articles' }} />
        <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Nous contacter' }} />
        <Stack.Screen 
          name="Commande" 
          component={isLoggedIn ? CheckoutScreen : LoginScreen} 
          options={{ title: isLoggedIn ? 'Commande' : 'Mon compte' }} 
        />

        {isLoggedIn ? (
          <>
            <Stack.Screen name="userInfo" component={UserInfoScreen} options={{ title: 'Mes informations' }} />
            <Stack.Screen name="userAddress" component={UserAdressScreen} options={{ title: 'Mon adresse' }} />
            <Stack.Screen name="userOrders" component={UserOrdersScreen} options={{ title: 'Mes commandes' }} />
            <Stack.Screen name="updatePassword" component={UserPasswordScreen} options={{ title: 'Mot de passe' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Connexion" component={LoginScreen} options={{ title: 'Mon compte' }} />
            <Stack.Screen name="Inscription" component={RegisterScreen} options={{ title: 'Mon compte' }} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ title: 'Mot de passe oublié' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
