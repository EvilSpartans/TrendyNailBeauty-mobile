import React, { useState } from 'react';
import { Text, View, Image, Button, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';
import { AppDispatch } from '../store/Store';
import { addItemToCart } from '../store/slices/cartSlice';
import { Tabnav } from '../models/TabNav';

const { height: screenHeight } = Dimensions.get('window');

export default function ProductScreen(): React.JSX.Element {
    const route = useRoute<RouteProp<Tabnav, 'Article'>>();
    const { product } = route.params;
    const dispatch = useDispatch<AppDispatch>();
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
    const imageBaseUrl = `${BASE_URL}/uploads/images`;

    const [activeTab, setActiveTab] = useState<'Informations' | 'Description'>('Informations');

    const handleAddToCart = () => {
        dispatch(addItemToCart({ ...product, quantity: 1 }));
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Image qui prend le haut de l'écran */}
            <Image
                source={{ uri: `${imageBaseUrl}/${product.image}` }}
                style={{ width: '100%', height: screenHeight * 0.5 }} 
                resizeMode="cover"
            />
            {/* Barre d'onglets pour Informations / Description */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <TouchableOpacity 
                    style={{ paddingBottom: 10, borderBottomWidth: activeTab === 'Informations' ? 2 : 0, borderBottomColor: '#cf3982' }}
                    onPress={() => setActiveTab('Informations')}
                >
                    <Text style={{ fontSize: 16, color: activeTab === 'Informations' ? '#cf3982' : '#999' }}>
                        Informations
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{ paddingBottom: 10, borderBottomWidth: activeTab === 'Description' ? 2 : 0, borderBottomColor: '#cf3982' }}
                    onPress={() => setActiveTab('Description')}
                >
                    <Text style={{ fontSize: 16, color: activeTab === 'Description' ? '#cf3982' : '#999' }}>
                        Description
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Contenu des onglets */}
            <View style={{ padding: 20 }}>
                {activeTab === 'Informations' && (
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{product.name}</Text>
                        <Text style={{ fontSize: 18, color: '#666' }}>{product.price} €</Text>
                    </View>
                )}
                {activeTab === 'Description' && (
                <WebView
                    originWhitelist={['*']}
                    source={{ html: `<html><body style="font-size: 40px; line-height: 1.5;">${product.description}</body></html>` }}
                    style={{ height: 59.2 }}
                    />
                )}
            </View>

            {/* Bouton pour ajouter au panier */}
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <Button
                    title="Ajouter au panier"
                    onPress={handleAddToCart}
                    color="#cf3982"
                />
            </View>
        </ScrollView>
    );
}
