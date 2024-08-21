import { styled } from 'nativewind';
import React from 'react';
import { ScrollView, View  } from 'react-native';
import ProfileForm from '../../forms/ProfileForm';

const StyledView = styled(View)

export default function UserInfoScreen(): React.JSX.Element {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 items-center bg-white justify-center">
          <ProfileForm />
        </StyledView>
      </ScrollView>
    )
}