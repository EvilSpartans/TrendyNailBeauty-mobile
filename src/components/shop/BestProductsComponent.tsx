/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/Store';
import { NavigationProp, useNavigation } from '@react-navigation/native'; 
import { Tabnav } from '../../models/TabNav';
import { getAllProducts } from '../../services/product.service';
import { Product } from '../../models/Product';
import { unwrapResult } from '@reduxjs/toolkit';
import TitleComponent from '../main/TitleComponent';

export default function BestProductsComponent(): React.JSX.Element {
    
  const [products, setProducts] = useState<Product[]>([]); 
  const dispatch = useDispatch<AppDispatch>();
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
  const imageBaseUrl = `${BASE_URL}/uploads/images`;
  const navigation = useNavigation<NavigationProp<Tabnav>>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resultAction = await dispatch(getAllProducts({ sortBy: 'price_asc' }));
        const data = unwrapResult(resultAction);
        setProducts(data.products.slice(0, 7)); 
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      } finally {
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <View style={{ paddingVertical: 50, backgroundColor: '#fafafa', borderRadius: 20  }}>
      {/* Titre principal */}
      <TitleComponent mainText='Explorer les articles' subText="Populaire sur la boutique" />

      {/* Liste horizontale des produits */}
      <FlatList
        key={'horizontal'} 
        data={products}
        horizontal={true} 
        contentContainerStyle={{ paddingHorizontal: 16 }} 
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Article', { product: item })} 
            style={{
              marginRight: 12,
              marginVertical: 12, 
              alignItems: 'center',
              padding: 14,
              backgroundColor: '#fff',
              borderRadius: 15,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 5,
              width: 160, // Augmentation de la largeur pour des cartes plus grandes
            }}>
            <Image
              source={{uri: `${imageBaseUrl}/${item.image}`}}
              style={{ width: 140, height: 140, borderRadius: 10 }} 
              resizeMode="cover"
            />
            <Text style={{ marginTop: 10, textAlign: 'center', color: '#333', fontWeight: 'bold', fontSize: 16 }}>
              {item.name}
            </Text>
            <Text style={{ marginTop: 5, color: '#DAA520', fontWeight: 'bold', textAlign: 'center', fontSize: 14 }}>
              {item.price} €
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false} 
      />
    </View>
  );
}