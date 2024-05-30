import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { StyleSheet, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useIsFocused } from '@react-navigation/native'; // Importa useIsFocused
=======
import { StyleSheet, ScrollView, Text, View, BackHandler, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import { NavigationProp, CommonActions } from '@react-navigation/native';
>>>>>>> b4a6494176aa02f173cfd56a2f092d3db8c05b1a
import { useAuth } from '../../src/components/utils/correo';
import ServiceCard from '../../src/components/ServiceCard';
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
<<<<<<< HEAD
    const isFocused = useIsFocused(); // Utiliza useIsFocused para detectar si la pantalla está enfocada
=======
    
>>>>>>> b4a6494176aa02f173cfd56a2f092d3db8c05b1a

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://msusuarios-zaewler4iq-uc.a.run.app/User/GetHeroByMail?hero_mail=${userEmail}`);
                const data = await response.json();
                setHeroData(data);
                await AsyncStorage.setItem('heroData', JSON.stringify(data));

                if (data && data.id) {
                    const serviceResponse = await fetch(`https://msservice-zaewler4iq-uc.a.run.app/Services/GetMyServices?hero_id=${data.id}`);
                    const servicesData = await serviceResponse.json();
                    setServiciosData(servicesData);
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
<<<<<<< HEAD

        if (isFocused) { // Solo carga los datos si la pantalla está enfocada
            fetchData();
        }
    }, [userEmail, isFocused]); // Añade isFocused a las dependencias del efecto

=======
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
    
>>>>>>> b4a6494176aa02f173cfd56a2f092d3db8c05b1a
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
<<<<<<< HEAD
                {serviciosData.map((service, index) => (
                    <ServiceCard key={index} service={service} />
                ))}
=======
            {serviciosData.length > 0 ? (
                // Si hay datos de servicios, mostrarlos
                serviciosData.map((servicio, index) => (
                    <Text>hola</Text>
                ))
            ) : (
                // Si no hay datos de servicios, mostrar el mensaje correspondiente
                <Text style={styles.noServicesText}>Datos no disponibles</Text>
            )}
>>>>>>> b4a6494176aa02f173cfd56a2f092d3db8c05b1a
            </ScrollView>
            <RoundButton onPress={() => navigation.navigate('RegistrarServicios')} />
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: "#fff"
    },
    scrollViewContent: {
        paddingBottom: 180,
    },
    header: {
        height: 50,
        backgroundColor: '#fff',
    },
    noServicesText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'gray',
    },
});
