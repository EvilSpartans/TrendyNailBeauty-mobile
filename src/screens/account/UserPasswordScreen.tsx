import { styled } from 'nativewind';
import React from 'react';
import { ScrollView, View  } from 'react-native';
import UpdatePasswordForm from '../../forms/UpdatePasswordForm';

const StyledView = styled(View)

export default function UserPasswordScreen(): React.JSX.Element {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 items-center bg-white justify-center">
          <UpdatePasswordForm />
        </StyledView>
      </ScrollView>
    )
}