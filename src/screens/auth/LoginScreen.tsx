import { styled } from 'nativewind';
import React from 'react';
import { View, ScrollView } from 'react-native';
import LoginForm from '../../forms/LoginForm';

const StyledView = styled(View);

export default function LoginScreen(): React.JSX.Element {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StyledView className="flex-1 items-center bg-white justify-center">
        <LoginForm />
      </StyledView>
    </ScrollView>
  );
}
