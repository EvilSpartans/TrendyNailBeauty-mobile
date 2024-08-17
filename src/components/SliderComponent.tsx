import React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { Carousel } from 'react-native-basic-carousel';
import { styled } from 'nativewind';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const images = [
  { 
    source: require('../../assets/images/slider-1.png'), 
    title: "First Slide", 
    subtitle: "This is the first slide" 
  },
  { 
    source: require('../../assets/images/slider-2.png'), 
    title: "Second Slide", 
    subtitle: "This is the second slide" 
  },
  { 
    source: require('../../assets/images/slider-3.png'), 
    title: "Third Slide", 
    subtitle: "This is the third slide" 
  },
];

const StyledView = styled(View);
const StyledText = styled(Text);

export default function SliderComponent(): React.JSX.Element {
    return (
        <StyledView style={{ height: screenHeight * 0.5 }}> 
            <Carousel 
                data={images}
                renderItem={({ item }) => (
                    <StyledView className="w-full justify-center items-center" style={{ height: '100%' }}>
                        <Image 
                            source={item.source ? item.source : null} 
                            style={{ width: screenWidth, height: '100%' }} 
                            resizeMode="cover" 
                            onError={(e) => console.log("Image loading error: ", e.nativeEvent.error)}
                        />
                        <StyledView 
                            className="absolute bottom-8 left-4 p-2 rounded" 
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
                        >
                            <StyledText className="text-white text-lg">
                                {item.subtitle}
                            </StyledText>
                            <StyledText className="text-white text-2xl font-bold">
                                {item.title}
                            </StyledText>
                        </StyledView>
                    </StyledView>
                )}
                itemWidth={screenWidth}
                // onSnapToItem={(index) => console.log(`Image index: ${index}`)}
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
                                    backgroundColor: i === activeIndex ? '#FFEE58' : '#90A4AE',
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
