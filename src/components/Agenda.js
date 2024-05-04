import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import BlueButton from "./Button";

const Agenda = () => {
    return (
        <View>
            <View style={styles.info}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://todoparalaindustria.com/cdn/shop/articles/herramientas-carpintero-madera.png?v=1683036808&width=1400' }}
                />
                <Text style={styles.text}>
                    El trabajo de carpintería implica realizar una visita al sitio del proyecto para evaluar el espacio, discutir requisitos del cliente, tomar medidas precisas y ofrecer recomendaciones. Esta visita es crucial para comprender las necesidades del cliente, garantizar la viabilidad del proyecto y proporcionar un presupuesto preciso.</Text>
            </View >
            <View style={styles.conteiner}>
            <View style={styles.buttomCancelar}>
                <BlueButton

                    text={"Modificar"}
                    style={styles.buttomCancelar}
                />
            </View>
            <View style={styles.buttomCancelar}>
                <BlueButton

                    text={"Modificar"}
                />
            </View>
            </View>
            <BlueButton
                text={"Modificar"}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 150,
        height: 150,
        margin: 10,
    },
    text: {
        width: 250,
        height: 150,
        alignItems: 'center',
    },
    buttomCancelar: {
        margin: 2,
        width: 200,
        height: 60,
    },
    conteiner:{
        flexDirection:'row',
        justifyContent:'center',
    }
})

export default Agenda;