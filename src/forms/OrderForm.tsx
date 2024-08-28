import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Formik } from 'formik';
import { checkoutSchema } from './Validation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Tabnav } from '../models/TabNav';
import { AppDispatch, RootState } from '../store/Store';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { createOrder } from '../services/order.service';
import { clearCart } from '../store/slices/cartSlice';

export default function OrderForm() {

    const navigation = useNavigation<NavigationProp<Tabnav>>();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalCartPrice = useSelector((state: RootState) => state.cart.totalPrice);

    const [selectedShipping, setSelectedShipping] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(totalCartPrice);

    const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
    const imageBaseUrl = `${BASE_URL}/uploads/images`;

    useEffect(() => {
        setTotalPrice(totalCartPrice + selectedShipping);
    }, [selectedShipping, totalCartPrice]);

    const onSubmit = async (values: any) => {
        const productIds = cartItems.map(item => item.id);
        const orderValues = {
            email: values.email,
            phone: values.phone,
            street: values.street,
            zipCode: values.zipCode,
            city: values.city,
            country: values.country,
            price: totalPrice, 
            shipping: selectedShipping.toString(),
            customerNotes: values.customerNotes || '',
            productIds: productIds,
        };

        let res = await dispatch(createOrder({ token: user.token, values: orderValues }));

        if (res.payload && 'email' in res.payload) { 
            Toast.show({
                type: 'success',
                text1: 'Commande validée',
                text2: 'Votre commande a été validée avec succès.',
            });
            dispatch(clearCart());
            navigation.navigate('Accueil');
        } else {
            Toast.show({
                type: 'error',
                text1: 'Erreur de validation',
                text2: 'Une erreur est survenue lors de la validation de votre commande.',
            });
        }
    };

    return (
        <Formik
            initialValues={{
                email: user?.email || '',
                phone: user?.phone || '',
                street: user?.street || '',
                zipCode: user?.zipCode || '',
                city: user?.city || '',
                country: user?.country || '',
                customerNotes: '',
                shipping: '',
            }}
            validationSchema={checkoutSchema}
            onSubmit={onSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

                <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 5, flex: 1 }}>

                    {/* Récapitulatif des articles */}
                    <View style={{
                        borderWidth: 2, 
                        borderColor: '#DAA520', 
                        padding: 10, 
                        borderRadius: 5,
                        marginVertical: 30
                    }}>
                        <Text style={{ 
                            fontSize: 20, 
                            fontWeight: 'bold', 
                            color: '#DAA520', 
                            textAlign: 'center'
                        }}>
                            Récapitulatif de votre commande
                        </Text>
                    </View>

                    <View style={{ marginBottom: 20, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Vos articles :</Text>
                        
                        {/* Liste des articles */}
                        {cartItems.map(item => (
                        <View
                            key={item.id}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <Image
                                source={{ uri: `${imageBaseUrl}/${item.image}` }}
                                style={{
                                width: 60,
                                height: 60,
                                borderRadius: 10,
                                marginRight: 16,
                                }}
                            />
                            <Text>{item.name} x{item.quantity}</Text>
                            </View>
                            <Text>{(item.price * item.quantity).toFixed(2)} €</Text>
                        </View>
                        ))}

                        {/* Options de livraison */}
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 10 }}>Choisissez votre mode de livraison :</Text>
                        <TouchableOpacity 
                            onPress={() => {
                                setSelectedShipping(10);
                                handleChange('shipping')('10');
                            }}
                            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
                        >
                            <View 
                                style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: selectedShipping === 10 ? '#cf3982' : '#ccc',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 10,
                                }}
                            >
                                {selectedShipping === 10 && 
                                    <View 
                                        style={{
                                            height: 10,
                                            width: 10,
                                            borderRadius: 5,
                                            backgroundColor: '#cf3982',
                                        }}
                                    />
                                }
                            </View>
                            <Text>Rapide : 10.00 €</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => {
                                setSelectedShipping(20);
                                handleChange('shipping')('20'); 
                            }}
                            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
                        >
                            <View 
                                style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: selectedShipping === 20 ? '#cf3982' : '#ccc',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 10,
                                }}
                            >
                                {selectedShipping === 20 && 
                                    <View 
                                        style={{
                                            height: 10,
                                            width: 10,
                                            borderRadius: 5,
                                            backgroundColor: '#cf3982',
                                        }}
                                    />
                                }
                            </View>
                            <Text>24h/48h : 20.00 €</Text>
                        </TouchableOpacity>

                        {touched.shipping && errors.shipping && (
                            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.shipping}</Text>
                        )}

                        {/* Total */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total :</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{totalPrice.toFixed(2)} €</Text>
                        </View>
                    </View>

                    {/* Formulaire de livraison */}
                    <View style={{
                        borderWidth: 2, 
                        borderColor: '#DAA520', 
                        padding: 10, 
                        borderRadius: 5,
                        marginVertical: 30
                    }}>
                        <Text style={{ 
                            fontSize: 20, 
                            fontWeight: 'bold', 
                            color: '#DAA520', 
                            textAlign: 'center'
                        }}>
                            Informations de livraison
                        </Text>
                    </View>

                    <View style={{ marginBottom: 20, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10 }}>
                        
                        <TextInput
                            placeholder="Adresse e-mail *"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            style={{
                                borderColor: touched.email && errors.email ? 'red' : 'gray',
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 20,
                                fontSize: 15,
                                backgroundColor: '#fff',
                            }}
                        />
                        {touched.email && errors.email && (
                            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.email}</Text>
                        )}

                        <TextInput
                            placeholder="Téléphone *"
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                            style={{
                                borderColor: touched.phone && errors.phone ? 'red' : 'gray',
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 20,
                                fontSize: 15,
                                backgroundColor: '#fff',
                            }}
                        />
                        {touched.phone && errors.phone && (
                            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.phone}</Text>
                        )}

                        <TextInput
                            placeholder="Rue *"
                            onChangeText={handleChange('street')}
                            onBlur={handleBlur('street')}
                            value={values.street}
                            style={{
                                borderColor: touched.street && errors.street ? 'red' : 'gray',
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 20,
                                fontSize: 15,
                                backgroundColor: '#fff',
                            }}
                        />
                        {touched.street && errors.street && (
                            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.street}</Text>
                        )}

                        <TextInput
                            placeholder="Code postal *"
                            onChangeText={handleChange('zipCode')}
                            onBlur={handleBlur('zipCode')}
                            value={values.zipCode}
                            style={{
                                borderColor: touched.zipCode && errors.zipCode ? 'red' : 'gray',
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 20,
                                fontSize: 15,
                                backgroundColor: '#fff',
                            }}
                        />
                        {touched.zipCode && errors.zipCode && (
                            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.zipCode}</Text>
                        )}

                        <TextInput
                            placeholder="Ville *"
                            onChangeText={handleChange('city')}
                            onBlur={handleBlur('city')}
                            value={values.city}
                            style={{
                                borderColor: touched.city && errors.city ? 'red' : 'gray',
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 20,
                                fontSize: 15,
                                backgroundColor: '#fff',
                            }}
                        />
                        {touched.city && errors.city && (
                            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.city}</Text>
                        )}

                        <TextInput
                            placeholder="Pays *"
                            onChangeText={handleChange('country')}
                            onBlur={handleBlur('country')}
                            value={values.country}
                            style={{
                                borderColor: touched.country && errors.country ? 'red' : 'gray',
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 20,
                                fontSize: 15,
                                backgroundColor: '#fff',
                            }}
                        />
                        {touched.country && errors.country && (
                            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.country}</Text>
                        )}

                        <TextInput
                            placeholder="Notes"
                            onChangeText={handleChange('customerNotes')}
                            onBlur={handleBlur('customerNotes')}
                            value={values.customerNotes}
                            multiline
                            style={{
                                borderColor: touched.customerNotes && errors.customerNotes ? 'red' : 'gray',
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 20,
                                fontSize: 15,
                                backgroundColor: '#fff',
                                height: 120,
                            }}
                        />
                        {touched.customerNotes && errors.customerNotes && (
                            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.customerNotes}</Text>
                        )}

                        <TouchableOpacity
                            onPress={() => handleSubmit()}
                            style={{
                                backgroundColor: '#cf3982',
                                padding: 15,
                                borderRadius: 10,
                                alignItems: 'center',
                                marginTop: 30,
                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 17 }}>Valider la commande</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Texte */}
                    <Text style={{ fontSize: 16, color: '#333', textAlign: 'center', marginTop: 30 }}>
                    Merci de rester <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>courtois</Text> et d'éviter tout propos <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>déplacé</Text> ou <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>insultant.</ Text>
                    </Text>

                </ScrollView>
            )}
        </Formik>
    );
}
