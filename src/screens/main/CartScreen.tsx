import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../../store/Store';
import { incrementItemQuantity, decrementItemQuantity, clearCart } from '../../store/slices/cartSlice';
import { Tabnav } from '../../models/TabNav';

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

    const confirmClearCart = () => {
        Alert.alert(
            "Confirmation",
            "Êtes-vous sûr de vouloir vider le panier ?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Oui",
                    onPress: () => dispatch(clearCart())
                }
            ],
            { cancelable: true }
        );
    };

    const getTotalPrice = () => {
        return cart.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
            {cart.items.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#555', fontSize: 18 }}>Votre panier est vide</Text>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Accueil')}
                        style={{ backgroundColor: '#cf3982', padding: 12, borderRadius: 10, marginTop: 16 }}
                    >
                        <Text style={{ color: '#fff', fontSize: 16 }}>Continuer les achats</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView>
                    {/* En-têtes du tableau */}
                    <View style={{ flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#DAA520' }}>
                        <Text style={{ flex: 2, fontSize: 16, fontWeight: 'bold', color: '#DAA520' }}>Produit</Text>
                        <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#DAA520' }}>Prix</Text>
                        <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#DAA520' }}>Quantité</Text>
                    </View>

                    {/* Lignes du tableau */}
                    {cart.items.map((item) => (
                        <View key={item.id} style={{ flexDirection: 'row', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' }}>
                            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: `${imageBaseUrl}/${item.image}` }}
                                    style={{ width: 60, height: 60, borderRadius: 10, marginRight: 16 }}
                                />
                                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                            </View>
                            <Text style={{ flex: 1, fontSize: 16, textAlign: 'center' }}>{item.price} €</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => handleDecrement(item.id)} style={{ padding: 8, backgroundColor: '#f2f2f2', borderRadius: 5 }}>
                                    <Text style={{ fontSize: 18, color: '#cf3982' }}>−</Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 16, marginHorizontal: 12 }}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => handleIncrement(item.id)} style={{ padding: 8, backgroundColor: '#f2f2f2', borderRadius: 5 }}>
                                    <Text style={{ fontSize: 18, color: '#cf3982' }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    {/* Carte du total */}
                    <View style={{ marginTop: 32, padding: 16, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Total :</Text>
                        <Text style={{ fontSize: 22, color: '#cf3982', fontWeight: 'bold' }}>{getTotalPrice()} €</Text>
                    </View>

                    {/* Boutons "Passer la commande" et "Vider le panier" */}
                    <View style={{ marginTop: 32 }}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Commande')}
                            style={{ backgroundColor: '#cf3982', padding: 16, borderRadius: 10, alignItems: 'center', marginBottom: 16 }}
                        >
                            <Text style={{ color: '#fff', fontSize: 18 }}>Procéder au paiement</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={confirmClearCart}
                            style={{
                                backgroundColor: '#fff', 
                                borderColor: '#DAA520', 
                                borderWidth: 1, 
                                padding: 16,
                                borderRadius: 10,
                                alignItems: 'center',
                            }}>
                            <Text style={{ color: '#DAA520', fontSize: 18 }}>Vider le panier</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </View>
    );
}
