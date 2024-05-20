import {View, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react';
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
        console.log(email, 'verify hhses')
        return 'homehero';
    } else if (domain === 'hotmail.com') {
        return 'cliente';
    } else {
        console.log(email, 'verify cl')
        return 'cliente';
    }
};

const Login = ({navigation}: RouteProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(Boolean);
    const auth = FIREBASE_AUTH
    const {setUserEmail} = useAuth();
    const {role,setRoleFromEmail} = useRole();
    const navigateToScreen = () => {
        const role =getRoleFromEmail(email)
        if (role === 'cliente') {
            navigation.navigate('HomeCliente');
        } else if (role === 'homehero') {
            navigation.navigate('HomeHH');
        }
    };
    const signIn = async () => {
        console.log(email)
        setUserEmail(email)
        setLoading(true);
        setRoleFromEmail(email)
        try {
            console.log(role)
            const response = await signInWithEmailAndPassword(auth, email, password);
            //console.log(response);
            navigateToScreen();
        }catch (error) {
            console.log(error);
            alert('fallo al iniciar sesion' + error.message)
        }finally{
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Revise su correo (? *to do*')
        }catch (error) {
            console.log(error);
            alert('fallo en el registro' + error.message)
        }finally{
            setLoading(false);  
        }
    }

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