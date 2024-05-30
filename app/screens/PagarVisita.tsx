import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Modal } from 'react-native';
import Footer from '../../src/components/FooterClient';
import HeaderProfile from '../../src/components/HeaderProfile';
import { useNavigation, useRoute } from '@react-navigation/native';
import VisitDescription from '../../src/components/VisitDescription.js';

export default function PagarVisita() {
    const navigation = useNavigation();
    const route = useRoute();
    const { visita_V, selectedDate, selectedHour } = route.params;
    const [modalVisible, setModalVisible] = useState(false);

    const handlePagar = () => {
        setModalVisible(true);
        // Aquí podrías realizar cualquier otra lógica relacionada con el pago si fuera necesario
    };

    const handleCancelar = () => {
        navigation.navigate('HomeCliente', { correo: '' });
    };

    const closeModal = () => {
        setModalVisible(false);
        navigation.navigate('HomeCliente', { correo: '' });
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
                    {'\nDirección de la visita\n' + visita_V.cliente.address}
                </Text>
                {selectedDate && (
                    <Text style={styles.infoText}>Fecha seleccionada: {selectedDate}</Text>
                )}
                {selectedHour && (
                    <Text style={styles.infoText}>Hora seleccionada: {selectedHour}</Text>
                )}
                <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={handlePagar}>
                    <Text style={styles.buttonText}>Pagar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.redButton]} onPress={handleCancelar}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </ScrollView>
            <Footer cliente={visita_V.cliente} />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>¡Pago realizado!</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                            <Text style={styles.modalButtonText}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
    button: {
        marginTop: 10,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    greenButton: {
        backgroundColor: '#4CAF50',
    },
    redButton: {
        backgroundColor: '#FF0000',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 20,
        marginBottom: 10,
    },
    paragraph2: {
        color: '#171717',
        fontSize: 20,
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
