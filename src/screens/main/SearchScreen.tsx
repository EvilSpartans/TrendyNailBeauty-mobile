import React from 'react';
import { styled } from 'nativewind';
import { FlatList, View } from 'react-native';
import SearchComponent from '../../components/main/SearchComponent';
import SliderComponent from '../../components/main/SliderComponent';
import CategoryComponent from '../../components/shop/CategoryComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';

const StyledView = styled(View);

export default function SearchScreen(): React.JSX.Element {

    const categories = useSelector((state: RootState) => state.category.categories);
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
    const imageBaseUrl = `${BASE_URL}/uploads/images`;
    const sliderImages = categories.map(category => ({
        id: category.id,
        source: { uri: `${imageBaseUrl}/${category.image}` },
        title: category.name,
        subtitle: '',
    }));

    return (
        <FlatList
          style={{ backgroundColor: '#fff' }}
          ListHeaderComponent={
            <StyledView className="flex-1 bg-white"> 
            <StyledView className="flex-1 p-4 bg-white">
              <SearchComponent />
            </StyledView>
              <SliderComponent images={sliderImages} heightFactor={0.3} styleVariant="discover" />
            </StyledView>
          }
          data={[{id: 'categories'}]} 
          keyExtractor={(item) => item.id}
          renderItem={() => (
            <StyledView className="flex-1 p-4 bg-white">
              <CategoryComponent />
            </StyledView>
          )}
        />
      );
}
