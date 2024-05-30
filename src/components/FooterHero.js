import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FooterHero = () => {
    const navigation = useNavigation();
    const [heroData, setHeroData] = useState(null);

    useEffect(() => {
        const fetchHeroDataFromStorage = async () => {
            try {
                // Recuperar los datos guardados en AsyncStorage
                const storedData = await AsyncStorage.getItem('heroData');
                if (storedData) {
                    // Si hay datos almacenados, convertirlos de nuevo a objeto JSON
                    const parsedData = JSON.parse(storedData);
                    setHeroData(parsedData);
                }
            } catch (error) {
                console.error('Error al recuperar los datos del héroe desde AsyncStorage:', error);
            }
        };
        fetchHeroDataFromStorage();
    }, []);

    const handlePressVisitas = () => {
        if (heroData) {
            navigation.navigate('Visitas', { id_client: heroData.id });
        }
    };


    const handlePressAgenda = () => {
        navigation.navigate('Agenda', { id_client: heroData.id });
    };

    const handlePressHistorial = () => {
        navigation.navigate('Agenda', { id_client: heroData.id });
    };

    const handlePressInicio = () => {
        navigation.navigate('HomeHH', { id_client: heroData.id });
    };

    const handlePressCotizaciones = () => {
        navigation.navigate('Cotizaciones', { id_client: heroData.id });
    };


    return (
        <View style={styles.container}>
            <View style={styles.iconButton}>
                <TouchableOpacity style={styles.iconButton} onPress={() => handlePressAgenda()}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://img.icons8.com/ios-filled/100/000000/calendar--v1.png' }}
                    
                />
                <Text style={styles.text}>Agenda</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.iconButton}>
                <Image
                    style={styles.image}
                    source={{uri: 'https://img.icons8.com/ios-filled/100/000000/time-machine.png'}}
                />
                <Text style={styles.text}>Historial</Text>
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={() => handlePressInicio()}>
                <Image
                    style={styles.image}
                    source={{uri: 'https://img.icons8.com/ios-filled/100/000000/home.png'}}
                />
                <Text style={styles.text}>Inicio</Text>
            </TouchableOpacity>
            <View style={styles.iconButton}>
                <TouchableOpacity style={styles.iconButton} onPress={() => handlePressCotizaciones()}>
                <Image
                    style={styles.image}
                    source={{uri: 'https://img.icons8.com/ios-filled/100/000000/receipt-dollar.png'}}
                />
                <Text style={styles.text}>Cotizaciones</Text>
                </TouchableOpacity>
                
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={handlePressVisitas}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://img.icons8.com/ios-filled/100/visit.png' }}
                />
                <Text style={styles.text}>Visitas</Text>
            </TouchableOpacity>
        </View >
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
    iconButton: {
        top: '0.5%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 10
    }
});

export default FooterHero;
