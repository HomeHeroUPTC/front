import React from "react";
import { StyleSheet, View, Image, Text} from 'react-native';
import BlueButton from './Button'; // Importa el componente BlueButton

const Footer = () => {
    return (
        <View style={styles.container}>
            <View style={styles.iconButton}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/HomeIcon.png')}
                />
                <Text style={styles.text}>Home</Text>
            </View>
            <Image
                style={styles.image}
                source={require('../assets/images/HomeIcon.png')}
            />
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
        height: 42,
        backgroundColor: '#fff'
    },
    image: {
        width: 24, // Ancho de la imagen
        height: 24, // Altura de la imagen
    },
    iconButton:{
        backgroundColor: 'pink',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 10
    }
});

export default Footer;
