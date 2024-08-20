/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Carousel } from 'react-native-basic-carousel';
import { styled } from 'nativewind';

const { width: screenWidth } = Dimensions.get('window');

const StyledView = styled(View);
const StyledText = styled(Text);

type SliderComponentProps = {
  images: Array<{
    id: string;
    source: any;
    title: string;
    subtitle: string;
  }>;
  heightFactor?: number;
  styleVariant?: 'default' | 'discover'; 
};

export default function SliderComponent({
  images,
  heightFactor = 0.6,
  styleVariant = 'default',
}: SliderComponentProps): React.JSX.Element {
  const screenHeight = Dimensions.get('window').height;

  const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://default-url.com';

  return (
    <StyledView 
      style={{
        height: screenHeight * heightFactor,
        backgroundColor: '#B3D4EF', 
        borderRadius: 10, 
        overflow: 'hidden', 
        borderColor: '#fff',
        borderWidth: 5, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 5, 
        elevation: 3, 
      }}
    >
      <Carousel
        data={images}
        renderItem={({ item }) => (
          <StyledView className="w-full justify-center items-center" style={{ height: '100%' }}>
            <Image
              source={item.source ? item.source : null}
              style={{ width: screenWidth, height: '100%' }}
              resizeMode="cover"
              onError={(e) => console.log('Image loading error: ', e.nativeEvent.error)}
            />
            {styleVariant === 'default' ? (
              <StyledView
                className="absolute bottom-8 left-4 p-2 rounded"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
              >
                <StyledText className="text-white text-lg">
                  {item.subtitle}
                </StyledText>
                <StyledText className="text-white text-2xl font-bold">
                  {item.title}
                </StyledText>
              </StyledView>
            ) : (
            <StyledView
              className="absolute left-4 justify-center" 
              style={{ height: '100%' }} 
            >
              <TouchableOpacity
                onPress={() => {
                  const url = `${BASE_URL}/category/${item.id}`;
                }}
                style={{
                  backgroundColor: '#FFEE58',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: '#fff',
                }}
              >
                <StyledText className="text-black text-lg font-bold">
                  Découvrir &rarr;
                </StyledText>
              </TouchableOpacity>
            </StyledView>
            )}
          </StyledView>
        )}
        itemWidth={screenWidth}
        autoplay
        customPagination={({ activeIndex }) => (
          <StyledView className="absolute bottom-4 left-0 right-0 flex-row justify-center">
            {images.map((_, i) => (
              <View
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: i === activeIndex ? '#cf3982' : '#90A4AE',
                  marginHorizontal: 3,
                }}
              />
            ))}
          </StyledView>
        )}
      />
    </StyledView>
  );
}
