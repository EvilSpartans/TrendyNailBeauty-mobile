import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { styled } from 'nativewind';
import { updatePasswordSchema } from './Validation';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { updatePassword } from '../services/auth.service';
import { Tabnav } from '../models/TabNav';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function UpdatePasswordForm(): React.JSX.Element {

    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<Tabnav>>();

    const onSubmit = async (values: any) => {
        const { oldPassword, newPassword, confirmPassword } = values; 
        const token = user.token;
        // console.log(token);
        const res = await dispatch(updatePassword({ oldPassword, newPassword, confirmPassword, token }));
        // console.log(res);
        navigation.navigate('Profil')
        Toast.show({
          type: 'success',
          text1: 'Mot de passe mis à jour',
          text2: 'Votre mot de passe a été enregistré avec succès.',
      });
    };

    return (
        <Formik
            initialValues={{
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            }}
            validationSchema={updatePasswordSchema}
            onSubmit={onSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <StyledView style={{ paddingHorizontal: 40, paddingVertical: 20, flex: 1, justifyContent: 'center' }}>
                    {/* Titre principal */}
                    <StyledText style={{ fontSize: 26, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 30 }}>
                        Modifier le Mot de Passe
                    </StyledText>

                    <StyledTextInput
                        placeholder="Ancien Mot de Passe"
                        onChangeText={handleChange('oldPassword')}
                        onBlur={handleBlur('oldPassword')}
                        value={values.oldPassword}
                        secureTextEntry
                        style={{
                            borderColor: touched.oldPassword && errors.oldPassword ? 'red' : 'gray',
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 20,
                            marginBottom: 20,
                            fontSize: 18,
                            backgroundColor: '#fff',
                        }}
                    />
                    {touched.oldPassword && errors.oldPassword && (
                        <StyledText style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.oldPassword}</StyledText>
                    )}

                    <StyledTextInput
                        placeholder="Nouveau Mot de Passe"
                        onChangeText={handleChange('newPassword')}
                        onBlur={handleBlur('newPassword')}
                        value={values.newPassword}
                        secureTextEntry
                        style={{
                            borderColor: touched.newPassword && errors.newPassword ? 'red' : 'gray',
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 20,
                            marginBottom: 20,
                            fontSize: 18,
                            backgroundColor: '#fff',
                        }}
                    />
                    {touched.newPassword && errors.newPassword && (
                        <StyledText style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.newPassword}</StyledText>
                    )}

                    <StyledTextInput
                        placeholder="Confirmer le Nouveau Mot de Passe"
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry
                        style={{
                            borderColor: touched.confirmPassword && errors.confirmPassword ? 'red' : 'gray',
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 20,
                            marginBottom: 20,
                            fontSize: 18,
                            backgroundColor: '#fff',
                        }}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                        <StyledText style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.confirmPassword}</StyledText>
                    )}

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
