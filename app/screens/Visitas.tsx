import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import PlantDescripcionBtn from "../../src/components/PlantDescripcionBtn";
import React from "react";

interface RouteProps {
    navigation: NavigationProp<any, any>;
}

export default function Visitas({navigation}: RouteProps) {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
                <PlantDescripcionBtn
                    title={'Soldador'}
                    imageUrl="https://www.solyman.com/wp-content/uploads/2018/12/080917-F-4707M-119.jpg"
                    description={'sdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdssdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsd'}
                />
                <PlantDescripcionBtn
                    title={'Carpintero'}
                    imageUrl="https://cursosvirtualesgratis.com/wp-content/uploads/2020/09/donde-aprender-carpinteria-cursos-de-carpinteria.jpg"
                    description={'sdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdssdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsd'}
                />
                <PlantDescripcionBtn
                    title={'Cerrajero'}
                    imageUrl="https://cerrajerosenbilbao.com/wp-content/uploads/2021/05/cerrajeros-profesionales-bilbao-24-horas-aperturas.jpg"
                    description={'sdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdssdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsd'}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
        scrollContainer: {
            flexGrow: 1,
            padding: 20
        }
    }
);
