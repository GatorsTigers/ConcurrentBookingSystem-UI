import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Searchbar, Card, Text } from 'react-native-paper';
// import { urls } from './src/utils/Config';
const urls = {
  'loginUrl': 'http://localhost:8000/login',
  'getCitiesUrl': 'http://localhost:8000/cities',
  'getMoviesUrl': 'http://localhost:8000/movies'
}

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
    const [cities, setCities] = useState([{id: 1, name: 'Kalaburagi'}, {id: 2, name:'Bidar'}, {id: 3, name:'Raichur'}]);
    const [movies, setMovies] = useState([{
        id: 1,
        name: 'Oppenheimer',
        imageUrl: 'https://picsum.photos/600',
        content: "Step into the shadows of history with Oppy, a gripping cinematic journey that delves into the life\
        and moral complexities of J. Robert Oppenheimer. Set against the backdrop of World War II, this\
        thought-provoking biographical drama unravels the untold story of the brilliant physicist tasked\
         with leading the Manhattan Project."
      },
      {
        id: 2,
        name: 'Mission Impossible: X',
        imageUrl: 'https://picsum.photos/700',
        content: "Gear up for an electrifying cinematic adventure with Mission: Impossible.\
        Join Ethan Hunt and his elite team in a high-octane thriller that pushes\
        the boundaries of espionage action."
      },
      {
        id: 3,
        name: 'Barbie',
        imageUrl: 'https://picsum.photos/800',
        content: "Step into a world of enchantment and imagination with Barbie. Join Barbie on a magical\
         journey that celebrates friendship, empowerment, and the endless possibilities of dreams."
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
  }

    return (
      <>
        <View style={styles.mainContainer}>
          <Searchbar placeholder="Search for a city ..." onChangeText={handleSearchChange} value={city}/>
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
      </>
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