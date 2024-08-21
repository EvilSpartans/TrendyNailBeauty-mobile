import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { contactSchema } from './Validation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Tabnav } from '../models/TabNav';

export default function ContactForm() {

    const navigation = useNavigation<NavigationProp<Tabnav>>();

  return (
    <Formik
      initialValues={{ email: '', subject: '', content: '' }}
      validationSchema={contactSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={{ paddingHorizontal: 40, paddingVertical: 20, flex: 1, justifyContent: 'center' }}>
          {/* Titre principal */}
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 30 }}>
            Une question ?
          </Text>

          <TextInput
            placeholder="Adresse e-mail"
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
            placeholder="Sujet"
            onChangeText={handleChange('subject')}
            onBlur={handleBlur('subject')}
            value={values.subject}
            style={{
              borderColor: touched.subject && errors.subject ? 'red' : 'gray',
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
              marginBottom: 20,
              fontSize: 18,
              backgroundColor: '#fff',
            }}
          />
          {touched.subject && errors.subject && (
            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.subject}</Text>
          )}

          <TextInput
            placeholder="Votre message"
            onChangeText={handleChange('content')}
            onBlur={handleBlur('content')}
            value={values.content}
            multiline
            style={{
              borderColor: touched.content && errors.content ? 'red' : 'gray',
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
              marginBottom: 20,
              fontSize: 18,
              backgroundColor: '#fff',
              height: 120, 
            }}
          />
          {touched.content && errors.content && (
            <Text style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{errors.content}</Text>
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
            <Text style={{ color: '#fff', fontSize: 20 }}>Envoyer</Text>
          </TouchableOpacity>

          {/* Texte */}
            <Text style={{ fontSize: 16, color: '#333', textAlign: 'center', marginTop: 30 }}>
            Merci de rester <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>courtois</Text> et d'éviter tout propos <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>déplacé</Text> ou <Text style={{ color: '#cf3982', fontWeight: 'bold' }}>insultant.</Text>
            </Text>

        </View>
      )}
    </Formik>
  );
}
