import { styled } from 'nativewind';
import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Tabnav } from '../../models/TabNav';
import { logout } from '../../store/slices/userSlice'; 
import Toast from 'react-native-toast-message';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function ProfileScreen(): React.JSX.Element {

  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = !!user.token; 
  const navigation = useNavigation<NavigationProp<Tabnav>>();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    Alert.alert(
      "Confirmation de déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(logout());
            Toast.show({
              type: 'success',
              text1: 'Déconnexion réussie',
              text2: 'Vous êtes maintenant déconnecté(e).',
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <StyledView className="flex-1 items-center bg-white justify-center">
      {isLoggedIn ? (
        <>
          <StyledText className="text-slate-800 text-2xl mb-8 font-bold">{ user.username }</StyledText>

          <StyledView className="w-4/5 mb-4">
            <TouchableOpacity 
              onPress={() => navigation.navigate('userInfo')} 
              style={{
                backgroundColor: '#f0f0f0', 
                padding: 16, 
                borderRadius: 10, 
                alignItems: 'center', 
                marginBottom: 16 
              }}>
              <Text style={{ color: '#333', fontSize: 18 }}>Informations</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => navigation.navigate('userAddress')} 
              style={{
                backgroundColor: '#f0f0f0', 
                padding: 16, 
                borderRadius: 10, 
                alignItems: 'center', 
                marginBottom: 16 
              }}>
              <Text style={{ color: '#333', fontSize: 18 }}>Adresse</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => navigation.navigate('userOrders')} 
              style={{
                backgroundColor: '#f0f0f0', 
                padding: 16, 
                borderRadius: 10, 
                alignItems: 'center', 
                marginBottom: 16 
              }}>
              <Text style={{ color: '#333', fontSize: 18 }}>Commandes</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => navigation.navigate('updatePassword')} 
              style={{
                backgroundColor: '#f0f0f0', 
                padding: 16, 
                borderRadius: 10, 
                alignItems: 'center', 
                marginBottom: 16 
              }}>
              <Text style={{ color: '#333', fontSize: 18 }}>Mot de passe</Text>
            </TouchableOpacity>
          </StyledView>

          <TouchableOpacity 
            onPress={handleLogout} 
            style={{
              backgroundColor: '#cf3982', 
              padding: 16, 
              borderRadius: 10, 
              alignItems: 'center', 
              marginTop: 32,
              width: '80%',
            }}>
            <Text style={{ color: '#fff', fontSize: 18 }}>Déconnexion</Text>
          </TouchableOpacity>
        </>
      ) : (
        <StyledView style={{ marginTop: 32, width: '80%' }}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Connexion')} 
            style={{ 
              backgroundColor: '#cf3982', 
              padding: 16, 
              borderRadius: 10, 
              alignItems: 'center', 
              marginBottom: 16 
            }}>
            <Text style={{ color: '#fff', fontSize: 18 }}>Connexion</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Inscription')} 
            style={{
              backgroundColor: '#fff', 
              borderColor: '#DAA520', 
              borderWidth: 1, 
              padding: 16,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text style={{ color: '#DAA520', fontSize: 18 }}>Inscription</Text>
          </TouchableOpacity>
        </StyledView>
      )}
    </StyledView>
  );
}
