import { styled } from 'nativewind';
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import TitleComponent from './TitleComponent';
import LogoComponent from './LogoComponent';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Tabnav } from '../../models/TabNav';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function ContactComponent(): React.JSX.Element {

  const navigation = useNavigation<NavigationProp<Tabnav>>();

  return (
    <StyledView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16, paddingVertical: 50 }}>
        
        {/* Titre principal */}
        <TitleComponent mainText='Nous contacter' subText="Besoin d'aide ?" />

        {/* Bouton Contacter */}
        <StyledView className="mb-12">
          <TouchableOpacity 
              onPress={() => navigation.navigate('Contact')}
              style={{ backgroundColor: '#cf3982', padding: 16, borderRadius: 10, alignItems: 'center', marginBottom: 16 }}
            >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Nous contacter</Text>
            </TouchableOpacity>

        {/* Informations de contact */}
          <StyledView className="space-y-2 mt-8">
            <StyledText className="text-sm text-slate-600 text-center">
              📧 Email : contact@tnbeauty.com
            </StyledText>
            <StyledText className="text-sm text-slate-600 text-center">
              ☎️ Téléphone : 07 10 20 12 55
            </StyledText>
            <StyledText className="text-sm text-slate-600 text-center">
              📍 Adresse : 84 Rue de la paix, Toulouse, France
            </StyledText>
          </StyledView>
        </StyledView>

        {/* Footer */}
        <LogoComponent />
      </ScrollView>
    </StyledView>
  );
}
