import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native';
import HeaderProfile from '../../src/components/HeaderProfile.js';
import Info from '../../src/components/Info.js';
import Footer from '../../src/components/FooterClient.js';
import { useAuth } from '../../src/components/utils/correo.js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import FooterHero from "../../src/components/FooterHero.js";
import RoundButton from "../../src/components/ButonAdd.js";
import AgendaComponente from "../../src/components/Agenda.js";
import { useRole } from "../../src/components/utils/verificarcorreo.js";

export default function AgendaCleinte() {
    const [visitaCliente, setVisitaCliente] = useState(null);
    const [error, setError] = useState(null);
    const { userEmail, setUserEmail } = useAuth();
    const [heroData, setHeroData] = useState(null);
    const [heroAgenda, setHeroAgenda] = useState([]);
    const { role, setRoleFromEmail } = useRole();

    console.log(role);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await fetch(`https://msusuarios-zaewler4iq-uc.a.run.app/User/GetClientByMail?client_mail=${userEmail}`);
                const data = await response.json();
                setHeroData(data);
                // Guardar datos en AsyncStorage
                await AsyncStorage.setItem('heroData', JSON.stringify(data));
            } catch (error) {
                console.error('Error al obtener los datos del héroe:', error);
            }
        };

        const fetchHeroAgenda = async () => {
            try {
                const response = await fetch(`https://msagenda-zaewler4iq-uc.a.run.app/Agenda/GetClientAgenda?client_id=${heroData.id}`);
                const data = await response.json();
                setHeroAgenda(data);
                // Guardar datos en AsyncStorage
                await AsyncStorage.setItem('heroAgenda', JSON.stringify(data));
            } catch (error) {
                console.error('Error al obtener los datos del héroe:', error);
            }
        };

        
        
            fetchHeroData();
            fetchHeroAgenda();
        
    }, [userEmail]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {heroData && (
                    <HeaderProfile
                        username={heroData.name}
                        companyName={'HomeHero'}
                        description={"Agenda"}
                        userImage={heroData.image_url}
                    />
                )}
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {heroAgenda.length > 0 ? (
                    heroAgenda.map((item, index) => (
                        <AgendaComponente
                            key={index}
                            descripcion={item.hero_service_title}
                            hora={item.hour}
                            fecha={item.event_date}
                            nombre={item.hero_name}
                        />
                    ))
                ) : (
                    <Text style={styles.noCotizaciones}>No hay agenda disponibles</Text>
                )}
            </ScrollView>
            <FooterHero />
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
    footer: {
        height: 60,
        backgroundColor: '#ccc',
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
