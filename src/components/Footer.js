import React from "react";
import { StyleSheet, View, Image, Text} from 'react-native';
import BlueButton from './Button'; // Importa el componente BlueButton

const Footer = () => {
    return (
        <View style={styles.container}>
            <View style={styles.iconButton}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://img.icons8.com/ios-filled/100/000000/calendar--v1.png' }}
                />
                <Text style={styles.text}>Agenda</Text>
            </View>
            <View style={styles.iconButton}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://img.icons8.com/ios-filled/100/000000/time-machine.png' }}
                />
                <Text style={styles.text}>Historial</Text>
            </View>
            <View style={styles.iconButton}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://img.icons8.com/ios-filled/100/000000/home.png' }}
                />
                <Text style={styles.text}>Inicio</Text>
            </View>
            <View style={styles.iconButton}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://img.icons8.com/ios-filled/100/000000/receipt-dollar.png' }}
                />
                <Text style={styles.text}>Cotizaciones</Text>
            </View>
            <View style={styles.iconButton}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://img.icons8.com/ios-filled/100/visit.png' }}
                />
                <Text style={styles.text}>Visitas</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopColor: '#e3e4e7',
        borderTopWidth: 1.5,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 0,
        width: '100%',
        height: 48,
        backgroundColor: '#fff'
    },
    image: {
        width: 24, // Ancho de la imagen
        height: 24, // Altura de la imagen
    },
    iconButton:{
        top: '0.5%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 10
    }
});

export default Footer;
