/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledImage = styled(Image);

export default function LogoComponent(): React.JSX.Element {
  return (
    <StyledView className="flex items-center py-1">
      <StyledImage
        source={require('../../../assets/images/logo.png')}
        className="w-40 h-12" 
        resizeMode="contain"
      />
    </StyledView>
  );
}
