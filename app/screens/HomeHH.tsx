import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, BackHandler, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import { NavigationProp, CommonActions } from '@react-navigation/native';
import { useAuth } from '../../src/components/utils/correo';
import ServiciosHH from '../../src/components/ServiciosHome';
import RoundButton from '../../src/components/ButonAdd';
import Footer from '../../src/components/FooterHero';
import HeaderProfile from '../../src/components/HeaderProfile';

interface RouteProps {
    navigation: NavigationProp<any, any>;
}

export default function HomeHH({ navigation }: RouteProps) {
    const { userEmail } = useAuth();
    const [serviciosData, setServiciosData] = useState([]);
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
        const fetchServiciosData = async () => {
            try {
                const response = await fetch(`https://msservice-zaewler4iq-uc.a.run.app/Services/GetHeroServices?service_id=${heroData.id}`);
                const data = await response.json();
                setServiciosData(data);

                // Guardar datos en AsyncStorage
                await AsyncStorage.setItem('serviciosData', JSON.stringify(data));
            } catch (error) {
                console.error('Error al obtener los servicios del héroe:', error);
            }
        };
        fetchServiciosData();
        console.log(serviciosData);
    }, [userEmail]);
    

    const agregarServicio = () => {
        // Función para agregar un nuevo servicio (código omitido para brevedad)
    };
    
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
            {serviciosData.length > 0 ? (
                // Si hay datos de servicios, mostrarlos
                serviciosData.map((servicio, index) => (
                    <Text>hola</Text>
                ))
            ) : (
                // Si no hay datos de servicios, mostrar el mensaje correspondiente
                <Text style={styles.noServicesText}>Datos no disponibles</Text>
            )}
            </ScrollView>
            <RoundButton onPress={() => navigation.navigate('RegistrarServicios')} />
            <Footer />
        </View>
    );
}

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
});
