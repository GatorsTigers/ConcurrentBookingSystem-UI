import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { urls } from '../../../utils/Config';

const LoginScreen = () =>  {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    // 0 -> initial state
    // 1 -> successfull login
    // 2 -> invalid credentials
    // 3 -> internal server error
    const [loginState, setLoginState] = useState(0);

    const handleLogin = () => {
        try {
            const response = axios.post(urls.loginUrl, {
                emailId: emailId,
                password: password
            });
            console.log('Response: ', response)
            if (response.status == 200) {
                setLoginState(1)
            }
            else {
                setLoginState(2)
            }
        } catch (error) {
            console.error('Error: ', error)
            setLoginState(3)
        }
    }

    const handleForgotPassword = () => {
        //TODO: Implement forgor password logic
    }

    return (
        <View>
        <Text style={styles.title}>Welcome to GoCineWave</Text>
        <View style={styles.container}>
        {loginState == 2 && (
                <Text style={styles.errorMessage}>Invalid Credentials</Text>
        )}
        <TextInput 
        style={styles.input}
        placeholder='EmailId'
        value={emailId}
        onChangeText={setEmailId}
        />
        </View>
        <View  style={styles.container}>
        <TextInput 
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}/>
        </View>
        <View style={styles.container}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 8
    },
    loginButton: {
        backgroundColor: '#007bff',
        padding: 15,
        width: '100%',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPasswordButton: {
        marginTop: 10,
    },
    forgotPasswordText: {
        color: "#007bff",
        fontSize: 14,
    },
    errorMessage: {
        color: "red",
        padding: 10,
        fontSize: 10
    }
});

export default LoginScreen