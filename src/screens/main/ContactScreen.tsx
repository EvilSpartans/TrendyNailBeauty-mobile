import { styled } from 'nativewind';
import React from 'react';
import { View, ScrollView } from 'react-native';
import ContactForm from '../../forms/ContactForm';

const StyledView = styled(View);

export default function ContactScreen(): React.JSX.Element {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StyledView className="flex-1 items-center bg-white justify-center">
        <ContactForm />
      </StyledView>
    </ScrollView>
  );
}
