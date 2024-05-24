import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const PlantDescripcionBtn = ({ visitId, heroId, clientName, clientId, address,visitDate, initTime, nombreServiceProfesional, estado, onPress }) => {

    // Función para obtener el texto y el estilo del estado
    const getEstadoInfo = (estado) => {
        switch (estado) {
            case 1:
                return { text: 'Pendiente', color: styles.estadoPendiente };
            case 2:
                return { text: 'Realizada', color: styles.estadoRealizada };
            case 3:
                return { text: 'Cancelada', color: styles.estadoCancelada };
            default:
                return { text: 'Desconocido', color: styles.estadoDesconocido };
        }
    };

    const { text, color } = getEstadoInfo(estado);

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.text}>
                        <Text style={styles.title}>
                            {'                    Visita                   '}
                        </Text>
                        <View style={styles.containerlabel}>
                            <Text style={styles.text}>{"Cliente: "}</Text>
                            <Text style={styles.text1}>{clientName}</Text>
                        </View>
                        <View style={styles.containerlabel}>
                            <Text style={styles.text}>{"Fecha: "}</Text>
                            <Text style={styles.text1}>{visitDate}</Text>
                            <Text style={styles.text}>{"   Hora: "}</Text>
                            <Text style={styles.text1}>{initTime}</Text>
                        </View>
                        <View style={styles.containerlabel}>
                            <Text style={styles.text}>{"Servicio: "}</Text>
                            <Text style={styles.text1}>{nombreServiceProfesional}</Text>
                        </View>
                        <View style={styles.containerlabel}>
                            <Text style={styles.text}>{"Estado: "}</Text>
                            <Text style={[styles.text1, color]}>{text}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 0,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        marginTop: 0,
        fontSize: 18,
        alignSelf: 'center',
        textAlign: "justify",
        fontWeight: 'bold',
    },
    textContainer: {
        fontSize: 18,
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
    },
    imageContainer: {
        marginTop: 15,
        alignSelf: 'center',
        width: 280,
        height: 200,
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    description: {
        marginTop: 20,
        fontSize: 18,
        alignSelf: 'center',
        textAlign: 'justify',
        paddingHorizontal: 40,
    },
    container: {
        padding: 20,
        alignItems: 'center',
    },
    contentContainer: {
        borderWidth: 0,
        borderColor: '#666',
        borderRadius: 7,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#0B7BFF',
        padding: 13,
        borderRadius: 2,
        alignItems: 'center',
        marginTop: 5,
        opacity: 10,
    },
    button2: {
        backgroundColor: '#BD0000',
        padding: 13,
        borderRadius: 2,
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    containerlabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    text1: {
        marginTop: 0,
        fontSize: 18,
        alignSelf: 'center',
        textAlign: "justify",
    },
    // Estilos para los estados
    estadoPendiente: {
        color: 'blue',
    },
    estadoRealizada: {
        color: 'green',
    },
    estadoCancelada: {
        color: 'red',
    },
    estadoDesconocido: {
        color: 'gray',
    }
});

export default PlantDescripcionBtn;
