import React, { useEffect, useState } from 'react';
import { styled } from 'nativewind';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import SliderComponent from '../components/SliderComponent';
import HeaderComponent from '../components/HeaderComponent';

const StyledView = styled(View);

export default function HomeScreen(): React.JSX.Element {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
  const imageBaseUrl = `${BASE_URL}/uploads/images`;

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/sliders`);
        const data = await response.json();
        
        const sliders = data.map((slider: any) => ({
          id: slider.id,
          source: { uri: `${imageBaseUrl}/${slider.image}` },
          title: slider.title,
          subtitle: slider.subtitle,
        }));

        setImages(sliders);
      } catch (error) {
        console.error('Erreur lors de la récupération des sliders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  if (loading) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#7BB8E3" />
      </StyledView>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <StyledView className="flex-1 p-4 bg-white">
        <HeaderComponent />
        <SliderComponent images={images} heightFactor={0.7} styleVariant="default" />
      </StyledView>
    </ScrollView>
  );
}
