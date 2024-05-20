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
    container: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'black'
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10, // Borde redondeado para el contenedor de información
        borderWidth: 0.3,
        borderColor: '#e3e4e7',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
    },
    image: {
        width: 100,
        height: 100, // Altura y ancho iguales para que sea cuadrada
        borderRadius: 10, // Borde redondeado para la imagen
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    texts: {
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#171717',
        marginBottom: 5,
    },
    paragraph: {
        fontSize: 14,
        color: '#171717',
        marginBottom: 4,
    },
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
});

export default Info;
