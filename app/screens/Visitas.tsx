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
            title: 'Soldador',
            imageUrl: "https://www.solyman.com/wp-content/uploads/2018/12/080917-F-4707M-119.jpg",
            description: 'sdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdssdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsd',
            txtbtn1: 'Ver más',
            accionbtn1: 'boton1 presionado',
            accionbtn2: 'boton2 presionado'
        },
        {
            title: 'Carpintero',
            imageUrl: "https://cursosvirtualesgratis.com/wp-content/uploads/2020/09/donde-aprender-carpinteria-cursos-de-carpinteria.jpg",
            description: 'sdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdssdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsd',
            txtbtn1: 'Ver más',
            accionbtn1: 'boton1 presionado',
            accionbtn2: 'boton2 presionado'
        },
        {
            title: 'Cerrajero',
            imageUrl: "https://cerrajerosenbilbao.com/wp-content/uploads/2021/05/cerrajeros-profesionales-bilbao-24-horas-aperturas.jpg",
            description: 'sdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdssdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsd',
            txtbtn1: 'Ver más',
            accionbtn1: 'boton1 presionado',
            accionbtn2: 'boton2 presionado'
        },
        {
            title: 'Cerrajero',
            imageUrl: "https://cerrajerosenbilbao.com/wp-content/uploads/2021/05/cerrajeros-profesionales-bilbao-24-horas-aperturas.jpg",
            description: 'sdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdssdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsd',
            txtbtn1: 'Ver más',
            accionbtn1: 'boton1 presionado',
            accionbtn2: 'boton2 presionado'
        }
    ];

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
                {plantDescriptions.map((plant, index) => (
                    <PlantDescripcionBtn
                        key={index}
                        title={plant.title}
                        imageUrl={plant.imageUrl}
                        description={plant.description}
                        txtbtn1={plant.txtbtn1}
                        accionbtn1={plant.accionbtn1}
                        accionbtn2={plant.accionbtn2}
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
