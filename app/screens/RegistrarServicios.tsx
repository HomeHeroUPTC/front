import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Button, Alert } from "react-native";
import HeaderProfile from "../../src/components/HeaderProfile";
import Footer from "../../src/components/FooterHero";
import CustomTextInput from "../../src/components/TextInput";
import CustomPicker from "../../src/components/ComboBox";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RouteProps {
    navigation: NavigationProp<any, any>;
}

const RegistrarServicios = ({ navigation }: RouteProps) => {
    const [heroData, setHeroData] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [descripcion, setDescription] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [servicios, setServicios] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeroDataFromStorage = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('heroData');
                if (jsonValue !== null) {
                    const heroData = JSON.parse(jsonValue);
                    setHeroData(heroData);
                }
            } catch (error) {
                console.error('Error al obtener los datos del héroe desde AsyncStorage:', error);
            }
        };

        fetchHeroDataFromStorage();

        const filtro = "";
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

    const getServiceList = (servicios) => {
        return servicios.map(servicio => `${servicio.title}`);
    };

    const options = getServiceList(servicios);

    const handlePress = () => {
        if (descripcion.length <= 50 && descripcion.length >= 1) {
            alert('Su descripcion debe de tener 50 caracteres');
        } else if (name.length === 0) {
            alert('El Nombre no puede ir vacio');
        } else if (selectedOption === '') {
            alert('Debe de seleccionar un tipo de servicio');
        } else if (price.length == 0) {
            alert('Debe de ingresar un precio de visita');
        } else if (descripcion.length === 0) {
            console.log(convertToJson());
            alert('Descripcion base de datos');
        } else {
            console.log(convertToJson());
        }
    };

    const convertToJson = () => {
        const data = {
            name: name,
            service_id: handleServiceChange(selectedOption),
            price: parseInt(price),
            description: descripcion,
            hero_id: heroData.id
        };

        console.log("Datos para creacion del servicio prestado " + data);

        fetch('https://msservice-zaewler4iq-uc.a.run.app/Services/CreateHeroService', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar los datos');
                }
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    Alert.alert('Su servicio ha sido creado exitosamente');
                    navigation.navigate('HomeHH', { refresh: true });
                }
                return response.json();
            })
            .then(data => {
                console.log('Cliente registrado:', data);
                Alert.alert('Su servicio ha sido creado exitosamente');
                navigation.navigate('HomeHH', { refresh: true });
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.alert('Error al registrarse', 'Por favor revise que sus datos sean correctos');
            });

        return JSON.stringify(data);
    };

    const handleServiceChange = (title) => {
        const service = servicios.find(servicio => servicio.title.toLowerCase() === title.toLowerCase());
        return service ? service.service_id : null;
    };

    const handleNameChange = (text) => {
        if (text.length <= 100) {
            setName(text);
        }
    };

    const handlePriceChange = (text) => {
        const regex = /^[0-9]*$/;
        if (regex.test(text) && text.length <= 6) {
            setPrice((text));
        }
    };

    const handleDescriptionChange = (text) => {
        if (text.length <= 120) {
            setDescription(text);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerContainer}>
                    <HeaderProfile
                        username={heroData ? heroData.name : 'Sebas'}
                        companyName={'HomeHero'}
                        description={'papapa'}
                        userImage={heroData ? heroData.image_url : 'https://todoparalaindustria.com/cdn/shop/articles/herramientas-carpintero-madera.png?v=1683036808&width=1400'}
                    />
                </View>
                <Text style={styles.title}>Agrega Tu servicio</Text>
                <CustomTextInput
                    label="Nombre del servicio"
                    placeholder="Ingresa el nombre del servicio"
                    onChangeText={handleNameChange}
                    value={name}
                />
                <CustomPicker
                    label="Opciones"
                    options={options}
                    selectedValue={selectedOption}
                    onValueChange={setSelectedOption}
                />
                <CustomTextInput
                    label="Precio de visita"
                    placeholder="Ingresa el precio de tu visita (Valores numericos)"
                    onChangeText={handlePriceChange}
                    value={price}
                />
                <CustomTextInput
                    label="Descripción"
                    placeholder="Ingresa los detalles del servicio"
                    onChangeText={handleDescriptionChange}
                    value={descripcion}
                    style={{ maxHeight: 120 }}
                />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button
                                    title="Guardar"
                                    onPress={handlePress}
                                />
                            </View>
                            <View style={styles.footerContainer}>
                                <Footer />
                            </View>
                        </View>
                    );
                };
                
                const styles = StyleSheet.create({
                    container: {
                        flex: 1,
                        backgroundColor: '#fff',
                    },
                    scrollContainer: {
                        paddingHorizontal: 20,
                        paddingBottom: 20,
                    },
                    headerContainer: {
                        marginBottom: 20,
                    },
                    title: {
                        fontSize: 24,
                        marginBottom: 20,
                    },
                    buttonContainer: {
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        marginBottom: 80,
                    },
                    footerContainer: {
                        height: 60,
                    },
                });
                
                export default RegistrarServicios;
                