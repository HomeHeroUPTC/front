import React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Footer from '../../src/components/Footer';
import HeaderProfile from '../../src/components/HeaderProfile';
import { useNavigation, useRoute } from '@react-navigation/native';
import VisitDescription from '../../src/components/VisitDescription.js';

export default function PagarVisita() {
    const navigation = useNavigation();
    const route = useRoute();
    const { visita_V, selectedDate, selectedHour } = route.params;

    const handlePagar = () => {
        console.log("Hora que se obtiene " + String(selectedHour));
        const requestBody = {
            hero_id: visita_V.id,
            hero_service_id: visita_V.service_id,
            client_id: visita_V.cliente.id,
            visit_date: selectedDate,
            init_time: convertToMilitaryTime(selectedHour),
            address: visita_V.cliente.address
        };
        console.log("Hora en militar " + convertToMilitaryTime(selectedHour));
        console.log("Request Body: ", requestBody);

        fetch('https://mssolicitud-zaewler4iq-ue.a.run.app/Solicitudes/CreateVisit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            console.log("Raw Response: ", response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(responseText => {
            if (!responseText) {
                // Tratar como una respuesta OK
                console.log('Respuesta vacía recibida, tratando como OK.');
                navigation.navigate('HomeCliente', { correo: "" } as { correo: string });
            } else {
                const data = JSON.parse(responseText);
                console.log('Respuesta del servidor:', data);
                navigation.navigate('HomeCliente', { correo: "" } as { correo: string });
            }
        })
        .catch(error => {
            if (error instanceof SyntaxError && error.message === 'JSON Parse error: Unexpected end of input') {
                // Tratar como una respuesta OK
                console.log('Respuesta vacía recibida, tratando como OK.');
                navigation.navigate('HomeCliente', { correo: "" } as { correo: string });
            } else {
                console.error('Error al enviar la solicitud:', error);
            }
        });
    };

    const convertToMilitaryTime = (timeString) => {
        if (!/(AM|PM)/i.test(timeString)) {
            throw new Error('Formato de hora incorrecto. Se esperaba HH:MM AM/PM');
        }

        const formattedTimeString = timeString.toUpperCase();
        const timeParts = formattedTimeString.split(' ');
        const period = timeParts[1];
        const hours = parseInt(timeParts[0], 10);

        if (period === 'AM') {
            return hours;
        } else {
            return hours === 12 ? 12 : hours + 12;
        }
    };

    const handleCancelar = () => {
        navigation.navigate('HomeCliente', { correo: "" } as { correo: string });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderProfile
                    username={visita_V.cliente.name}
                    companyName={'HomeHero'}
                    description={'Pago'}
                    userImage={visita_V.cliente.image_url}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <VisitDescription visita={visita_V} />
                <Text style={styles.paragraph2}>
                    {"\nDirección de la visita\n" + visita_V.cliente.address}
                </Text>
                {selectedDate && (
                    <Text style={styles.infoText}>Fecha seleccionada: {selectedDate}</Text>
                )}
                {selectedHour && (
                    <Text style={styles.infoText}>Hora seleccionada: {selectedHour}</Text>
                )}
                <TouchableOpacity style={[styles.modalButton, styles.greenButton]} onPress={handlePagar}>
                    <Text style={styles.buttonText}>Pagar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.reedButton]} onPress={handleCancelar}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </ScrollView>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    header: {
        height: '7%',
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    modalButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        left: '11%'
    },
    greenButton: {
        backgroundColor: '#4CAF50',
    },
    reedButton: {
        backgroundColor: '#FF0000',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    infoText: {
        fontSize: 20,
        marginBottom: 10,
        left: '4%'
    },
    paragraph2: {
        color: '#171717',
        fontSize: 20,
        bottom: '6%',
        marginLeft: '3%'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
