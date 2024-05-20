import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const FormularioProfesional = () => {
    const [nombre, setNombre] = useState('');
    const [id, setId] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedProfesion, setSelectedProfesion] = useState('');

    const handleRegistrarProfesional = () => {
        if (!nombre || !correo || !direccion || !selectedCity || !selectedProfesion || !id) {
            Alert.alert('Campos Incompletos', 'Por favor complete todos los campos.');
            return;
        }


        // Crear el objeto con los datos del profesional
        const nuevoProfesional = {
            nombre,
            id,
            correo,
            direccion,
            ciudad: selectedCity,
            profesion: selectedProfesion
        };

        // Guardar el objeto en el estado o enviarlo al endpoint del microservicio para registrarlo
        // Aquí iría la lógica para registrar el profesional
        console.log('Registrando profesional:', nuevoProfesional);
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
                        placeholder="Ingrese su id"
                        value={id}
                        onChangeText={setId}
                        accessibilityLabel="IdInput"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese su dirección"
                        value={direccion}
                        onChangeText={setDireccion}
                        accessibilityLabel="DireccionInput"
                    />
                    <View style={[styles.pickerContainer, {marginBottom: 16}]}>
                        <Picker
                            selectedValue={selectedProfesion}
                            onValueChange={(itemValue) => setSelectedProfesion(itemValue)}
                            accessibilityLabel="ProfesionPicker">
                            <Picker.Item label="Seleccione su profesion" value=""/>
                            <Picker.Item label="Electicista" value="electicista"/>
                            <Picker.Item label="Pintor" value="pintor"/>
                            <Picker.Item label="Plomero" value="plomero"/>
                        </Picker>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedCity}
                            onValueChange={(itemValue) => setSelectedCity(itemValue)}
                            accessibilityLabel="CiudadPicker">
                            <Picker.Item label="Seleccione su ciudad" value=""/>
                            <Picker.Item label="Tunja" value="tunja"/>
                            <Picker.Item label="Bogotá" value="bogota"/>
                            <Picker.Item label="Medellín" value="medellin"/>
                            <Picker.Item label="Bucaramanga" value="bucaramanga"/>
                        </Picker>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleRegistrarProfesional}>
                        <Text style={styles.buttonText}>Registrar profesional</Text>
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

export default FormularioProfesional;
