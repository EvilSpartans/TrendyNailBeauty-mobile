/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {getAllCategories} from '../store/slices/categorySlice';
import {AppDispatch} from '../store/Store';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface Category {
  id: string;
  name: string;
  products: Product[];
  image: string;
  productsCount: number;
}

export default function CategoryComponent(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [categories, setCategories] = useState<Category[]>([]);
  const baseUrl = 'http://localhost:3000/uploads/images';

  const fetchCategories = async () => {
    try {
      const response = await dispatch(getAllCategories({}));
      console.log('Fetched Categories Response:', response);

      if (Array.isArray(response.payload)) {
        setCategories(response.payload);
      } else {
        console.error('Unexpected API response format');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [dispatch]);

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
                  color: '#7BB8E3',
                  borderColor: '#7BB8E3',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10, // Augmentation du borderRadius pour des coins plus arrondis
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
                  marginLeft: 5, // Réduction de la marge à gauche
                  marginRight: 5, // Réduction de la marge à droite
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: '#e6eff7', // Couleur légèrement blanche bleutée
                }}>
                <Image
                  source={{uri: `${baseUrl}/${product.image}`}}
                  style={{width: 100, height: 100, borderRadius: 10}}
                />
                <Text style={{marginTop: 5}}>{product.name}</Text>
                {/* Affichage du prix */}
                <Text style={{marginTop: 5, color: '#333', fontWeight: 'bold'}}>
                  {product.price} €
                </Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false} // Cacher la scrollbar horizontale
          />
        </View>
      )}
    />
  );
}

