import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Register({ navigation }) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    async function signUpWithEmail() {
        // Validate email format
        if (!email) {
            Alert.alert('Error', 'Email field cannot be empty.');
            return;
        }

        if (!emailRegex.test(email)) {
            Alert.alert('Invalid Email Format', 'Please enter a valid email address.');
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) {
                // Check if the email already exists
                if (error.message.includes('already registered')) {
                    Alert.alert('Email Exists', 'Please try another one.');
                } else {
                    Alert.alert('Sign-up Error', `Failed to create an account: ${error.message}`);
                }
                return;
            }

            if (data.user) {
                Alert.alert('Success', 'Account created successfully! Please check your email for confirmation.');
                navigation.navigate('Login');
            } else {
                Alert.alert('Failure', 'Registration failed. Please try again.');
            }
        } catch (err) {
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
            console.error('Unexpected error:', err);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <ImageBackground
                    style={styles.image1}
                    source={require("../Images/SignUp.png")}
                />
            </View>

            <View style={styles.container2}>
                <Text style={styles.text2}>CREATE AN ACCOUNT</Text>
                <TextInput
                    style={styles.containertxt}
                    placeholder="Enter your email"
                    keyboardType="email-address" // Set keyboard for email input
                    autoCapitalize="none" // Prevent auto-capitalization
                    onChangeText={(Email) => setEmail(Email)}
                />
                <TextInput
                    style={styles.containertxt}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    onChangeText={(Pass) => setPassword(Pass)}
                />
                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={signUpWithEmail}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },

    container1: {
        flex: 1.4,
        width: '100%',
        backgroundColor: '#fff',
    },
    container2: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    image1: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },

    text2: {
        color: '#7AB2D3',
        fontSize: 29,
        fontWeight: 'bold',
        marginVertical: 35,
        marginTop: 25,
    },

    containertxt: {
        width: '75%',
        height: '9%',
        backgroundColor: '#ededed',
        margin: 7,
        borderRadius: 25,
        padding: 15,
    },

    buttonRegister: {
        width: '50%',
        height: '9%',
        backgroundColor: '#7AB2D3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: 60,
    },
});
