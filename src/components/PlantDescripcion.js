import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import BlueButton from "./Button";

const AgendaComponente = ({ fecha, hora, descripcion, direccion, precio }) => {
    // Función para convertir la fecha al formato deseado
    const formatFecha = (fecha) => {
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        const [year, month, day] = fecha.split('-');
        return `${parseInt(day, 10)} de ${meses[parseInt(month, 10) - 1]} del ${year}`;
    };

    // Función para convertir la hora al formato militar
    const formatHora = (hora) => {
        return `${hora}:00`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.title}>Fecha</Text>
                    {/* Utilizamos la función formatFecha para mostrar la fecha en el formato deseado */}
                    <Text style={styles.value}>{formatFecha(fecha)}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.title}>Descripción</Text>
                    <Text style={[styles.value, styles.descriptionValue]}>{descripcion}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.title}>Hora</Text>
                    {/* Utilizamos la función formatHora para mostrar la hora en formato militar */}
                    <Text style={styles.value}>{formatHora(hora)}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.title}>Dirección</Text>
                    <Text style={styles.value}>{direccion}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.title}>Precio</Text>
                    <Text style={styles.value}>{precio}</Text>
                </View>
            </View>
            <BlueButton
                text={"Modificar"}
                style={styles.button}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    column: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5, // Añadimos un espacio entre el título y el valor
    },
    value: {
        fontSize: 16,
        color: '#666',
    },
    descriptionValue: {
        fontStyle: 'italic',
        color: 'blue',
    },
    button: {
        marginTop: 20,
    },
});

export default AgendaComponente;
