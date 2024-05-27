import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';

const VisitDescription = ({ visita }) => {

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.paragraph}>
                    {"Solicitarás una visita de " + visita.hero_name + " para realizar un servicio de " + visita.type_service
                    + " por un precio de " + visita.price + "COP"}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        marginBottom: 30,
        flexDirection: 'row',
        padding: 1,
        backgroundColor: '#fff',
        marginLeft: '3%',
        marginRight: '3%'
    },
    paragraph:{
        color: '#171717',
        fontSize: 20,
    }
    
});

export default VisitDescription;