import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { registerSchema } from './Validation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Tabnav } from '../models/TabNav';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/Store';
import { changeStatus } from '../store/slices/userSlice';
import { registerUser } from '../services/auth.service';
import Toast from 'react-native-toast-message';

export default function RegisterForm() {

  const navigation = useNavigation<NavigationProp<Tabnav>>();
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: any) => {
    dispatch(changeStatus("loading"));
    let res = await dispatch(registerUser({ ...data }));
    if (res.payload && 'token' in res.payload) {
      Toast.show({
        type: 'success',
        text1: 'Inscription réussie',
        text2: 'Vous êtes maintenant inscrit(e).',
      });
      navigation.navigate('Accueil')
    }
  };

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', confirmPassword: '', terms: false }}
      validationSchema={registerSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <View style={{ paddingHorizontal: 40, paddingVertical: 20, flex: 1, justifyContent: 'center' }}>
          {/* Titre principal */}
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 30 }}>
            Inscription
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
            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.email}</Text>
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

          {/* <TextInput
            placeholder="Confirmer le mot de passe"
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
            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.confirmPassword}</Text>
          )} */}

          {/* Case à cocher pour accepter les conditions */}
          <TouchableOpacity
            onPress={() => {
              const newCheckedStatus = !isChecked;
              setIsChecked(newCheckedStatus);
              setFieldValue('terms', newCheckedStatus);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <View
              style={{
                height: 24,
                width: 24,
                borderWidth: 2,
                borderColor: isChecked ? '#cf3982' : 'gray',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
                borderRadius: 4,
                backgroundColor: isChecked ? '#cf3982' : '#fff',
              }}
            >
              {isChecked && (
                <View
                  style={{
                    height: 12,
                    width: 12,
                    backgroundColor: '#fff',
                  }}
                />
              )}
            </View>
            <Text style={{ fontSize: 16, color: '#333' }}>Accepter les conditions d'utilisation</Text>
          </TouchableOpacity>

          {touched.terms && errors.terms && (
            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.terms}</Text>
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
            <Text style={{ color: '#fff', fontSize: 20 }}>Inscription</Text>
          </TouchableOpacity>

          {/* Texte pour la connexion */}
          <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
            <Text style={{ fontSize: 16, color: '#333', textAlign: 'center', marginTop: 30 }}>
              Déjà un compte ? <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}
