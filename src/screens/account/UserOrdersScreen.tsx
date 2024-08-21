import { styled } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Tabnav } from '../../models/TabNav';
import { getOrders } from '../../services/order.service';
import { Order } from '../../models/order'; 

const StyledView = styled(View);
const StyledText = styled(Text);

export default function UserOrdersScreen(): React.JSX.Element {
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<Tabnav>>();
    
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async () => {
        try {
            const token = user.token;
            const res = await dispatch(getOrders(token));
            if (getOrders.fulfilled.match(res)) {
                setOrders(res.payload);
            }
        } catch (err) {
            setError('Une erreur inattendue est survenue.');
        } finally {
            setLoading(false);
        }
    };

    type OrderStatus = "Pending" | "Shipped" | "Cancelled" | "Refund" | "Received";

    const statusLabels: Record<OrderStatus, string> = {
        Pending: "En attente",
        Shipped: "Expédiée",
        Cancelled: "Annulée",
        Refund: "Remboursée",
        Received: "Réceptionnée",
    };
    
    const getStatusLabel = (status: OrderStatus): string => {
        return statusLabels[status] || status;
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (error) {
        return (
            <StyledView className="flex-1 items-center bg-white justify-center">
                <StyledText className="text-red-600">{error}</StyledText>
            </StyledView>
        );
    }

    if (loading) {
        return (
            <StyledView className="flex-1 items-center bg-white justify-center">
                <ActivityIndicator size="large" color="#cf3982" />
                <StyledText className="mt-4">Chargement des commandes...</StyledText>
            </StyledView>
        );
    }

    return (
      <StyledView className="flex-1 bg-white p-4">
          {orders.length === 0 ? (
              <StyledView className="flex-1 justify-center items-center">
                  <StyledText className="text-gray-600 text-lg text-center">Vous n'avez pas encore effectué de commande pour le moment.</StyledText>
                  <TouchableOpacity 
                      onPress={() => navigation.navigate('Accueil')}
                      style={{ backgroundColor: '#cf3982', padding: 12, borderRadius: 10, marginTop: 16 }}
                  >
                      <Text style={{ color: '#fff', fontSize: 16 }}>Continuer les achats</Text>
                  </TouchableOpacity>
              </StyledView>
          ) : (
              <ScrollView>
                  {/* En-têtes du tableau */}
                  <View style={{ flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#DAA520' }}>
                      <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold', color: '#DAA520' }}>Numéro</Text>
                      <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#DAA520' }}>Prix</Text>
                      <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#DAA520' }}>Statut</Text>
                      <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#DAA520' }}>Date</Text>
                  </View>

                  {/* Lignes du tableau */}
                  {orders.map((item) => (
                      <View key={item.id} style={{ flexDirection: 'row', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' }}>
                          <Text style={{ flex: 1, fontSize: 16 }}>{item.id}</Text>
                          <Text style={{ flex: 1, fontSize: 16, textAlign: 'center' }}>{item.price} €</Text>
                          <Text style={{ flex: 1, fontSize: 16, textAlign: 'center' }}>{getStatusLabel(item.status as OrderStatus)}</Text>
                          <Text style={{ flex: 1, fontSize: 16, textAlign: 'center' }}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                      </View>
                  ))}
              </ScrollView>
          )}
      </StyledView>
  );
}
