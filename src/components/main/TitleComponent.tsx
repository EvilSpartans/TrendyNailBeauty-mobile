import React from 'react';
import { View, Text } from 'react-native';

type TitleProps = {
  mainText: string;
  subText: string;
};

export default function TitleComponent({
  mainText,
  subText,
}: TitleProps): React.JSX.Element {
  return (
    <View style={{ marginBottom: 20, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View 
          style={{ 
            height: 2, 
            backgroundColor: '#DAA520', 
            width: 30, 
            marginRight: 5, 
            opacity: 0.3
          }} 
        />
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#DAA520', marginRight: 5 }}>
          {mainText}
        </Text>
        <View 
          style={{ 
            height: 2, 
            backgroundColor: '#DAA520', 
            width: 30, 
            opacity: 0.3
          }} 
        />
      </View>
      <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#333', marginTop: 5, textAlign: 'center' }}>
        {subText}
      </Text>
    </View>
  );
}
