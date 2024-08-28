import React, { useState } from 'react';
import { Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import { AppDispatch, RootState } from '../../store/Store';
import { addItemToCart, selectIsItemInCart } from '../../store/slices/cartSlice';
import { Tabnav } from '../../models/TabNav';
import Toast from 'react-native-toast-message';

const { height: screenHeight } = Dimensions.get('window');

export default function ProductScreen(): React.JSX.Element {

    const route = useRoute<RouteProp<Tabnav, 'Article'>>();
    const navigation = useNavigation<NavigationProp<Tabnav>>();
    const { product } = route.params;
    const dispatch = useDispatch<AppDispatch>();
    const isItemInCart = useSelector((state: RootState) => selectIsItemInCart(state, product.id));
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
    const imageBaseUrl = `${BASE_URL}/uploads/images`;

    const [activeTab, setActiveTab] = useState<'Informations' | 'Description'>('Informations');

    const handleAddToCart = () => {
        dispatch(addItemToCart({ ...product, quantity: 1 }));
        Toast.show({
            type: 'success',
            text1: 'Ajouté au panier',
            text2: `${product.name} a été ajouté à votre panier.`,
        });
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
            {isItemInCart ? (
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Panier')} 
                    style={{
                        backgroundColor: '#fff', 
                        borderColor: '#DAA520', 
                        borderWidth: 1, 
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        marginVertical: 20,
                        marginHorizontal: 30
                    }}>
                    <Text style={{ color: '#DAA520', fontSize: 17 }}>Voir le panier</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={handleAddToCart}
                    style={{
                        backgroundColor: '#cf3982',
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        marginVertical: 20,
                        marginHorizontal: 30
                    }}>
                    <Text style={{color: '#fff', fontSize: 17}}>Ajouter au panier</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}
