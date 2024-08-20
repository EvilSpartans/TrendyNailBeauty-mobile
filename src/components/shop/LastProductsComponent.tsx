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

export default function LastProductsComponent(): React.JSX.Element {
    
  const [products, setProducts] = useState<Product[]>([]); 
  const dispatch = useDispatch<AppDispatch>();
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
  const imageBaseUrl = `${BASE_URL}/uploads/images`;
  const navigation = useNavigation<NavigationProp<Tabnav>>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resultAction = await dispatch(getAllProducts({ sortBy: 'price_desc' }));
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
    <View style={{ paddingVertical: 16 }}>
      {/* Titre principal centré */}
      <TitleComponent mainText='À découvrir' subText="Nouvelles tendances" />

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
              marginRight: 10,
              marginVertical: 10, 
              alignItems: 'center',
              padding: 10,
              backgroundColor: '#fff',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              width: 140,
            }}>
            <Image
              source={{uri: `${imageBaseUrl}/${item.image}`}}
              style={{ width: 120, height: 120, borderRadius: 10 }} 
              resizeMode="cover"
            />
            <Text style={{ marginTop: 5, textAlign: 'center', color: '#333', fontWeight: 'bold' }}>
              {item.name}
            </Text>
            <Text style={{ marginTop: 5, color: '#DAA520', fontWeight: 'bold', textAlign: 'center' }}>
              {item.price} €
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false} 
      />
    </View>
  );
}
