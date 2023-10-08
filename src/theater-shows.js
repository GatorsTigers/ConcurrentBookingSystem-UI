import { styled } from "styled-components";
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import Header from './Header.js'
import Footer from './Footer.js'
import {MovieCard} from './Movie'
import { movieData } from './movie-data';
import {theaterShowData} from './theater-show-data'
import {urls} from './Config.js'
import {TheaterShow} from './theater-show-row'


export const TheaterShowScreen = ({movieId}) => {
    const [theaterShow, setTheaterShow] = useState(theaterShowData)
    const [date, setDate] = useState(new Date(0))

    const handleDateChange = (date) => {
        const selectedDate = new Date(date)
        console.log('Today\'s date: ' + selectedDate)
        setDate(selectedDate)
    }

    // useEffect(() => {
    //     console.log(urls.getTheaterShowsUrl + `?movieId=${movieId}&date=${date.toISOString()}`)
    //     fetch(urls.getTheaterShowsUrl + `?movieId=${movieId}&date=${date.toISOString()}`)
    //     .then(response => {
    //         console.log("Get City api: " + response.json)
    //         setTheaterShow(response.data)
    //       })
    //       .catch(error => {
    //         console.error('Error fetching theater shows:', error)
    //       })
    // }, [date])

    return (
        <View style={styles.container}>
        <Header/>
        <View>
        <CalendarStrip style={styles.calendar} onDateSelected={handleDateChange}/>
        <FlatList
          contentContainerStyle={{alignSelf: 'flex-start'}}
          data={theaterShow}
          renderItem={({item}) => <TheaterShow theaterName={item.theaterName} showDetails={item.shows}/>}
          keyExtractor={(item, index) => index}
        //   ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          />
          </View>
        <Footer/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    calendar: {
        height:150,
        paddingTop: 20,
        paddingBottom: 10
    }
  });