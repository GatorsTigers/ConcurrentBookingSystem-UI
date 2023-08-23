import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { urls } from '../../../utils/Config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const HomePage = () => {
    const [currentCity, setCurrentCity] = useState('');
    const [cities, setCities] = useState(['Kalaburagi', 'Bidar', 'Raichur']);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if(currentCity.length >= 2) {
            fetchCities()
        }
        else {
            setCities([]);
        }
    }, [currentCity])

    const handleSearch = () => {

    }

    const fetchCities = async () => {
        try {
            const response = await axios.get(urls.getCitiesUrl)
            setCities(response.data)
        } catch (error) {
            console.error("Error fetching cities: ", error)
        }
    }

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
            placeholder='Search City ...'
            onPress={(data, details = null) => {
                console.log(data, details)
            }}
            value={currentCity}
            onChangeText={setCurrentCity}
            // onChange={handleSearch}
            renderItem={({city}) => (
             <TouchableOpacity onPress={() => setCurrentCity(city)}>
                <Text style={styles.suggestionCity}>{currentCity}</Text>
            </TouchableOpacity>  
            )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f0f0f0",
        padding: 10
    },
    suggestionCity: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    }
});

export default HomePage