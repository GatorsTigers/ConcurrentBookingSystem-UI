import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.container}>
            <View style={styles.footer}>
                <Text style={styles.footerText}>GoCineWave®️ 2023.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        flexDirection: 'column',
      },
      footer: {
        height: 40, // Adjust the height as needed
        backgroundColor: '#03cffc', // Customize the footer background color
        justifyContent: 'center',
        alignItems: 'center',
      },
      footerText: {
        color: 'white', // Customize the footer text color
        fontSize: 14, // Customize the footer text size
      },
})

export default Footer;