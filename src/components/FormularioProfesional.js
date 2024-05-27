import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../src/components/utils/correo';



const FormularioProfesional = () => {
    const [nombre, setNombre] = useState('');
    const [id, setId] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [city, setcity] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedProfesion, setSelectedProfesion] = useState('');
    const navigation = useNavigation();
    const { userEmail, setUserEmail } = useAuth();
    const [servicios, setServicios] = useState([]);


    const handleRegistrarProfesional = () => {


        if (!nombre || !direccion || !selectedCity || !selectedProfesion || !id) {
            Alert.alert('Campos Incompletos', 'Por favor complete todos los campos.');
            return;
        }


        // Crear el objeto con los datos del profesional
        const nuevoProfesional = {
            name: nombre,
            email: userEmail,
            identification: id,
            job: selectedProfesion,
            city: selectedCity,
            image_url: "https://firebasestorage.googleapis.com/v0/b/homehero-417119.appspot.com/o/lego-logo-512.png?alt=media&token=b78d7c8d-0029-46f4-bcd4-bf0c328c1de7",
            address: direccion,
        };
        fetch('https://msusuarios-zaewler4iq-uc.a.run.app/User/CreateHero', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoProfesional),
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response)
                    throw new Error('Error al enviar los datos');
                }

                // Verificar si la respuesta está vacía
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    // La respuesta no es JSON
                    navigation.navigate('HomeHH');
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

        // Guardar el objeto en el estado o enviarlo al endpoint del microservicio para registrarlo
        // Aquí iría la lógica para registrar el profesional
        console.log('Registrando profesional:', nuevoProfesional);
    };

    useEffect(() => {
        const filtro = ""; // Aquí puedes definir tu filtro, por ejemplo: const filtro = "tipo=servicio";
        const urlServicios = `https://msservice-zaewler4iq-uc.a.run.app/Services/GetServices?filter=${filtro}`;
        fetch(urlServicios, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received from API:', data);
                if (Array.isArray(data)) {
                    setServicios(data);
                } else {
                    throw new Error('Expected an array');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener los servicios:', error);
                setError(error);
                setLoading(false);
            });

    }, []);

    const getServiceList = () => {
        return servicios.map(servicios => `${servicios.title}`);
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
                        placeholder={userEmail}
                        value={correo}
                        onChangeText={setCorreo}
                        accessibilityLabel="CorreoInput"
                        editable={false}
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
                    <View style={[styles.pickerContainer, { marginBottom: 16 }]}>
                        <Picker
                            selectedValue={selectedProfesion}
                            onValueChange={(itemValue) => setSelectedProfesion(itemValue)}
                            accessibilityLabel="ProfesionPicker">
                             <Picker.Item label="Seleccione una profesión" value="" />
                            {getServiceList().map((profession, index) => (
                                 <Picker.Item key={index} label={profession} value={profession.toLowerCase()} />
                            ))}
                        </Picker>

                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedCity}
                            onValueChange={(itemValue) => setSelectedCity(itemValue)}
                            accessibilityLabel="CiudadPicker">
                            <Picker.Item label="Seleccione su ciudad" value="" />
                            <Picker.Item label="Tunja" value="tunja" />
                            <Picker.Item label="Bogotá" value="bogota" />
                            <Picker.Item label="Medellín" value="medellin" />
                            <Picker.Item label="Bucaramanga" value="bucaramanga" />
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
