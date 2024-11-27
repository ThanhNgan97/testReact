import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TouchableOpacity, View, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { AntDesign } from '@expo/vector-icons'; // Import icons

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility
    const [loading, setLoading] = useState(false);

    // Function to validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    async function signInWithEmail() {
        if (!email || !password) {
            Alert.alert('Error', 'Email and password cannot be empty.');
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert('Error', 'Invalid email format.');
            return;
        }

        setLoading(true);

        const { data: user, error: passwordError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (passwordError) {
            Alert.alert('Error', passwordError.message || 'Login failed.');
        } else if (user) {
            Alert.alert('Success', 'Login successful!');
            navigation.navigate('Home');
        }

        setLoading(false);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.container1}>
                <ImageBackground style={styles.image1} source={require('../Images/Login2.png')} />
            </View>

            <View style={styles.container2}>
                <Text style={styles.text1}> SIGN IN</Text>

                <TextInput
                    style={styles.containertxt}
                    placeholder="Enter your email"
                    onChangeText={(Text) => setEmail(Text)}
                    value={email}
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Enter your password"
                        secureTextEntry={!isPasswordVisible} // Toggle password visibility
                        onChangeText={(Pass) => setPassword(Pass)}
                        value={password}
                    />
                    <TouchableOpacity
                        onPress={() => setPasswordVisible(!isPasswordVisible)}
                    >
                        <AntDesign
                            name={isPasswordVisible ? 'eye' : 'eyeo'} // Toggle icon
                            size={24}
                            color="#A3A3A3"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={() => signInWithEmail()}
                >
                    <Text style={styles.LoginText}>Sign In</Text>
                </TouchableOpacity>

                {/* Thêm khoảng cách giữa hai nút */}
                <View style={{ marginBottom: 100 }} />

                <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                >
                    <Text style={styles.signupText}>Sign up for an account</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
        width: '105%',
        backgroundColor: '#fff',
    },
    container2: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image1: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    text1: {
        color: '#7AB2D3',
        fontSize: 45,
        fontWeight: 'bold',
        marginTop: 40,
    },
    containertxt: {
        width: '75%',
        height: '10%',
        backgroundColor: '#F4F4F4',
        margin: 7,
        borderRadius: 20,
        paddingHorizontal: 25,
    },
    passwordContainer: {
        flexDirection: 'row',
        width: '75%',
        height: '10%',
        backgroundColor: '#F4F4F4',
        margin: 7,
        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    passwordInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
    },
    buttonLogin: {
        width: '50%',
        height: '9%',
        backgroundColor: '#7AB2D3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: 50,
    },
    signupText: {
        color: '#4A628A',
        fontWeight: 'bold',
        fontSize: 17,
        textDecorationLine: 'underline',
    },
    LoginText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    }
});
