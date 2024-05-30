import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Button, TouchableHighlight } from "react-native";
import HeaderProfile from "../../src/components/HeaderProfile";
import Footer from "../../src/components/FooterHero";
import CustomTextInput from "../../src/components/TextInput";
import DateInput from "../../src/components/calendario";
import HourList from "../../src/components/horaslista";
import { useRole } from "../../src/components/utils/verificarcorreo";
import { useRoute } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';

const CrearCotizaciones = () => {
    const { role } = useRole();
    const route = useRoute();
    const { visit_id, hero_id, service_id, client_id, address, client_name, service_name } = route.params;

    const [tipoServicio, setTipoServicio] = useState(service_name);
    const [nameCL, setNameCL] = useState('');
    const [direccion, setDireccion] = useState(address);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [price, setPrice] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [heroServices, setHeroServices] = useState([]);

    useEffect(() => {
        setTipoServicio(service_id.toString());
        setNameCL(client_id.toString());

        // Fetch para obtener los servicios relacionados con el hero_id
        fetch(`https://msservice-zaewler4iq-uc.a.run.app/Services/GetHeroServices?service_id=${hero_id}`)
            .then(response => response.json())
            .then(data => {
                setHeroServices(data); // Guardar los servicios obtenidos en el estado como un objeto
            })
            .catch(error => console.error('Error fetching hero services:', error));
    }, []);

    useEffect(() => {
        if (heroServices.length > 0) {
            // Asegurarse de que las fechas tengan ceros delante de los números de un solo dígito en el día
            const heroServicesWithPaddedDates = heroServices.map(heroService => {
                const availabilityWithPaddedDates = heroService.availability.map(item => {
                    if (item && item.day) {
                        const paddedDay = item.day.split('-').map(part => part.padStart(2, '0')).join('-');
                        return { ...item, day: paddedDay };
                    }
                    return item;
                });
                return { ...heroService, availability: availabilityWithPaddedDates };
            });
            setHeroServices(heroServicesWithPaddedDates);
        }
    }, [heroServices]);

    const handleDateChange = (date) => {
        setSelectedDate(date.dateString);
    };

    const handlePress = () => {
        if (descripcion.length <= 50 && descripcion.length >= 1) {
            alert('Su descripcion debe de tener 50 caracteres')
        } else if (nameCL.length === 0) {
            alert('El Nombre del cliente no puede ir vacío')
        } else if (tipoServicio === '') {
            alert('Debe seleccionar un tipo de servicio')
        } else if (price.length === 0) {
            alert('Debe ingresar un precio de visita')
        } else {
            console.log(convertToJson())
        }
    };

    const convertToJson = () => {
        const data = {
            name: nameCL,
            tipoServicio: tipoServicio,
            price: parseInt(price),
            descripcion: descripcion,
            hero_id: hero_id
        };

        return JSON.stringify(data);
    };

    const handleSetHora = (text) => {
        setSelectedOption(text);
    }

    const handlePriceChange = (text) => {
        const regex = /^[0-9]*$/;
        if (regex.test(text) && text.length <= 6) {
            setPrice(text);
        }
    };

    const handleDescriptionChange = (text) => {
        if (text.length <= 120) {
            setDescripcion(text);
        }
    };

    const options = [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
        '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
        '20', '21', '22', '23', '24'
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerContainer}>
                    <HeaderProfile
                        username={'Sebas'}
                        companyName={'HomeHero'}
                        description={'papapa'}
                        userImage={'https://todoparalaindustria.com/cdn/shop/articles/herramientas-carpintero-madera.png?v=1683036808&width=1400'}
                    />
                </View>
                <Text style={styles.title}>Crear Cotización</Text>
                <CustomTextInput
                    label="Nombre del cliente"
                    placeholder="Nombre del cliente"
                    value={client_name} // Pasa directamente el valor
                    editable={false} // Establece editable como false
                />
                <CustomTextInput
                    label="Tipo de Servicio"
                    placeholder="Tipo de Servicio"
                    value={service_name} // Pasa directamente el valor
                    editable={false} // Establece editable como false
                />
                <CustomTextInput
                    label="Dirección"
                    placeholder="Dirección"
                    value={address} // Pasa directamente el valor
                    editable={false} // Establece editable como false
                />
                <Calendar
                    onDayPress={handleDateChange}
                    markedDates={generateMarkedDates(heroServices)}
                />
                <HourList
                    label="Hora"
                    options={options}
                    selectedValue={selectedOption}
                    onValueChange={handleSetHora}
                />
                <CustomTextInput
                    label="Precio de visita"
                    placeholder="Precio del servicio"
                    onChangeText={handlePriceChange}
                    value={price}
                />
                <CustomTextInput
                    label="Descripción"
                    placeholder="Descripción"
                    onChangeText={handleDescriptionChange}
                    value={descripcion}
                />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={handlePress}
                    underlayColor="#0A5DCB" // Color de fondo cuando se presiona
                >
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.footerContainer}>
                <Footer />
            </View>
        </View>
    );

    function generateMarkedDates(heroServices) {
        const markedDates = {};
        heroServices.forEach(service => {
            service.availability.forEach(avail => {
                markedDates[avail.day] = { marked: true };
            });
        });
        return markedDates;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    headerContainer:
    {
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
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0B7BFF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerContainer: {
        height: 60,
    },
});

export default CrearCotizaciones;
