import React from 'react';
import { styled } from 'nativewind';
import { Text, View  } from 'react-native';
import SliderComponent from '../components/SliderComponent';
import CategoryComponent from '../components/CategoryComponent';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function HomeScreen(): React.JSX.Element {
    return (
        <StyledView className="flex-1">
            <SliderComponent />
            <CategoryComponent />
        </StyledView>
    );
}
