import React, { useEffect, memo, useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urls } from './Config';


const SearchBar = ({ onChangeText, onButtonPress }) => (
    <View style={styles.searchContainer}>
      <TextInput style={styles.searchBar}
      placeholder="Search for a city..."
      onChangeText={onChangeText}
      />
      <Button variant='primary' className="btn-primary" onClick={onButtonPress}> <Text>Search</Text> </Button>
    </View>
  );

const Dropdown = ({ data }) => (
    <FlatList
      style={styles.suggestions}
      data={data}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      keyExtractor={(item) => item.id}
    />
  );

  const SearchScreen = () => {
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([{id: 1, name: 'Kalaburagi'}, {id: 2, name:'Bidar'}, {id: 3, name:'Raichur'}]);

    useEffect(() => {
      if(city.length > 2) {
        axios.get(urls.getCitiesUrl)
        .then(response => {
          setCities(response.data)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      } else {
        setCities([{id: 1, name: 'Kalaburagi'}, {id: 2, name:'Bidar'}, {id: 3, name:'Raichur'}])
      }
    }, [city]);
  
    const handleSearchChange = (text) => {
      setCity(text);
      const filteredCities = cities.filter(city => city.name.toLowerCase().includes(text.toLowerCase()))
        .map(city => ({
          id: city.id,
          name: city.name,
        }))
      setCities(filteredCities);
    };

    const handleSearchButtonPress = () => {
      console.log("City Selected...")
    }

    return (
        <View style={styles.mainContainer}>
          <SearchBar onChangeText={handleSearchChange} onButtonPress={handleSearchButtonPress}/>
          <Dropdown data={cities} />
        </View>
      );
};
  
const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: 'col',
      padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
    },
    searchBar: {
      width: 500,
      borderWidth: 2,
      borderRadius: 30,
    },
    suggestions: {
        padding: 10,
        backgroundColor: '#ccc',
    }
});

export default SearchScreen