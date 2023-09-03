import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>GoCineWave</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        height: 60, // Adjust the height as needed
        backgroundColor: '#03cffc', // Customize the header background color
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: 'white', // Customize the header text color
        fontSize: 18, // Customize the header text size
        fontWeight: 'bold', // Customize the header text weight
      },
})

export default Header;