import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Tabnav } from '../../models/TabNav';

export default function SearchComponent(): React.JSX.Element {
    const [searchTerm, setSearchTerm] = useState(''); 
    const navigation = useNavigation<NavigationProp<Tabnav>>();

    const handleSearch = () => {
        navigation.navigate('AllProducts', { term: searchTerm });
    };

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#E4E5E9', 
                borderWidth: 1,
                borderRadius: 20,  
                paddingHorizontal: 10,
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
                value={searchTerm} 
                onChangeText={setSearchTerm} 
                onSubmitEditing={handleSearch}
                returnKeyType="search" 
            />
            <TouchableOpacity onPress={handleSearch}>
                <FontAwesome name="search" size={20} color="#55585B" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
        </View>
    );
}
