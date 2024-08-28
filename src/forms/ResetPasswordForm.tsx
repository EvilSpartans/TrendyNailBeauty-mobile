import { styled } from 'nativewind';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { emailSchema, resetPasswordSchema } from './Validation';
import { resetPassword, sendResetPasswordRequest } from '../services/auth.service';
import { AppDispatch } from '../store/Store';
import { Tabnav } from '../models/TabNav';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function ResetPasswordForm(): React.JSX.Element {

  const [step, setStep] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<Tabnav>>();

  const handleEmailSubmit = async (email: string) => {
    try {
        await dispatch(sendResetPasswordRequest({ email })).unwrap();
        Toast.show({
            type: 'success',
            text1: 'Email envoyé',
            text2: 'Veuillez vérifier votre email pour le token.',
        });
        setStep(2);
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Erreur',
        });
    }
  };

  const handleResetSubmit = async (values: { token: string; newPassword: string }) => {
      try {
          let resp = await dispatch(resetPassword(values)).unwrap();
          Toast.show({
              type: 'success',
              text1: 'Succès',
              text2: 'Votre mot de passe a été réinitialisé.',
          });
          navigation.navigate('Connexion');
      } catch (error) {
          Toast.show({
              type: 'error',
              text1: 'Erreur, utilisateur non trouvé',
          });
      }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
      {step === 1 ? (
        <Formik
          initialValues={{ email: '' }}
          validationSchema={emailSchema}
          onSubmit={(values) => handleEmailSubmit(values.email)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <StyledView className="items-center bg-white justify-center">
              <StyledText className="text-slate-800 text-lg mb-4 text-center">Saisissez votre email pour effectuer une demande de réinitialisation de votre mot de passe.</StyledText>
              <TextInput
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                style={{
                  borderColor: touched.email && errors.email ? 'red' : 'gray',
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 15,
                  marginVertical: 10,
                  width: '90%',
                  fontSize: 16,
                }}
              />
              {touched.email && errors.email && (
                <StyledText className="text-red-500 text-sm mt-1">{errors.email}</StyledText>
              )}
              <TouchableOpacity onPress={() => handleSubmit()} disabled={!isValid} style={{
                backgroundColor: isValid ? '#cf3982' : 'gray',
                padding: 20,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 30,
                width: '90%',
              }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>Envoyer</Text>
              </TouchableOpacity>
            </StyledView>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ token: '', newPassword: '' }}
          validationSchema={resetPasswordSchema}
          onSubmit={handleResetSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <StyledView className="items-center bg-white justify-center">
              <StyledText className="text-slate-800 text-lg mb-4">Renseignez le code reçu et entrez un nouveau mot de passe.</StyledText>
              <TextInput
                placeholder="Token"
                onChangeText={handleChange('token')}
                onBlur={handleBlur('token')}
                value={values.token}
                style={{
                  borderColor: touched.token && errors.token ? 'red' : 'gray',
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 15,
                  marginVertical: 10,
                  width: '90%',
                  fontSize: 16,
                }}
              />
              {touched.token && errors.token && (
                <StyledText className="text-red-500 text-sm mt-1">{errors.token}</StyledText>
              )}
              <TextInput
                placeholder="Nouveau mot de passe"
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
                secureTextEntry
                style={{
                  borderColor: touched.newPassword && errors.newPassword ? 'red' : 'gray',
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 15,
                  marginVertical: 10,
                  width: '90%',
                  fontSize: 16,
                }}
              />
              {touched.newPassword && errors.newPassword && (
                <StyledText className="text-red-500 text-sm mt-1">{errors.newPassword}</StyledText>
              )}
              <TouchableOpacity onPress={() => handleSubmit()} disabled={!isValid} style={{
                backgroundColor: isValid ? '#cf3982' : 'gray',
                padding: 20,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 30,
                width: '90%',
              }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>Réinitialiser</Text>
              </TouchableOpacity>
            </StyledView>
          )}
        </Formik>
      )}
    </ScrollView>
  );
}
