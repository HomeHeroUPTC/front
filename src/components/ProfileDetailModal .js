import React from 'react';
import { Modal, View, Text, StyleSheet, Button, Image } from 'react-native';

const ProfileDetailModal = ({ visible, onClose, profesional }) => {
  if (!profesional) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Image style={styles.image} source={{ uri: profesional.imagenUrl }} />
          <Text style={styles.userName}>{profesional.userName}</Text>
          <Text style={styles.title}>{profesional.title}</Text>
          <Text style={styles.paragraph}>{"Ubicado en " + profesional.neighborhood}</Text>
          <Text style={styles.paragraph}>{profesional.description}</Text>
          <Text style={styles.paragraph}>{"Calificación: " + profesional.calification}</Text>
          <Text style={styles.paragraph}>{"Cantidad de Servicios: " + profesional.cantidadServicios}</Text>
          <Text style={styles.paragraph}>{"Horario Disponible: " + profesional.availableSchedule}</Text>
          <Text style={styles.paragraph}>{"Visita: " + profesional.valueVisit + " COP"}</Text>
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
