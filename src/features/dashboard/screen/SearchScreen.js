import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Searchbar } from 'react-native-paper';
// import { urls } from './src/utils/Config';
const urls = {
  'loginUrl': 'http://localhost:8000/login',
  'getCitiesUrl': 'http://localhost:8000/cities',
  'getMoviesUrl': 'http://localhost:8000/movies'
}

const Dropdown = ({ data, handleSelection }) => (
    <FlatList
      style={styles.suggestions}
      data={data}
      renderItem={({item}) => 
        <TouchableWithoutFeedback onPress={() => handleSelection(item)}>
          <Text>{item.name}</Text>
        </TouchableWithoutFeedback>
      }
      keyExtractor={(item) => item.id}
    />
  );

  const SearchScreen = () => {
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([{id: 1, name: 'Kalaburagi'}, {id: 2, name:'Bidar'}, {id: 3, name:'Raichur'}]);
    const [movies, setMovies] = useState([{
        id: 1,
        name: 'Oppenheimer',
        imageIrl: ''
      },
      {
        id: 2,
        name: 'Mission Impossible: X',
        imageUrl: ''
      }])

    useEffect(() => {
      if(city.length > 2) {
        axios.get(urls.getCitiesUrl)
        .then(response => {
          setCities(response.data)
        })
        .catch(error => {
          console.error('Error fetching cities:', error);
        });
      } else {
        setCities(cities)
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

    const handleCitySelection = (city) => {
      setCity(city.name)
      axios.get(urls.getMoviesUrl + "?city=${city}")
      .then(response => {
        setMovies(response.data)
      })
      .catch(error => {
        console.error('Error fetching movies:', error)
      })
    //  setMovies(movies)}
  }

    return (
        <View style={styles.mainContainer}>
          <Searchbar placeholder="Search for a city ..." onChangeText={handleSearchChange} value={city}/>
          <Dropdown data={cities} handleSelection={handleCitySelection} />
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