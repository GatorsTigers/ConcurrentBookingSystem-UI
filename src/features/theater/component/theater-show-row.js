import { Fragment } from 'react';
import { View, StyleSheet } from 'react-native';

const format_date = (date) => {
    return date.getHours() + ':' + date.getMinutes();
}

const Theater = ({name}) => {
    const theaterStyle = {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#04d15d',
        borderColor: '#04d15d',
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        fontFamily: 'Helvetica Neue',
        width: 100,
      };
    return (
        <View style={theaterStyle}>
            <h2>{name}</h2>
        </View>
    )
}

const Show = ({showId, startTime, endTime}) => {
    const showStyle = {
        display: 'flex',
        marginLeft: 15,
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#cbf7e7',
        borderColor: '#cbf7e7',
        borderRadius: 10,
        borderWidth: 1,
        fontFamily: 'Helvetica Neue'
      };
      const headingStyle = {
        color: 'green',
        marginBottom: '0px',
      };
    
      const paragraphStyle = {
        color: 'black',
      };
    return (
        <View style={showStyle}>
        <h4 style={headingStyle} >{showId}</h4>
        <p style={paragraphStyle}>{format_date(startTime)} to {format_date(endTime)}</p>
        </View>
    )
}

export const TheaterShow = ({theaterName, showDetails}) => {
    return (
        <View style={styles.container}>
            <Theater name={theaterName}/>
            {
                showDetails.map((show, i) => (
                    <Show style={styles.show} key={i} showId={show.showId} startTime={show.startTime} endTime={show.endTime}/>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
  });