import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderProfile from '../../src/components/HeaderProfile.js';
import PlantDescripcionBtn from "../../src/components/PlantDescripcionBtn";
import { NavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import Footer from '../../src/components/FooterHero';
import DetallesVisita from './DetallesVisitas';

interface RouteParams {
    id_client: number; 
}

interface RouteProps {
    navigation: NavigationProp<any, any>;
    route: {
        params: RouteParams;
    };
}

interface HeroData {
    name: string;
    image_url: string;
}

function convertirJsonAObjetos(data) {
    return data.map(item => ({
        image_url: item.image_url,
        visitId: item.visit_id,
        heroId: item.hero_id,
        heroServiceId: item.hero_service_id,
        clientId: item.client_id,
        visitDate: item.visit_date,
        initTime: item.init_time,
        address: item.address,
        visitStatus: item.visit_status
    }));
}

export default function Visitas({ navigation, route }: RouteProps) {
    const [plantDescriptions, setPlantDescriptions] = useState([]);
    const [heroData, setHeroData] = useState<HeroData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVisit, setSelectedVisit] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [reloadData, setReloadData] = useState(false); // Nuevo estado para recargar los datos

    useEffect(() => {
        const fetchHeroDataFromStorage = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('heroData');
                if (jsonValue !== null) {
                    const data = JSON.parse(jsonValue);
                    setHeroData(data);
                }
            } catch (error) {
                console.error('Error al obtener los datos del héroe desde AsyncStorage:', error);
            }
        };
        fetchHeroDataFromStorage();

        // Función para cargar los datos de las visitas
        const loadVisitsData = async () => {
            setLoading(true); // Indica que estamos cargando los datos
            try {
                const response = await fetch('https://mssolicitud-zaewler4iq-ue.a.run.app/Solicitudes/GetHeroVisits?hero_id=3');
                const data = await response.json();
                const objetosConvertidos = convertirJsonAObjetos(data);
                setPlantDescriptions(objetosConvertidos);
                setLoading(false); // Indica que hemos terminado de cargar los datos
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false); // Indica que hemos terminado de cargar los datos (incluso si hubo un error)
            }
        };

        loadVisitsData(); // Cargar los datos de las visitas al montar el componente
    }, [reloadData]); // Dependencia de reloadData

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0B7BFF" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>
                    <View style={styles.header}>
                        <HeaderProfile 
                            companyName='Home Hero'
                            userImage={heroData ? heroData.image_url : ''}
                            username={heroData ? heroData.name : ''}
                            description={"Tus visitas"}
                        />
                    </View>
                    <View style={styles.body}>
                        <View style={styles.info}>
                            <Text style={styles.errorText}>
                                Ha ocurrido un error al cargar las visitas. Por favor, inténtalo de nuevo más tarde.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>
                <View style={styles.header}>
                    <HeaderProfile 
                        companyName='Home Hero'
                        userImage={heroData ? heroData.image_url : ''}
                        username={heroData ? heroData.name : ''}
                        description={"Tus visitas"}
                    />
                </View>
                <View style={styles.body}>
                    {plantDescriptions.map((plant, index) => (
                        <PlantDescripcionBtn
                            image_url={"https://firebasestorage.googleapis.com/v0/b/homehero-417119.appspot.com/o/pintura.jpg?alt=media&token=537682ed-1de1-4765-86a3-045d81143a8c"}
                            key={index}
                            clientName={plant.clientName}
                            clientId={plant.clientId}
                            initTime={plant.initTime}
                            visitDate={plant.visitDate}
                            visitId={plant.visitId}
                            heroId={plant.heroId}
                            nombreServiceProfesional={plant.nombreServiceProfesional}
                            address={plant.address}
                            estado={plant.visitStatus}
                            onPress={() => {
                                setSelectedVisit(plant);
                                setModalVisible(true);
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <DetallesVisita visit={selectedVisit} closeModal={() => setModalVisible(false)} />
                </View>
            </Modal>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
    },
    scrollContainer: {
      backgroundColor: '#fff',
    },
    header:{
      height: 50,
      backgroundColor: '#fff',
    },
    body:{
      paddingBottom: 80,
      justifyContent: 'center'
    },
    info:{
      marginTop:20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 18,
      color: '#ff0000',
      textAlign: 'center',
      marginHorizontal: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
