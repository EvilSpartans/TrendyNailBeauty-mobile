import React, { useEffect, useState } from 'react';
import { TextInput, View, TouchableOpacity, Modal, Text, Switch, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Tabnav } from '../../models/TabNav';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../services/category.service';
import { AppDispatch, RootState } from '../../store/Store';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider'; 
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledSwitch = styled(Switch);
const StyledModal = styled(Modal);
const StyledScrollView = styled(ScrollView);

export default function FilterComponent(): React.JSX.Element {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [onSale, setOnSale] = useState(false);
    const [maxPrice, setMaxPrice] = useState(600);
    const [sortBy, setSortBy] = useState('price_asc');
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<Tabnav>>();

    const categories = useSelector((state: RootState) => state.category.categories);

    useEffect(() => {
        dispatch(getAllCategories({}));
    }, [dispatch]);

    const applyFilters = () => {
        const filters: any = {
            term: searchTerm,
            onSale,
            maxPrice,
            sortBy,
        };
        if (selectedCategory !== '') {
            filters.category = selectedCategory;
        }
        navigation.navigate('AllProducts', filters);
        setModalVisible(false);
    };

    return (
        <StyledView>
            <StyledTouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-white border border-yellow-600 p-2 rounded-lg items-center ml-2 mt-4">
                <StyledText className="text-yellow-600 text-lg">
                    Filtres
                </StyledText>
            </StyledTouchableOpacity>

            <StyledModal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                
                {/* Cette vue est cliquable et ferme la modale lorsqu'on clique en dehors */}
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <StyledView className="flex-1 bg-black bg-opacity-50 justify-center items-center">
                        
                        {/* Empêche la fermeture de la modale si on clique à l'intérieur */}
                        <TouchableWithoutFeedback>
                            <StyledView className="w-4/5 bg-white rounded-lg p-5">
                                <StyledScrollView>
                                    <StyledText className="text-xl font-bold mb-4">Filtres</StyledText>

                                    {/* Sélecteur de catégorie avec Picker */}
                                    <StyledText>Catégorie :</StyledText>
                                    <Picker
                                        selectedValue={selectedCategory}
                                        onValueChange={(itemValue) => {
                                            setSelectedCategory(itemValue === '' ? '' : itemValue);
                                        }}
                                        style={{ marginBottom: 16, height: 48 }}
                                    >
                                        <Picker.Item label="Toutes les catégories" value="" />
                                        {categories.map((category) => (
                                            <Picker.Item key={category.id} label={category.name} value={category.name} />
                                        ))}
                                    </Picker>

                                    {/* Champ de texte pour le terme */}
                                    <StyledText>Mot-clé :</StyledText>
                                    <StyledTextInput
                                        placeholder="Rechercher..."
                                        className="h-10 border border-gray-300 rounded p-2 mb-4"
                                        onChangeText={(text) => setSearchTerm(text)}
                                    />

                                    {/* Switch pour 'onSale' */}
                                    <StyledView className="flex-row items-center mb-4">
                                        <StyledText>En solde :</StyledText>
                                        <StyledSwitch
                                            value={onSale}
                                            onValueChange={setOnSale}
                                            className="ml-2"
                                        />
                                    </StyledView>

                                    {/* Slider pour le prix maximum */}
                                    <StyledText>Prix maximum :</StyledText>
                                    <Slider
                                        style={{ width: '100%', height: 40 }}
                                        minimumValue={0}
                                        maximumValue={1000}
                                        step={10}
                                        value={maxPrice}
                                        onValueChange={setMaxPrice}
                                        minimumTrackTintColor="#DAA520"
                                        maximumTrackTintColor="#000000"
                                    />
                                    <StyledText className="text-center mt-2">{maxPrice} €</StyledText>

                                    {/* Sélecteur de tri */}
                                    <StyledText>Trier par :</StyledText>
                                    <Picker
                                        selectedValue={sortBy}
                                        onValueChange={(itemValue) => setSortBy(itemValue)}
                                        style={{ marginBottom: 16, height: 48 }}
                                    >
                                        <Picker.Item label="Prix croissant" value="price_asc" />
                                        <Picker.Item label="Prix décroissant" value="price_desc" />
                                    </Picker>

                                    {/* Boutons pour appliquer et fermer */}
                                    <StyledView className="flex-row justify-between mt-2 mb-4">
                                        <StyledTouchableOpacity className="bg-yellow-600 p-3 rounded-lg flex-1 mr-2 items-center" onPress={applyFilters}>
                                            <StyledText className="text-white text-lg">Appliquer</StyledText>
                                        </StyledTouchableOpacity>
                                        <StyledTouchableOpacity className="bg-gray-300 p-3 rounded-lg flex-1 items-center" onPress={() => setModalVisible(false)}>
                                            <StyledText className="text-black text-lg">Fermer</StyledText>
                                        </StyledTouchableOpacity>
                                    </StyledView>
                                </StyledScrollView>
                            </StyledView>
                        </TouchableWithoutFeedback>
                    </StyledView>
                </TouchableWithoutFeedback>
            </StyledModal>
        </StyledView>
    );
}
