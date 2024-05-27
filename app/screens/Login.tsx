import {View, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView} from 'react-native'
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../src/components/utils/correo';
import { useRole } from '../../src/components/utils/verificarcorreo';
import {NavigationProp} from '@react-navigation/native';

interface RouteProps {
    navigation: NavigationProp<any, any>;
}

const getRoleFromEmail = (email) => {
    const domain = email.split('@')[1];
    if (domain === 'gmail.com') {
        return 'homehero';
    } else if (domain === 'hotmail.com') {
        return 'cliente';
    } else if (domain === 'hotmail.com') {
        return 'homehero';
    } else {
        return 'cliente';
    }
};

const Login = ({navigation}: RouteProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(Boolean);
    const auth = FIREBASE_AUTH
    const {userEmail, setUserEmail} = useAuth();
    const {role,setRoleFromEmail} = useRole();
    const [cliente, setCliente] = useState(null);
    const [error, setError] = useState(null);
    
    const navigateToScreen = async () => {
        const role = await getRole(email);
        if (role === 'cliente') {
            navigation.navigate('HomeCliente', { correo: email });
        } else if (role === 'homehero') {
            navigation.navigate('HomeHH');
        } else {
            navigation.navigate('SeleccionPerfil');
        }
    };

    const getRole = async (email) => {
        const login_client = await loginClient(email);
        if (login_client === 'ok') {
            return 'cliente';
        } else {
            const login_HH = await loginHH(email);
            if (login_HH === 'ok') {
                return 'homehero';
            } else {
                return 'sin ROl';
            }
        }
    }
    

    const loginHH = async (email) => {
        const urlCliente = `https://msusuarios-zaewler4iq-uc.a.run.app/User/GetHeroByMail?hero_mail=${email}`;
        try {
            const response = await fetch(urlCliente, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Data received from API (HH):', data);
            return 'ok';
        } catch (error) {
            console.error('Error al obtener el home hero:', error);
            return 'false';
        }
    }
    
    const loginClient = async (email) => {
        const urlCliente = `https://msusuarios-zaewler4iq-uc.a.run.app/User/GetClientByMail?client_mail=${email}`;
        try {
            const response = await fetch(urlCliente, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Data received from API (Client):', data);
            return 'ok';
        } catch (error) {
            console.error('Error al obtener el cliente:', error);
            return 'false';
        }
    }
    
    const selectRegister = () => {
        navigation.navigate('SeleccionPerfil');
    }
    
    const signIn = async () => {
        setUserEmail(email)
        setLoading(true);
        setRoleFromEmail(email)
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            //console.log(response);
            navigateToScreen();
        }catch (error) {
            alert('fallo al iniciar sesion' + error.message)
        }finally{
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            console.log(email);
            
            setUserEmail(email);
            const response = await createUserWithEmailAndPassword(auth, email, password);
            alert('Revise su correo');
            selectRegister();
        } catch (error) {
            alert('Fallo en el registro: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
            <TextInput style={styles.input}
            value={email}
            placeholder='Email'
            autoCapitalize='none'
            onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput style={styles.input}
            secureTextEntry={true}
            value={password}
            placeholder='Password'
            autoCapitalize='none'
            onChangeText={(text) => setPassword(text)}></TextInput>

            {loading ? ( <ActivityIndicator size="large" color="#0000ff"/> ):
            (<>
                <Button title='Login' onPress={() => signIn()}/>
                <Button title='Register' onPress={() => signUp()}/>
                
            </>
            )}
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
});