import {StyleSheet, View, ScrollView} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import PlantDescripcionBtn from "../../src/components/PlantDescripcionBtn";
import React from "react";

interface RouteProps {
    navigation: NavigationProp<any, any>;
}

export default function Visitas({navigation}: RouteProps) {
    const plantDescriptions = [
        {
            nombreCliente: 'Catalina Torres',
            imageUrl: "https://cerrajerosenbilbao.com/wp-content/uploads/2021/05/cerrajeros-profesionales-bilbao-24-horas-aperturas.jpg",
            valor: '50000',
            direccion: 'direccion',
            fechaHora: '22-05-2024  13:00',
            tituloServicioProfesional: 'Cerrajero'
        }
    ];

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
                {plantDescriptions.map((plant, index) => (
                    <PlantDescripcionBtn
                        key={index}
                        nombreCliente={plant.nombreCliente}
                        imageUrl={plant.imageUrl}
                        fechaHora={plant.fechaHora}
                        valor={plant.valor}
                        tituloServicioProfesional={plant.tituloServicioProfesional}
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
