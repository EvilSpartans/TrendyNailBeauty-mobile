import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/Store';
import { Tabnav } from '../../models/TabNav';
import { getAllProducts } from '../../services/product.service';
import { unwrapResult } from '@reduxjs/toolkit';
import { Product } from '../../models/Product';
import FilterComponent from '../../components/main/FilterComponent';

export default function ProductsScreen(): React.JSX.Element {
    const [products, setProducts] = useState<Product[]>([]); 
    const route = useRoute<RouteProp<Tabnav, 'AllProducts'>>(); 
    const navigation = useNavigation<NavigationProp<Tabnav>>();
    const dispatch = useDispatch<AppDispatch>();
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
    const imageBaseUrl = `${BASE_URL}/uploads/images`;

    const { ...params } = route.params || {};

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const resultAction = await dispatch(getAllProducts({ ...params }));
            const data = unwrapResult(resultAction);
            setProducts(data.products);
          } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
          }
        };
    
        fetchProducts();
      }, [dispatch, params]);

    const renderProduct = ({ item }: { item: Product }) => (
        <TouchableOpacity
            style={styles.productContainer} 
            onPress={() => navigation.navigate('Article', { product: item })} 
        >
            <Image 
                source={{ uri: `${imageBaseUrl}/${item.image}` }} 
                style={styles.productImage} 
            />
            <Text style={styles.productName}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            ListHeaderComponent={
                <View style={styles.headerContainer}>
                    <FilterComponent />
                </View>
            }
            contentContainerStyle={styles.gridContainer}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
        />
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingBottom: 10, 
    },
    gridContainer: {
        padding: 10,
        justifyContent: 'space-between',
    },
    productContainer: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
    },
    productImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },
    productName: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
    },
    flatList: { 
        backgroundColor: 'white',
    },
});
