import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../store/slices/categorySlice';
import { AppDispatch, RootState } from '../store/Store';

export default function CategoryComponent(): React.JSX.Element {
    
    const dispatch = useDispatch<AppDispatch>();
    const { status, categories } = useSelector((state: RootState) => state.category);

    const fetchCategories = async () => {
        try {
            const response = await dispatch(getAllCategories({}));  
            console.log("Fetched Categories Response:", response); 
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [dispatch]);

    if (status === 'loading') {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (status === 'failed') {
        return <Text>Erreur lors du chargement des catégories</Text>;
    }

    return (
        <FlatList
            data={categories} 
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                    <FlatList
                        data={item.products}
                        horizontal
                        keyExtractor={(product) => product.id}
                        renderItem={({ item: product }) => (
                            <View style={{ marginHorizontal: 10 }}>
                                <Text>{product.name}</Text>
                                {/* Ajoutez ici les autres détails du produit comme une image */}
                            </View>
                        )}
                    />
                </View>
            )}
        />
    );
}
