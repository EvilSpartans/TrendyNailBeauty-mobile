import { styled } from 'nativewind';
import React from 'react';
import { View, ScrollView } from 'react-native';
import ResetPasswordForm from '../../forms/ResetPasswordForm';

const StyledView = styled(View);

export default function ResetPasswordScreen(): React.JSX.Element {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StyledView className="flex-1 items-center bg-white justify-center">
        <ResetPasswordForm />
      </StyledView>
    </ScrollView>
  );
}
