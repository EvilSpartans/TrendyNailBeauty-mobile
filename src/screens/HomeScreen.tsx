/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, View} from 'react-native';
import {styled} from 'nativewind';
import CategoryComponent from '../components/CategoryComponent';
import SliderComponent from '../components/SliderComponent';
import SearchComponent from '../components/SearchComponent';

const StyledView = styled(View);

export default function HomeScreen(): React.JSX.Element {
  return (
    <ScrollView style={{flex: 1}}>
      <StyledView className="flex-1 p-4">
        <SearchComponent />
        <SliderComponent />
        <CategoryComponent />
      </StyledView>
    </ScrollView>
  );
}
