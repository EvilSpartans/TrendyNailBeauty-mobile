/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TextInput, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SearchComponent(): React.JSX.Element {
  return (
    <View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#5EA3CC',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  }}>
  <FontAwesome name="search" size={20} color="#5EA3CC" />
  <TextInput
    placeholder="Rechercher..."
    style={{
      flex: 1,
      height: 40,
      marginLeft: 10,
    }}
  />
</View>);
}

