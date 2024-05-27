import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../src/components/utils/correo';
import { useNavigation } from '@react-navigation/native';

const FormularioCliente = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const {userEmail, setUserEmail} = useAuth();
    const [image_url, setImage_url] = useState('');
    
const navigation = useNavigation();

    
   
    const handleRegistrarCliente = () => {
        setemail(userEmail)
        setImage_url('https://firebasestorage.googleapis.com/v0/b/homehero-417119.appspot.com/o/clinte.png?alt=media&token=2816ec9a-b728-4362-ab16-6689d196f734');
        if (!name === ""  || !address || !selectedCity) {
            Alert.alert('Campos Incompletos', 'Por favor complete todos los campos.');
            return;
        }
            const nuevoCliente = {
                email: userEmail,
                name,
                address,
                city: selectedCity,
                image_url: 'https://firebasestorage.googleapis.com/v0/b/homehero-417119.appspot.com/o/clinte.png?alt=media&token=2816ec9a-b728-4362-ab16-6689d196f734'
            };
            console.log(nuevoCliente);
            // Realizar la solicitud POST
            fetch('https://msusuarios-zaewler4iq-uc.a.run.app/User/CreateClient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoCliente),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar los datos');
                }
                
                // Verificar si la respuesta está vacía
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    // La respuesta no es JSON
                    navigation.navigate('HomeCliente');
                }
            
                // Analizar la respuesta como JSON
                return response.json();
            })
            .then(data => {
                console.log('Cliente registrado:', data);
                
                // Aquí podrías mostrar alguna confirmación al usuario si lo deseas
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.alert('Error al registrarse', 'Por favor revise que sus datos sean correctos');
            });
            
    
        console.log('Registrando cliente:', nuevoCliente);
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.text}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese su name"
                        value={name}
                        onChangeText={setname}
                        accessibilityLabel="nameInput"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={userEmail}
                        value={email}
                        onChangeText={setemail}
                        editable={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese su dirección"
                        value={address}
                        onChangeText={setaddress}
                        accessibilityLabel="addressInput"
                    />
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedCity}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedCity(itemValue)}
                            accessibilityLabel="cityPicker"
                        >
                            <Picker.Item label="Seleccione su city" value="" />
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
