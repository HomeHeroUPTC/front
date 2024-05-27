import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import PlantDescripcionBtn from "../../src/components/PlantDescripcionBtn";

interface RouteProps {
    navigation: NavigationProp<any, any>;
}

export default function Visitas({ navigation }: RouteProps) {
    const [plantDescriptions, setPlantDescriptions] = useState([]);

    useEffect(() => {
        // Aquí realizas la solicitud HTTP al endpoint
        fetch('https://mssolicitud-zaewler4iq-ue.a.run.app/Solicitudes/GetHeroVisits?hero_id=2')
            .then(response => response.json())
            .then(data => {
                // Una vez que se recibe la respuesta, actualiza el estado con los datos recibidos
                setPlantDescriptions(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Este efecto se ejecuta solo una vez al montar el componente

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
                {plantDescriptions.map((plant, index) => (
                    <PlantDescripcionBtn
                        key={index}
                        clientName={plant.clientName}
                        clientId={plant.clientId}
                        initTime={plant.initTime}
                        visitDate={plant.visitDate}
                        visitId={plant.visitId}
                        heroId={plant.heroId}
                        nombreServiceProfesional={plant.nombreServiceProfesional}
                        address={plant.address}
                        estado={plant.visit_status}
                        onPress={() => navigation.navigate('DetallesVisita', {
                            address: plant.address,
                            visitId: plant.visitId,
                            heroId: plant.heroId,
                            clientId: plant.clientId,
                            clientName: plant.clientName,
                            visitDate: plant.visitDate,
                            initTime: plant.initTime,
                            nombreServiceProfesional: plant.nombreServiceProfesional,
                            estado: plant.estado
                        })}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    }
});
