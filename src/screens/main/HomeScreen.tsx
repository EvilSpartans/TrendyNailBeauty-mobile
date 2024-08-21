import React, { useEffect, useState } from 'react';
import { styled } from 'nativewind';
import { FlatList, View, ActivityIndicator } from 'react-native';
import SliderComponent from '../../components/main/SliderComponent';
import BestProductsComponent from '../../components/shop/BestProductsComponent';
import LastProductsComponent from '../../components/shop/LastProductsComponent';
import ContactComponent from '../../components/main/ContactComponent';

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
    <FlatList
      style={{ backgroundColor: '#fff' }}
      ListHeaderComponent={
        <>
          <SliderComponent images={images} heightFactor={0.75} styleVariant="default" />
        </>
      }
      data={[{ id: 'best-products' }]}
      keyExtractor={(item) => item.id}
      renderItem={() => (
        <StyledView className="flex-1 p-4 bg-white">
          <BestProductsComponent />
          <LastProductsComponent />
          <ContactComponent />
        </StyledView>
      )}
    />
  );
}
