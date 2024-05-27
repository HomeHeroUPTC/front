import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetallesVisita = ({ visit, closeModal }) => {
    const { visitId, heroId, clientId, clientName, address, visitDate, initTime, nombreServiceProfesional, visitStatus } = visit;

    const [modalVisible, setModalVisible] = useState(false);
    const [estadoVisita, setEstadoVisita] = useState(visitStatus);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    let state = visitStatus

    const getEstadoText = (state) => {
        switch (state) {
            case 1: return 'Pendiente';
            case 2: return 'Realizada';
            case 3: return 'Cancelada';
            default: return 'Desconocido';
        }
    };

    const getButtonProps = (state) => {
        switch (state) {
            case 1:
                return { text: 'Visita realizada', color: styles.buttonPendiente, action: () => setModalVisible(true) };
            case 2:
                return { text: 'Realizar Cotización', color: styles.buttonRealizada, action: () => handleRealizada() };
            case 3:
                return { text: '', color: {}, action: null };
            default:
                return { text: '', color: {}, action: null };
        }
    };

    const handleRealizada = () => {
        setModalVisible(true);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('CrearCotizaciones');
        }, 50);
    };

    const confirmarVisitaRealizada = async () => {
        setModalVisible(false);
        state = 2
        setEstadoVisita(2);
    };

    useEffect(() => {
        console.log('El estado de la visita ha cambiado:', estadoVisita);
    }, [estadoVisita]);

    useEffect(() => {
        if (loading) {
            closeModal();
        }
    }, [loading]);

    function formato24Horas(hora) {
        if (hora < 1 || hora > 24) {
            return "Hora inválida";
        } else if (hora < 12) {
            return hora + " AM";
        } else if (hora === 12) {
            return "12 M";
        } else {
            return hora - 12 + " PM";
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Detalles de la Visita</Text>
                <Text style={styles.text}>Cliente: {clientName}</Text>
                <Text style={styles.text}>Fecha: {visitDate}</Text>
                <Text style={styles.text}>Hora: {formato24Horas(initTime)}</Text>
                <Text style={styles.text}>Dirección: {address}</Text>
                <Text style={styles.text}>Servicio de {nombreServiceProfesional}</Text>
                <Text style={styles.text}>Estado: {getEstadoText(estadoVisita)}</Text>
                {estadoVisita !== 3 && (
                    <TouchableOpacity style={[styles.button, getButtonProps(estadoVisita).color]} onPress={getButtonProps(estadoVisita).action}>
                        <Text style={styles.buttonText}>{getButtonProps(estadoVisita).text}</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={closeModal}>
                    <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>¿Está seguro de que ya realizó esta visita?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.buttonCancel]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.buttonAccept]} onPress={confirmarVisitaRealizada}>
                                <Text style={styles.buttonText}>Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsContainer: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        borderWidth: 0,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonPendiente: {
        backgroundColor: '#4CAF50',
    },
    buttonRealizada: {
        backgroundColor: '#0B7BFF',
    },
    buttonClose: {
        backgroundColor: '#ccc',
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
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    buttonCancel: {
        backgroundColor: '#ccc',
    },
    buttonAccept: {
        backgroundColor: '#0B7BFF',
    },
});

export default DetallesVisita;
