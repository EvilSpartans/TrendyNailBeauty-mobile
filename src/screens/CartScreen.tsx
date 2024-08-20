import React from 'react';
import { View, Text, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../store/Store';
import { incrementItemQuantity, decrementItemQuantity, clearCart } from '../store/slices/cartSlice';
import { Tabnav } from '../models/TabNav';

export default function CartScreen(): React.JSX.Element {

    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<Tabnav>>();
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
    const imageBaseUrl = `${BASE_URL}/uploads/images`;

    const handleIncrement = (id: string) => {
        dispatch(incrementItemQuantity(id));
    };

    const handleDecrement = (id: string) => {
        dispatch(decrementItemQuantity(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
            {cart.items.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#555', fontSize: 18 }}>Votre panier est vide</Text>
                    <Button
                        title="Continuer les achats"
                        onPress={() => navigation.navigate('Accueil')}
                        color="#cf3982"
                    />
                </View>
            ) : (
                <ScrollView>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>Votre panier :</Text>
                    {cart.items.map((item) => (
                        <View key={item.id} style={{ flexDirection: 'row', marginBottom: 16, padding: 16, borderColor: '#ccc', borderWidth: 1, borderRadius: 10 }}>
                            <Image
                                source={{ uri: `${imageBaseUrl}/${item.image}` }}
                                style={{ width: 80, height: 80, borderRadius: 10, marginRight: 16 }}
                            />
                            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                                <Text style={{ fontSize: 16, color: '#888' }}>Prix : {item.price} €</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                    <TouchableOpacity onPress={() => handleDecrement(item.id)} style={{ padding: 8 }}>
                                        <Text style={{ fontSize: 20, color: '#cf3982' }}>−</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 18, marginHorizontal: 16 }}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => handleIncrement(item.id)} style={{ padding: 8 }}>
                                        <Text style={{ fontSize: 20, color: '#cf3982' }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}

                    {/* Boutons "Passer la commande" et "Vider le panier" */}
                    <View style={{ marginTop: 32 }}>
                        <Button
                            title="Passer la commande"
                            onPress={() => navigation.navigate('Commande')}
                            color="#cf3982"
                        />
                        <View style={{ height: 16 }} />
                        <Button
                            title="Vider le panier"
                            onPress={handleClearCart}
                            color="#ff4d4f"
                        />
                    </View>
                </ScrollView>
            )}
        </View>
    );
}
