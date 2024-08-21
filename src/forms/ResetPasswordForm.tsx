import { styled } from 'nativewind';
import React from 'react';
import { Text, View  } from 'react-native';

const StyledView = styled(View)
const StyledText = styled(Text)

export default function ResetPasswordForm(): React.JSX.Element {
    return (
    <StyledView className="flex-1 items-center bg-white justify-center">
        <StyledText className="text-slate-800">Form🎉</StyledText>
    </StyledView>
  )
}