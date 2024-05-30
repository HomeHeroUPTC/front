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
export default function Agenda() {
    const [visitaCliente, setVisitaCliente] = useState(null);
    const [error, setError] = useState(null);
    const { userEmail, setUserEmail } = useAuth();
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
                <AgendaComponente
                    nombre="Juan"
                    descripcion="Descripción del evento"
                    fecha="30 de mayo"
                    hora="10:00"
                />
                <AgendaComponente
                    nombre="Juan"
                    descripcion="Descripción del evento"
                    fecha="30 de mayo"
                    hora="10:00"
                />
                <AgendaComponente
                    nombre="Juan"
                    descripcion="Descripción del evento"
                    fecha="30 de mayo"
                    hora="10:00"
                />
                <AgendaComponente
                    nombre="Juan"
                    descripcion="Descripción del evento"
                    fecha="30 de mayo"
                    hora="10:00"
                />
                <AgendaComponente
                    nombre="Juan"
                    descripcion="Descripción del evento"
                    fecha="30 de mayo"
                    hora="10:00"
                />
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
});
