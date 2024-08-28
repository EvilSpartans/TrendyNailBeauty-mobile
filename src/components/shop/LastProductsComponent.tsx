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
        setProducts(data.products.slice(0, 4));
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      } finally {
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <View style={{ paddingVertical: 50, backgroundColor: '#fafafa', borderRadius: 20 }}>
      {/* Titre principal centré */}
      <TitleComponent mainText='À découvrir' subText="Nouvelles tendances" />

      {/* Liste des produits en grille */}
      <FlatList
        key={'vertical'} 
        data={products}
        numColumns={2} 
        contentContainerStyle={{ paddingHorizontal: 10 }} 
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Article', { product: item })} 
            style={{
              flex: 1,
              margin: 10, 
              alignItems: 'center',
              padding: 14,
              backgroundColor: '#fff',
              borderRadius: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              elevation: 6,
            }}>
            <Image
              source={{uri: `${imageBaseUrl}/${item.image}`}}
              style={{ width: 160, height: 160, borderRadius: 15, marginBottom: 12 }} 
              resizeMode="cover"
            />
            <Text style={{ marginTop: 8, textAlign: 'center', color: '#333', fontWeight: 'bold', fontSize: 16 }}>
              {item.name}
            </Text>
            <Text style={{ marginTop: 6, color: '#DAA520', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>
              {item.price} €
            </Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false} 
      />
    </View>
  );
}