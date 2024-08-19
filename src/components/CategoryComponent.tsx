/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { getAllCategories } from '../services/category.service';

export default function CategoryComponent(): React.JSX.Element {
  
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.category.categories);
  const status = useSelector((state: RootState) => state.category.status);
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
  const imageBaseUrl = `${BASE_URL}/uploads/images`;

  useEffect(() => {
    if (status === '') { 
      dispatch(getAllCategories({}));
    }
  }, [dispatch, status]);

  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={{marginVertical: 10, marginLeft: 2}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* Petit rond avec # */}
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#ccc',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>#</Text>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#333',
                }}>
                {item.name}
              </Text>
            </View>
            {/* Bouton "Voir tout >" */}
            <TouchableOpacity style={{marginRight: 15}}>
              <Text
                style={{
                  color: '#5EA3CC',
                  borderColor: '#5EA3CC',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10, 
                }}>
                Voir tout &gt;
              </Text>
            </TouchableOpacity>
          </View>
          {/* Compteur des produits */}
          <Text style={{fontSize: 14, color: '#666', marginBottom: 10}}>
            {item.productsCount} produits
          </Text>
          <FlatList
            data={item.products}
            horizontal
            keyExtractor={product => product.id.toString()}
            renderItem={({item: product}) => (
              <View
                style={{
                  marginLeft: 5,
                  marginRight: 5,
                  alignItems: 'center',
                  borderWidth: 5,
                  borderColor: '#fff',
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: '#B3D4EF',
                }}>
                <Image
                  source={{uri: `${imageBaseUrl}/${product.image}`}}
                  style={{width: 100, height: 100, borderRadius: 10}}
                />
                <Text style={{marginTop: 5}}>{product.name}</Text>
                {/* Affichage du prix */}
                <Text style={{marginTop: 5, color: '#333', fontWeight: 'bold'}}>
                  {product.price} €
                </Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false} 
          />
        </View>
      )}
    />
  );
}

