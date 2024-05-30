import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const ServiceCard = ({ service }) => {
    const handlePress = () => {
        // Aquí podrías implementar la lógica para manejar el evento onPress si es necesario
        console.log("Card pressed");
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: service.image }}
                />
                <View style={styles.info}>
                    <Text style={styles.title}>{service.title}</Text>
                    <Text style={styles.description}>{service.description}</Text>
                    <Text style={styles.price}>Price: ${service.price}</Text>
                    <Text style={styles.description}>Servicio de {service.service_type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    type: {
        fontSize: 14,
        color: '#666666',
    },
});

export default ServiceCard;
