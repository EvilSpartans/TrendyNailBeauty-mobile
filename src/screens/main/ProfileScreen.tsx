import { styled } from 'nativewind';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Tabnav } from '../../models/TabNav';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function ProfileScreen(): React.JSX.Element {
  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = !!user.token; 
  const navigation = useNavigation<NavigationProp<Tabnav>>();

  return (
    <StyledView className="flex-1 items-center bg-white justify-center">
      {isLoggedIn ? (
        <StyledText className="text-slate-800">Page de profil 🎉</StyledText>
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
