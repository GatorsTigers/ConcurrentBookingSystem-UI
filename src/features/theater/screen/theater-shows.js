import { styled } from "styled-components";
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import Header from '/src/features/common/Header.js'
import Footer from '/src/features/common/Footer.js'
import {MovieCard} from '/src/features/dashboard/search/component/Movie'
import { movieData } from '../../dashboard/data/movie-data';
import {theaterShowData} from '../data/theater-show-data'
import {urls} from '/src/utils/Config.js'
import {TheaterShow} from '../component/theater-show-row'


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