import { styled } from 'nativewind';
import React from 'react';
import { View, ScrollView } from 'react-native';
import RegisterForm from '../../forms/RegisterForm';

const StyledView = styled(View);

export default function RegisterScreen(): React.JSX.Element {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StyledView className="flex-1 items-center bg-white justify-center">
        <RegisterForm />
      </StyledView>
    </ScrollView>
  );
}
