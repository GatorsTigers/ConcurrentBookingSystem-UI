import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import {urls, majorCities} from '/src/utils/Config.js'
import { Searchbar, Card, Text } from 'react-native-paper';
import Header from '/src/features/common/Header.js'
import Footer from '/src/features/common/Footer.js'

const MovieCard = ({movieName, imageUrl, cardContent}) => (
  <Card >
    <Card.Title title={movieName}/>
    <Card.Cover source={{ uri:  imageUrl}} />
    <Card.Content>
      <Text variant="bodySmall">{cardContent}</Text>
    </Card.Content>
  </Card>
);

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
    const [cities, setCities] = useState(majorCities);
    //TODO, fetch these from API
    const [movies, setMovies] = useState([{
        id: 1,
        name: 'Oppenheimer',
        imageUrl: 'https://picsum.photos/600'
      },
      {
        id: 2,
        name: 'Mission Impossible: X',
        imageUrl: 'https://picsum.photos/700'
      },
      {
        id: 3,
        name: 'Barbie',
        imageUrl: 'https://picsum.photos/800'
      },
      {
        id: 4,
        name: 'No Hard Feelings',
        imageUrl: 'https://picsum.photos/900'
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
      axios.get(urls.getMoviesUrl + "?city=${city}")
      .then(response => {
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
    suggestions: {
        padding: 10,
        backgroundColor: '#e6e6ff',
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