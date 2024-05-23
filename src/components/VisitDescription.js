import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';

const VisitDescription = (visita) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.paragraph}>{"Solicitaras una visita de " + "visita.profesionalName" +
                " para realizar un servicio de " + "visita.typeService"}
                </Text>
                <Text style={styles.paragraph}>{"\nDirección de la visita\n" + "visita.direction"}
                </Text>
            </View>
            <View>
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