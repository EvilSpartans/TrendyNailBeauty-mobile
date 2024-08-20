import React from 'react';
import { TextInput, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SearchComponent(): React.JSX.Element {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#E4E5E9', 
        borderWidth: 1,
        borderRadius: 20,  
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#f8f8f8', 
      }}>
      <TextInput
        placeholder="Rechercher..."
        placeholderTextColor="#90969B" 
        style={{
          flex: 1,
          height: 40,
          color: '#55585B', 
        }}
      />
      <FontAwesome name="search" size={20} color="#55585B" style={{ marginLeft: 10 }} />
    </View>
  );
}
