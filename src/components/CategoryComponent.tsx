/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { getAllCategories } from '../services/category.service';
import { NavigationProp, useNavigation } from '@react-navigation/native'; 
import { Tabnav } from '../models/TabNav';

export default function CategoryComponent(): React.JSX.Element {
  
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.category.categories);
  const status = useSelector((state: RootState) => state.category.status);
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
  const imageBaseUrl = `${BASE_URL}/uploads/images`;
  const navigation = useNavigation<NavigationProp<Tabnav>>();

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
        <View style={{marginVertical: 5, marginLeft: 2}}> 
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#b3c335',
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
            <TouchableOpacity style={{marginRight: 15}}>
              <Text
                style={{
                  color: '#cf3982',
                  borderColor: '#cf3982',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10, 
                }}>
                Voir tout &gt;
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 14, color: '#666', marginBottom: 5}}>
            {item.productsCount} produits
          </Text>
          <FlatList
            data={item.products}
            horizontal
            keyExtractor={product => product.id.toString()}
            renderItem={({item: product}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Article', { product })} 
                style={{
                  marginLeft: 5,
                  marginRight: 5,
                  alignItems: 'center',
                  borderWidth: 0, 
                  padding: 5,
                  backgroundColor: 'transparent',
                  width: 140,
                }}>
                <Image
                  source={{uri: `${imageBaseUrl}/${product.image}`}}
                  style={{width: 130, height: 130, borderRadius: 15}}
                  resizeMode="cover"
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>{product.name}</Text> 
                <Text style={{marginTop: 5, color: '#333', fontWeight: 'bold', textAlign: 'center'}}>
                  {product.price} €
                </Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false} 
          />
        </View>
      )}
    />
  );
}
