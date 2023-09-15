import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { View, StyleSheet, FlatList } from 'react-native';
import {urls, majorCities} from '/src/utils/Config.js'
import { Searchbar } from 'react-native-paper';
import Header from '/src/features/common/Header.js'
import Footer from '/src/features/common/Footer.js'
import { movieData } from '../../data/movie-data';
import {Dropdown}  from '../component/Dropdown.js';
import {MovieCard} from '../component/Movie.js'

  const SearchScreen = () => {
    const [city, setCity] = useState('');
    const [cities, setCities] = useState(majorCities);
    //TODO, fetch these from API
    const [movies, setMovies] = useState(movieData)

    useEffect(() => {
      if(city.length > 2) {
        fetch(urls.getCitiesUrl, {
          mode: 'cors',
          method: 'GET'
         })
        .then(response => {
          setCities(response.data)
        })
        .catch(error => {
          console.error('Error fetching cities:', error);
        });
      } else {
        setCities(majorCities)
      }
    }, [city]);
  
    const handleSearchChange = (text) => {
      setCity(text)
      const filteredCities = cities.filter(city => city.name.toLowerCase().includes(text.toLowerCase()))
      setCities(filteredCities);
    };

    const handleCitySelection = (city) => {
      setCity(city.name)
      fetch(urls.getMoviesUrl + `?city=${city}`, {
       mode: 'cors',
       method: 'GET'
      })
      .then(response => {
        console.log("Get City api: " + response.json)
        setMovies(response.data)
      })
      .catch(error => {
        console.error('Error fetching movies:', error)
      })
  }

  const handleClearSearch = () => {
    setCity('')
    setCities(majorCities)
  }

    return (
      <View>
        <Header/>
        <View style={styles.mainContainer}>
          <Searchbar placeholder="Search for a city ..." onChangeText={handleSearchChange} onClearIconPress={handleClearSearch} value={city}/>
          <Dropdown data={cities} handleSelection={handleCitySelection} />
        </View>
        <View>
        <FlatList
          contentContainerStyle={{alignSelf: 'flex-start'}}
          numColumns={Math.ceil(movies.length / 2)}
          data={movies}
          renderItem={({item}) => 
          <View style={styles.card}>
            <MovieCard movieName={item.name} imageUrl={item.imageUrl} cardContent={item.content}/>
          </View>
          }
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          />
        </View>
        <Footer/>
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
    card: {
      width: 250,
      marginHorizontal: 10, // Adjust this value for spacing between cards within a row
    },
    // Add a style for the spacing between cards
    itemSeparator: {
      marginVertical: 10,
    },
});

export default SearchScreen