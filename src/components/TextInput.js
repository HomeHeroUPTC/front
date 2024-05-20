import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ label, placeholder, onChangeText, value }) => {
  // Verificar si la etiqueta es "Descripción"
  const isDescription = label === 'Descripción';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, isDescription && styles.descriptionInput]} // Aplicar estilo adicional si es "Descripción"
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  descriptionInput: {
    paddingVertical: 50, // Ajusta este valor según el tamaño deseado para la descripción
  },
});

export default CustomTextInput;
