import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { addressSchema } from './Validation'; // Assurez-vous que le chemin d'importation est correct
import Toast from 'react-native-toast-message';
import { Tabnav } from '../models/TabNav';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { updateUser } from '../services/auth.service'; // Gardez l'import pour la mise à jour

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function AddressForm() {
    const user = useSelector((state: RootState) => state.user.user); // Récupérez l'utilisateur
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<Tabnav>>();

    const onSubmit = async (values: any) => {
        const res = await dispatch(updateUser({ id: user.id, values })); // Dispatch de l'action pour mettre à jour l'utilisateur
        // console.log(res);

        if (res.type === 'api/profile/fulfilled') {
            Toast.show({
                type: 'success',
                text1: 'Adresse mise à jour',
                text2: 'Vos informations d\'adresse ont été enregistrées.',
            });
            navigation.navigate('Profil'); // Rediriger vers la page de profil
        } else {
            Toast.show({
                type: 'error',
                text1: 'Échec de la mise à jour',
                text2: 'Une erreur est survenue lors de la mise à jour de l\'adresse.',
            });
        }
    };

    return (
        <Formik
            initialValues={{
                street: user?.street || '',
                zipCode: user?.zipCode || '',
                city: user?.city || '',
                country: user?.country || '',
            }}
            validationSchema={addressSchema}
            onSubmit={onSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <StyledView style={{ paddingHorizontal: 40, paddingVertical: 20, flex: 1, justifyContent: 'center' }}>
                    {/* Titre principal */}
                    <StyledText style={{ fontSize: 26, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 30 }}>
                        Modifier l'Adresse
                    </StyledText>

                    <StyledTextInput
                        placeholder="Rue"
                        onChangeText={handleChange('street')}
                        onBlur={handleBlur('street')}
                        value={values.street}
                        style={{
                            borderColor: touched.street && errors.street ? 'red' : 'gray',
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 20,
                            marginBottom: 20,
                            fontSize: 18,
                            backgroundColor: '#fff',
                        }}
                    />
                    {touched.street && errors.street && (
                        <StyledText style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.street}</StyledText>
                    )}

                    <StyledTextInput
                        placeholder="Code Postal"
                        onChangeText={handleChange('zipCode')}
                        onBlur={handleBlur('zipCode')}
                        value={values.zipCode}
                        style={{
                            borderColor: touched.zipCode && errors.zipCode ? 'red' : 'gray',
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 20,
                            marginBottom: 20,
                            fontSize: 18,
                            backgroundColor: '#fff',
                        }}
                    />
                    {touched.zipCode && errors.zipCode && (
                        <StyledText style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.zipCode}</StyledText>
                    )}

                    <StyledTextInput
                        placeholder="Ville"
                        onChangeText={handleChange('city')}
                        onBlur={handleBlur('city')}
                        value={values.city}
                        style={{
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 20,
                            marginBottom: 20,
                            fontSize: 18,
                            backgroundColor: '#fff',
                        }}
                    />

                    <StyledTextInput
                        placeholder="Pays"
                        onChangeText={handleChange('country')}
                        onBlur={handleBlur('country')}
                        value={values.country}
                        style={{
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 20,
                            marginBottom: 20,
                            fontSize: 18,
                            backgroundColor: '#fff',
                        }}
                    />

                    <StyledTouchableOpacity
                        onPress={() => handleSubmit()}
                        style={{
                            backgroundColor: '#cf3982',
                            padding: 20,
                            borderRadius: 10,
                            alignItems: 'center',
                            marginTop: 30,
                        }}
                    >
                        <StyledText style={{ color: '#fff', fontSize: 20 }}>Mettre à jour</StyledText>
                    </StyledTouchableOpacity>

                    {/* Texte de courtoisie */}
                    <Text style={{ fontSize: 16, color: '#333', textAlign: 'center', marginTop: 30 }}>
                        Merci de rester <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>courtois</Text> et d'éviter tout propos <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>déplacé</Text> ou <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>insultant.</Text>
                    </Text>
                </StyledView>
            )}
        </Formik>
    );
}
