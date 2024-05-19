import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import BlueButton from "./Button";

const Info = ({ servicio }) => {
    console.log(servicio)
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image
            style={styles.image}
            source={{ uri: servicio.imagenUrl }}
        />
        <View style={styles.textContainer}>
          <View style={styles.texts}>
            <Text style={styles.title}>
              {servicio.titulo}
            </Text>
            <Text style={styles.paragraph}>
              {servicio.descripcion}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        top: 0,
        maxWidth: '100%',
        maxHeight:'96%',
        bottom: 10,
    },
    info:{
        width: '97%',
        top: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        left: 5,
        right: 10,
        borderRadius: 2,
        backgroundColor: '#fff',
        borderWidth: 0.3,
        borderColor: '#e3e4e7'
    },
    image:{
        left: 0,
        width: '47%',
        height: '100%',
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2
    },
    textContainer:{
        left: 0,
        width: '52.9%',
        height: 160,
        verticalAlign: 'bottom',
        overflow: 'hidden',
    },
    title:{
        left: 2,
        textAlignVertical:'bottom', 
        fontSize: 18,
        top: 0,
        color: '#171717'
    },
    paragraph:{
        fontSize: 12,
        maxWidth: 183,
        left: 4,
        top: 1,
        paddingRight: 2,
        textAlign: 'justify', // Justifica el texto
        color: '#171717'
    },    
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center', // Centra verticalmente
        backgroundColor: '#fff'
    },
    texts: {
        top: 4,
        backgroundColor: '#fff',
        borderRadius: 7,
        paddingBottom: 3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 0, // Esto es para la sombra en Android
        borderWidth: 0,
        borderColor: '#ccc', // Color del borde
      },
    button:{
        textAlignVertical:'bottom', 
        left: 20,
        width: 200
    }
})

export default Info;
