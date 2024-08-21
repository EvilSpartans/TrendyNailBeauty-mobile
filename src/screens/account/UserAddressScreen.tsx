import { styled } from 'nativewind';
import React from 'react';
import { ScrollView, View  } from 'react-native';
import AddressForm from '../../forms/AddressForm';

const StyledView = styled(View)

export default function UserAdressScreen(): React.JSX.Element {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 items-center bg-white justify-center">
          <AddressForm />
        </StyledView>
      </ScrollView>
    )
}