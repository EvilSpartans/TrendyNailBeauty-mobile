import React from 'react';
import { styled } from 'nativewind';
import { Text, View  } from 'react-native';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function CartScreen(): React.JSX.Element {
    return (
        <StyledView className="flex-1">
            <StyledView className="flex-1 items-center justify-center">
                <StyledText className="text-slate-800">Cart Screen 🎉</StyledText>
            </StyledView>
        </StyledView>
    );
}
