import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import BlueButton from "./Button";

// Función para formatear la fecha
const formatearFecha = (fecha) => {
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = meses[date.getMonth()];
    const año = date.getFullYear();

    return `${dia} ${mes} de ${año}`;
};

const AgendaComponente = ({ nombre, descripcion, fecha, hora }) => {
    const fechaFormateada = formatearFecha(fecha);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={[styles.column, styles.columnWithLessSpace]}>
                    <Text style={styles.value}>{fechaFormateada}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={[styles.value, styles.descriptionValue]}>{descripcion}</Text>
                </View>
            </View>
            <View style={[styles.row, styles.rowWithLessSpace]}>
                <View style={[styles.column, styles.columnWithLessSpace]}>
                    <Text style={styles.value}>{hora}:00</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.value}>{nombre}</Text>
                </View>
            </View>
            
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
    rowWithLessSpace: {
        marginBottom: 5,
    },
    column: {
        flex: 1,
    },
    columnWithLessSpace: {
        marginRight: 10, // Reducir el espacio entre las columnas
        marginLeft: 10, // Reducir el espacio entre las columnas
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
