import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import PlantDescripcion from "../../src/components/PlantDescripcion";
import React, { useEffect, useState } from "react";
import { useAuth } from '../../src/components/utils/correo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderProfile from '../../src/components/HeaderProfile';
import FooterHero from '../../src/components/FooterHero';

interface RouteProps {
    navigation: NavigationProp<any, any>;
}

interface RouteProps {
    navigation: NavigationProp<any, any>;
}


export default function Cotizaciones({navigation}: RouteProps) {
    const { userEmail } = useAuth();
    const [cotizacionesData, setcotizacionesData] = useState([]);
    const [heroData, setHeroData] = useState(null);
    
    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await fetch(`https://msusuarios-zaewler4iq-uc.a.run.app/User/GetHeroByMail?hero_mail=${userEmail}`);
                const data = await response.json();
                setHeroData(data);

                // Guardar datos en AsyncStorage
                await AsyncStorage.setItem('heroData', JSON.stringify(data));
            } catch (error) {
                console.error('Error al obtener los datos del héroe:', error);
            }
        };
        fetchHeroData();
        const fetchHeroCotizaciones = async () => {
            try {
                const response = await fetch(`https://mssolicitud-zaewler4iq-ue.a.run.app/Solicitudes/GetHeroQuotes?hero_id=${heroData.id}`);
                const data = await response.json();
                setcotizacionesData(data);

                // Guardar datos en AsyncStorage
                await AsyncStorage.setItem('cotizacionesData', JSON.stringify(data));
            } catch (error) {
                console.error('Error al obtener las cotizaciones del héroe:', error);
            }
        };
        fetchHeroCotizaciones();
    }, [userEmail]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {heroData && (
                    <HeaderProfile
                        username={heroData.name}
                        companyName={'HomeHero'}
                        description={"Tus Servicios"}
                        userImage={heroData.image_url}
                    />
                )}
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {cotizacionesData.length > 0 ? (
    cotizacionesData.map((cotizacion, index) => (
        <PlantDescripcion
            key={index}
            descripcion={cotizacion.description}
            direccion={cotizacion.address}
            fecha={cotizacion.quote_date}
            hora={cotizacion.init_time}
            precio={cotizacion.price}
        />
    ))
) : (
    // Mostramos un mensaje si no hay cotizaciones disponibles
    <Text style={styles.noCotizaciones}>No hay cotizaciones disponibles</Text>
)}

            </ScrollView>
            <FooterHero />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',  // Asegura que el contenido se alinee al final
        backgroundColor: "#fff"
    },
    scrollViewContent: {
        paddingBottom: 180,  // Ajusta el padding para evitar solapamiento con el footer y botón
    },
    footer: {
        height: 60,  // Ajusta según el tamaño real del footer
        backgroundColor: '#ccc',  // Ajusta según el estilo del footer
    },
    header: {
        height: '12%',
      backgroundColor: '#fff',
    },
    noServicesText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'gray',
    },
    noCotizaciones: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
});
