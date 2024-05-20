import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import PlantCotizacionDoce from "../../src/components/PlantCotizacionDoce";
import React, { useEffect, useState } from "react";

interface RouteProps {
    navigation: NavigationProp<any, any>;
}

interface Cotizacion {
    nombreProfesional: string;
    imageUrl: string;
    fechaHora: string;
    valorCotizacion: string;
    tituloServicioProfesional: string;
}

export default function DoceCotizaciones({ navigation }: RouteProps) {
    const [plantDescriptions, setPlantDescriptions] = useState<Cotizacion[]>([]);

    // Método para obtener las cotizaciones desde el endpoint del microservicio
    const fetchCotizaciones = async () => {
        try {
            // Realizar la llamada al endpoint del microservicio
            const response = await fetch('url_del_enpoint');
            const data = await response.json();

            // Actualizar el estado con los datos obtenidos
            setPlantDescriptions(data);
        } catch (error) {
            console.error('Error al obtener las cotizaciones:', error);
        }
    };

    // Llamar al método fetchCotizaciones al cargar el componente
    useEffect(() => {
        fetchCotizaciones();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {plantDescriptions.length > 0 ? (
                <View>
                    {plantDescriptions.map((plant, index) => (
                        <PlantCotizacionDoce
                            nombreProfesional={plant.nombreProfesional}
                            tituloServicioProfesional={plant.tituloServicioProfesional}
                            valorCotizacion={plant.valorCotizacion}
                            key={index}
                            fechaHora={plant.fechaHora}
                            imageUrl={plant.imageUrl}
                        />
                    ))}
                </View>
            ) : (
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>En este momento no hay cotizaciones disponibles</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageText: {
        fontSize: 18,
        textAlign: 'center',
    }
});
