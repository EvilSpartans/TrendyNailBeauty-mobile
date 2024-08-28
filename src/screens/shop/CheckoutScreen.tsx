import { styled } from 'nativewind';
import React from 'react';
import { ScrollView, View  } from 'react-native';
import OrderForm from '../../forms/OrderForm';

const StyledView = styled(View)

export default function CheckoutScreen(): React.JSX.Element {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 items-center bg-white justify-center">
          <OrderForm />
        </StyledView>
      </ScrollView>
  )
}