import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const PlantDescripcionBtn = ({ image_url, visitId, heroId, clientName, clientId, address, visitDate, initTime, nombreServiceProfesional, estado, service_id, onPress }) => {

    // Función para obtener el texto y el estilo del estado
    const getEstadoInfo = (estado) => {
        switch (estado) {
            case 1:
                return { text: 'Pendiente', color: styles.estado, backgroundColor: '#ADD8E6' };
            case 2:
                return { text: 'Realizada', color: styles.estado, backgroundColor: '#90EE90' };
            case 3:
                return { text: 'Cancelada', color: styles.estado, backgroundColor: '#FF6347' };
            default:
                return { text: 'Desconocido', color: styles.estado, backgroundColor: '#D3D3D3' };
        }
    };

    const { text, color, backgroundColor } = getEstadoInfo(estado);

    function formato24Horas(hora) {
        if (hora < 1 || hora > 24) {
            return "Hora inválida";
        } else if (hora < 12) {
            return hora + " AM";
        } else if (hora === 12) {
            return "12 M";
        } else {
            return hora - 12 + " PM";
        }
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.info}>
                    <Image
                        style={styles.image}
                        source={{ uri: image_url}}
                    />
                    <View style={styles.textContainer}>
                        <View style={styles.texts}>
                            <Text style={styles.title}>
                                {clientName}
                            </Text>
                            <View style={styles.infoVisit}>
                                <Text style={styles.paragraph}>
                                    {visitDate}
                                </Text>
                                <Text style={styles.paragraph}>
                                    {formato24Horas(initTime)}
                                </Text>
                                <Text style={styles.paragraph}>
                                    {"Servicio de " + nombreServiceProfesional}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.statusContainer, { backgroundColor }]}>
                            <Text style={[styles.text1, color]}>{text}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'black'
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10, // Borde redondeado para el contenedor de información
        borderWidth: 0.3,
        borderColor: '#e3e4e7',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
    },
    image: {
        width: 100,
        height: 100, // Altura y ancho iguales para que sea cuadrada
        borderRadius: 10, // Borde redondeado para la imagen
    },
    paragraph: {
        fontSize: 16,
        color: '#171717',
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    texts: {
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#171717',
        marginBottom: 5,
    },
    infoVisit:{
        bottom:5
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
        color: '#171717',
    },
    // Estilos para los estados
    estado: {
        color: '#171717',
    },
    statusContainer: {
        alignItems: 'center',
        borderRadius: 20, // Borde redondeado para el contenedor de estado
        padding: 5,
        marginTop: 5,
    }
});

export default PlantDescripcionBtn;
