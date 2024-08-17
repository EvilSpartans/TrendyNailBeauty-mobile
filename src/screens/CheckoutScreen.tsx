import { styled } from 'nativewind';
import React from 'react';
import { Text, View  } from 'react-native';

const StyledView = styled(View)
const StyledText = styled(Text)

export default function CheckoutScreen(): React.JSX.Element {
    return (
    <StyledView className="flex-1 items-center justify-center">
        <StyledText className="text-slate-800">Checkout Screen 🎉</StyledText>
    </StyledView>
  )
}