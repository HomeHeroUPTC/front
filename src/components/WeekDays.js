import React from "react";
import { StyleSheet, Text, View } from 'react-native';

const WeekDays = ({ diasDisponibles }) => {
    const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    const diasDisponiblesArray = diasDisponibles.split('').map((char) => char.toUpperCase());

    return (
        <View style={styles.daysRow}>
            {diasSemana.map((dia, index) => (
                <Text key={index} style={[styles.day, diasDisponiblesArray.includes(dia) ? styles.dayAvailable : null]}>
                    {dia}
                </Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5,
        marginBottom: 5,
        right: '5%'
    },
    day: {
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'lightgray', // Color por defecto
    },
    dayAvailable: {
        backgroundColor: '#007bff',
        color: '#171717', // Cambia el color de la fuente para los días disponibles
    },
});

export default WeekDays;
