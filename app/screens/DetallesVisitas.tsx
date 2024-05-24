import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DetallesVisita = ({ route }) => {
    const { visitId, heroId, clientId, clientName, address, visitDate, initTime, nombreServiceProfesional, estado } = route.params;

    const getEstadoText = (estado) => {
        switch (estado) {
            case 1: return 'Pendiente';
            case 2: return 'Realizada';
            case 3: return 'Cancelada';
            default: return 'Desconocido';
        }
    };

    const getButtonProps = (estado) => {
        switch (estado) {
            case 1:
                return { text: 'Realizar Visita', color: styles.buttonPendiente, action: () => console.log('Realizar Visita') };
            case 2:
                return { text: 'Realizar Cotización', color: styles.buttonRealizada, action: () => console.log('Realizar Cotización') };
            case 3:
                return { text: '', color: {}, action: null };
            default:
                return { text: '', color: {}, action: null };
        }
    };

    const { text, color, action } = getButtonProps(estado);

    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Detalles de la Visita</Text>
                <Text style={styles.text}>Cliente: {clientName}</Text>
                <Text style={styles.text}>Fecha: {visitDate}</Text>
                <Text style={styles.text}>Hora: {initTime}</Text>
                <Text style={styles.text}>Dirección: {address}</Text>
                <Text style={styles.text}>Servicio: {nombreServiceProfesional}</Text>
                <Text style={styles.text}>Estado: {getEstadoText(estado)}</Text>
                {estado !== 3 && (
                    <TouchableOpacity style={[styles.button, color]} onPress={action}>
                        <Text style={styles.buttonText}>{text}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsContainer: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        borderWidth: 0,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonPendiente: {
        backgroundColor: '#4CAF50',
    },
    buttonRealizada: {
        backgroundColor: '#0B7BFF',
    }
});

export default DetallesVisita;
