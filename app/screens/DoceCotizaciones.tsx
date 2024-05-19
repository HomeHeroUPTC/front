import {StyleSheet, View, ScrollView} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import PlantCotizacionDoce from "../../src/components/PlantCotizacionDoce";
import React from "react";

interface RouteProps {
    navigation: NavigationProp<any, any>;
}

export default function DoceCotizaciones({navigation}: RouteProps) {
    const plantDescriptions = [
        {   nombreProfesional: "GermanRivera",
            imageUrl: "https://www.pngkey.com/png/detail/202-2022334_usuario-png.png",
            fechaHora: '06-05-2023   15:00',
            valorCotizacion: '$30.000',
            tituloServicioProfesional: 'Electricista',
        },
        {   nombreProfesional: 'Carlos Sanchez',
            imageUrl: "https://as1.ftcdn.net/v2/jpg/04/56/58/14/1000_F_456581427_5XpGqNqCwLAGwaFFvxVGvnW2teOfJ0ZL.jpg",
            fechaHora: '06-05-2023   15:00',
            valorCotizacion: '$25.000',
            tituloServicioProfesional: 'Electricista',
        }
    ];

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20
    }
});
