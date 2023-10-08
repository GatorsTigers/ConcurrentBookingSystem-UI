import React, { useEffect, useState } from 'react';
import SearchBar from './Searchbar'
import { movieData } from './movie-data';
import { majorCities, urls } from './Config.js';
import Header from './Header.js';
import Footer from './Footer.js';
import Dropdown from './Dropdown';
import MovieCard from './Movie';
import './style.css';

const SearchScreen = () => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [movies, setMovies] = useState(movieData);

  useEffect(() => {
    if (city.length > 2) {
      // Fetch cities from API
      fetch(urls.getCitiesUrl, {
        mode: 'cors',
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          setCities(data);
        })
        .catch((error) => {
          console.error('Error fetching cities:', error);
        });
    } else {
      setCities(cities);
    }
  }, [city]);

  const handleSearchChange = (text) => {
    setCity(text);
    const filteredCities = cities.filter((city) =>
      city.name.toLowerCase().includes(text.toLowerCase())
    );
    setCities(filteredCities);
  };

  const handleClick = () => {
    setCities(majorCities)
  }

  const handleCitySelection = (selectedCity) => {
    setCity(selectedCity.name);
    setCities([])
    // Fetch movies based on selected city from API
    fetch(urls.getMoviesUrl + `?city=${selectedCity.name}`, {
      mode: 'cors',
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  };

  const handleClearSearch = () => {
    setCity('');
    setCities(majorCities);
  };

  return (
    <>
      <Header />
      <div className="search-container">
        <SearchBar
          placeholder="Search for a city ..."
          onChange={handleSearchChange}
          onClear={handleClearSearch}
          onClick={handleClick}
          value={city}
        />
        <Dropdown data={cities} handleSelection={handleCitySelection}/>
        </div>
      {/* <div className="movies-container">
        {movies.map((item) => (
          <div key={item.id} className="card">
            <MovieCard
              movieName={item.name}
              imageUrl={item.imageUrl}
              cardContent={item.content}
            />
          </div>
        ))}
      </div> */}
      <Footer />
    </>
  );
};

export default SearchScreen;
