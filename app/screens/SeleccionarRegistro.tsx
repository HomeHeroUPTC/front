import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
interface RouteProps {
    navigation: NavigationProp<any, any>;
}

const SelectProfile = ({navigation}:RouteProps) => {
    const navigate = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seleccione el tipo de rol que desea</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Heroe del Hogar (HH)"
                    onPress={() => navigate.replace('FormularioProfesional')}
                    color="#6200EE"
                />
                <Button
                    title="Cliente"
                    onPress={() => navigation.replace('FormularioCliente')}
                    color="#6200EE"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    buttonContainer: {
        width: '80%',
        marginBottom: 10,
    },
});

export default SelectProfile;
