import React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {FIREBASE_AUTH} from '../../firebaseConfig';
import { useRole } from '../../src/components/utils/verificarcorreo';

interface RouteProps {
    navigation: NavigationProp<any, any>;
}

export default function Puntodeentrada({navigation}: RouteProps) {
    const {role} = useRole();
    return (
        <View style={styles.container}>
            <Text>{role}</Text>
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout"/>
            <View	
                style={styles.button}>	
            </View>
            <View style={styles.button}>
                <Button
                    title="2.Cotizacion"
                    onPress={() => navigation.navigate('Cotizaciones')}
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="4.Visitas"
                    onPress={() => navigation.navigate('Visitas')}
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="23.HomeCliente"
                    onPress={() => navigation.navigate('HomeCliente')}
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="31.HomeHH"
                    onPress={() => navigation.navigate('HomeHH')}
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="12.DoceCotizaciones"
                    onPress={() => navigation.navigate('DoceCotizaciones')}
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="32.RegistrarServicios"
                    onPress={() => navigation.navigate('RegistrarServicios')}
                />
            </View>
            <View style={styles.button}>
                <Button
                     title="24.Feed Profesionales Cliente"
                     onPress={() => navigation.navigate('ProfesionalesDelServicio')}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },

    button: {
        width: 130,
        height: 50,
        alignItems: 'center',
        marginTop: 20,
    }
});
