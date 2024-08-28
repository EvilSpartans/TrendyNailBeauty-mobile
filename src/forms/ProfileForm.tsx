import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { profileSchema } from './Validation';
import Toast from 'react-native-toast-message';
import { Tabnav } from '../models/TabNav';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { updateUser } from '../services/auth.service';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function ProfileForm() {

  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<Tabnav>>(); 

    const onSubmit = async (values: any) => {
        const res = await dispatch(updateUser({ id: user.id, values: values }));
        // console.log(res)
        Toast.show({
            type: 'success',
            text1: 'Profil mis à jour',
            text2: 'Vos informations ont été enregistrées.',
        });
        navigation.navigate('Profil');
    };

    return (
        <Formik
          initialValues={{ 
            username: user?.username || '', 
            email: user?.email || '', 
            phone: user?.phone || '', 
            gender: user?.gender || '' 
          }}
            validationSchema={profileSchema}
            onSubmit={onSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <StyledView style={{ paddingHorizontal: 40, paddingVertical: 20, flex: 1, justifyContent: 'center' }}>
                    {/* Titre principal */}
                    <StyledText style={{ fontSize: 26, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 30 }}>
                        Modifier le Profil
                    </StyledText>

                    <StyledTextInput
                        placeholder="Pseudo"
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        style={{
                            borderColor: touched.username && errors.username ? 'red' : 'gray',
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 20,
                            marginBottom: 20,
                            fontSize: 18,
                            backgroundColor: '#fff',
                        }}
                    />
                    {touched.username && errors.username && (
                        <StyledText style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.username}</StyledText>
                    )}

                    <StyledTextInput
                        placeholder="Email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        style={{
                            borderColor: touched.email && errors.email ? 'red' : 'gray',
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 20,
                            marginBottom: 20,
                            fontSize: 18,
                            backgroundColor: '#fff',
                        }}
                    />
                    {touched.email && errors.email && (
                        <StyledText style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.email}</StyledText>
                    )}

                    <StyledTextInput
                        placeholder="Téléphone"
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
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
                        placeholder="Genre"
                        onChangeText={handleChange('gender')}
                        onBlur={handleBlur('gender')}
                        value={values.gender}
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

                              {/* Texte */}
            <Text style={{ fontSize: 16, color: '#333', textAlign: 'center', marginTop: 30 }}>
            Merci de rester <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>courtois</Text> et d'éviter tout propos <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>déplacé</Text> ou <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>insultant.</Text>
            </Text>

                </StyledView>
            )}
        </Formik>
    );
}
