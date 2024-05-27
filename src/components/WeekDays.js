import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

const WeekDays = ({ fechas }) => {
    const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    // Función para obtener el día de la semana en formato 'L', 'M', 'X', 'J', 'V', 'S', 'D'
    const obtenerDiaSemana = (fecha) => {
        const diasMap = {
            1: 'L',
            2: 'M',
            3: 'X',
            4: 'J',
            5: 'V',
            6: 'S',
            0: 'D'
        };
        return diasMap[moment(fecha).day()];
    };

    // Obtener el inicio y el final de la semana actual
    const inicioSemana = moment().startOf('week');
    const finSemana = moment().endOf('week');

    // Filtrar las fechas que están en la misma semana que la semana actual
    const fechasMismaSemana = fechas.filter(fecha => 
        moment(fecha).isSameOrAfter(inicioSemana) && moment(fecha).isSameOrBefore(finSemana)
    );

    // Obtener los días disponibles en formato 'L', 'M', 'X', 'J', 'V', 'S', 'D'
    const diasDisponiblesArray = fechasMismaSemana.map(fecha => obtenerDiaSemana(fecha));

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
