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

export default function FamousProductsComponent(): React.JSX.Element {
    
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
        setProducts(data.products.slice(0, 3)); 
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      } finally {
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <View style={{ paddingVertical: 50 }}>
      {/* Titre principal */}
      <TitleComponent mainText='Meilleures ventes de la semaine' subText="Les articles phares" />

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
              flexDirection: 'row',
              marginRight: 10,
              marginVertical: 10, 
              padding: 16,
              backgroundColor: '#fff',
              borderColor: '#DAA520',
              borderWidth: 1,
              borderRadius: 10,
              alignItems: 'center',
              width: 300, // Largeur augmentée pour les cartes
            }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ marginBottom: 5, textAlign: 'left', color: '#333', fontWeight: 'bold', fontSize: 16 }}>
                {item.name}
              </Text>
              <Text style={{ marginBottom: 5, color: '#DAA520', fontWeight: 'bold', textAlign: 'left', fontSize: 16 }}>
                {item.price} €
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Article', { product: item })}
                style={{
                  backgroundColor: '#fff',
                  borderColor: '#DAA520',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <Text style={{ color: '#DAA520', fontSize: 16 }}>
                  Acheter
                </Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{uri: `${imageBaseUrl}/${item.image}`}}
              style={{ width: 140, height: 140, borderRadius: 10, marginLeft: 10 }} 
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false} 
      />
    </View>
  );
}