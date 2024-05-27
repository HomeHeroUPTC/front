import React from 'react';
import { Modal, View, Text, StyleSheet, Button, Image } from 'react-native';

const ProfileDetailModal = ({ visible, onClose, profesional }) => {
  if (!profesional) return null;

  const availabilityText = Array.isArray(profesional.availability)
    ? profesional.availability.map(avail => `${avail.day}: ${avail.hours.join(', ')}`).join('\n')
    : "No hay horarios disponibles";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Image style={styles.image} source={{ uri: profesional.image_url }} />
          <Text style={styles.userName}>{profesional.hero_name}</Text>
          <Text style={styles.title}>{profesional.title}</Text>
          <Text style={styles.paragraph}>{"Ubicado en " + profesional.neighborhood}</Text>
          <Text style={styles.paragraph}>{profesional.description}</Text>
          <Text style={styles.paragraph}>{"Calificación: " + profesional.rating}</Text>
          <Text style={styles.paragraph}>{"Cantidad de Servicios: " + profesional.service_count}</Text>
          <Text style={styles.paragraph}>{"Horario Disponible: " + availabilityText}</Text>
          <Text style={styles.paragraph}>{"Visita: " + profesional.price + " COP"}</Text>
          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default ProfileDetailModal;
