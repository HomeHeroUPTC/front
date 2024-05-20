import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FormularioCliente = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handleRegistrarCliente = () => {
        if (!nombre || !correo || !direccion || !selectedCity) {
            Alert.alert('Campos Incompletos', 'Por favor complete todos los campos.');
            return;
        }
        // Aquí iría la lógica para registrar el cliente
        console.log('Registrando cliente:', { nombre, correo, direccion, ciudad: selectedCity });
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.text}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese su nombre"
                        value={nombre}
                        onChangeText={setNombre}
                        accessibilityLabel="NombreInput"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese su correo"
                        value={correo}
                        onChangeText={setCorreo}
                        accessibilityLabel="CorreoInput"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese su dirección"
                        value={direccion}
                        onChangeText={setDireccion}
                        accessibilityLabel="DireccionInput"
                    />
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedCity}
                            style={styles.picinputker}
                            onValueChange={(itemValue) => setSelectedCity(itemValue)}
                            accessibilityLabel="CiudadPicker"
                        >
                            <Picker.Item label="Seleccione su ciudad" value="" />
                            <Picker.Item label="Tunja" value="tunja" />
                            <Picker.Item label="Bogotá" value="bogota" />
                            <Picker.Item label="Medellín" value="medellin" />
                            <Picker.Item label="Bucaramanga" value="bucaramanga" />
                        </Picker>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleRegistrarCliente}>
                        <Text style={styles.buttonText}>Registrar cliente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={() => console.log('Cancelar')}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
        alignItems: 'center',
    },
    contentContainer: {
        borderWidth: 0,
        borderColor: '#666',
        borderRadius: 7,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#0B7BFF',
        padding: 13,
        borderRadius: 2,
        alignItems: 'center',
        marginTop: 5,
        opacity: 10,
    },
    button2: {
        backgroundColor: '#BD0000',
        padding: 13,
        borderRadius: 2,
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 100,
        marginBottom: 16,
        fontSize: 16,
        fontWeight: 'semibold',
    },
    pickerContainer: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 56,
        justifyContent: 'center',
    },
    picker: {
        height: 40,
        color: 'black',
    }
});

export default FormularioCliente;
