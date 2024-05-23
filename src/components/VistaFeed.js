import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';

const VisitaFeed = ({ visita }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image
          style={styles.image}
          source={{ uri: visita.image_url }}
        />
        <View style={styles.textContainer}>
          <View style={styles.texts}>
            <Text style={styles.title}>
              {visita.titulo_servicioProfesional}
            </Text>
            <View style={styles.row}>
              <Text style={styles.paragraph}>
                Cliente: {visita.nombre_cliente}
              </Text>
            </View>
            <Text style={styles.paragraph}>
              Dirección: {visita.dirección}
            </Text>
            <Text style={styles.paragraph}>
              Fecha y Hora: {visita.fecha_y_hora}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
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
    borderRadius: 10,
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
    height: 100,
    borderRadius: 10,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 14,
    color: '#171717',
    marginBottom: 4,
  },
});

export default VisitaFeed;
