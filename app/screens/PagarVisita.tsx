import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import RoundButton from '../../src/components/ButonAdd';
import Footer from '../../src/components/Footer';
import HeaderProfile from '../../src/components/HeaderProfile';


interface RouteProps {
    navigation: NavigationProp<any, any>;
}


export default function PagarVisita({ navigation }: RouteProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderProfile
                    username={'Sebas'}
                    companyName={'HomeHero'}
                    description={'papapa'}
                    userImage={'https://todoparalaindustria.com/cdn/shop/articles/herramientas-carpintero-madera.png?v=1683036808&width=1400'}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text>
                    {"Pagar"}
                </Text>
            </ScrollView>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',  // Asegura que el contenido se alinee al final
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
