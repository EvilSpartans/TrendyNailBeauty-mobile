import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { loginSchema } from './Validation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Tabnav } from '../models/TabNav';
import { loginUser } from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { changeStatus } from '../store/slices/userSlice';
import { User } from '../models/user';
import { AppDispatch } from '../store/Store';
import Toast from 'react-native-toast-message';

export default function LoginForm() {

    const navigation = useNavigation<NavigationProp<Tabnav>>();
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = async (data: Partial<User>) => {
      dispatch(changeStatus("loading"));
      let res = await dispatch(loginUser({ ...data }));
      // console.log(res);
      if (res.payload && 'token' in res.payload) {
        Toast.show({
          type: 'success',
          text1: 'Connexion réussie',
          text2: 'Vous êtes maintenant connecté(e).',
        });
        navigation.navigate('Accueil')
      } else {
        Toast.show({
          type: 'error',
          text1: 'Identifiants invalides',
          text2: 'Le pseudo ou le mot de passe que vous avez entré est incorrect.',
        });
      }
    };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={{ paddingHorizontal: 40, paddingVertical: 20, flex: 1, justifyContent: 'center' }}>
          {/* Titre principal */}
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 30 }}>
            Se connecter
          </Text>

          <TextInput
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
            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.username}</Text>
          )}

          <TextInput
            placeholder="Mot de passe"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
            style={{
              borderColor: touched.password && errors.password ? 'red' : 'gray',
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
              marginBottom: 20,
              fontSize: 18,
              backgroundColor: '#fff',
            }}
          />
          {touched.password && errors.password && (
            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.password}</Text>
          )}

          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={{
              backgroundColor: '#cf3982',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
              marginTop: 30,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>Connexion</Text>
          </TouchableOpacity>

          {/* Texte pour l'inscription */}
          <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
            <Text style={{ fontSize: 16, color: '#333', textAlign: 'center', marginTop: 30 }}>
              Pas encore de compte ? <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>Inscription</Text>
            </Text>
          </TouchableOpacity>
          <View style={{
              borderBottomColor: '#ccc', 
              borderBottomWidth: 1, 
              marginVertical: 20, 
              marginHorizontal: 30
          }} />
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={{ fontSize: 16, color: '#333', textAlign: 'center' }}>
              Mot de passe oublié ? <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>Réinitialiser</Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}
