import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Modal } from 'react-native';
import HeaderProfile from '../../src/components/HeaderProfile.js';
import Footer from '../../src/components/FooterClient.js';
import { Calendar as RNCalendar } from 'react-native-calendars';
import VisitDescription from '../../src/components/VisitDescription.js';
import { useNavigation } from '@react-navigation/native';

export default function ConfirmarVisita({ route }) {
    const { visita_V} = route.params;
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableHours, setAvailableHours] = useState([]);
    const [selectedHour, setSelectedHour] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleDayPress = (day) => {
        const availabilityForSelectedDate = visita_V.availability.find(item => item.day === day.dateString);
        if (availabilityForSelectedDate) {
            const horasDisponibles = availabilityForSelectedDate.hours;
            setAvailableHours(horasDisponibles);
            setSelectedDate(day.dateString);
        } else {
            setSelectedDate(null);
            setAvailableHours([]);
        }
    };

    const convertirHoraFormato12 = (hora) => {
        if (hora > 12) {
            return `${hora - 12} PM`;
        } else if (hora === 12) {
            return `${hora} PM`;
        } else {
            return `${hora} AM`;
        }
    };

    const handleHourSelect = (hour) => {
        setSelectedHour(convertirHoraFormato12(hour));
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const customDates = visita_V.availability.reduce((dates, item) => {
        const { day, hours } = item;
        const markedHours = hours.reduce((acc, hour) => {
            acc[`${day}T${hour}`] = { selected: true, selectedColor: '#48D220' };
            return acc;
        }, {});
        dates[day] = { selected: true, selectedColor: '#0B7BFF', ...markedHours };
        return dates;
    }, {});

    return (
        <View style={styles.container}>
            <View style={styles.headerInfo}>
                <HeaderProfile
                    companyName='Home Hero'
                    userImage={visita_V.cliente.image_url}
                    username={visita_V.cliente.name}
                    description={"Confirmar visita"}
                />
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <VisitDescription visita={visita_V} />
                <Text style={styles.paragraph2}>
                            {"\nDirección de la visita\n" + visita_V.cliente.address}
                </Text>
                <RNCalendar
                    onDayPress={handleDayPress}
                    markedDates={{ ...customDates, [selectedDate]: { selected: true, selectedColor: '#09C400' } }}
                />
                {selectedDate && (
                    <Text style={styles.fechaMostrar}>Fecha seleccionada: {selectedDate}</Text>
                )}
                {selectedDate && availableHours.length > 0 && (
                    <View style={styles.selectedHourContainer}>
                        <Text style={styles.selectedHourTitle}>Selecciona una hora:</Text>
                        <ScrollView horizontal>
                            {availableHours.map(hour => (
                                <Text key={hour} onPress={() => handleHourSelect(hour)} style={styles.hourItem}>{convertirHoraFormato12(hour)}</Text>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </ScrollView>

            <Footer />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <VisitDescription visita={visita_V} />
                        <Text style={styles.paragraph}>
                            {"\nDirección de la visita\n" + visita_V.cliente.address}
                        </Text>
                        <Text>Fecha seleccionada: {selectedDate}</Text>
                        <Text>Hora seleccionada: {selectedHour}</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                            <Text>Denegar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => {
                            closeModal();
                            navigation.navigate('PagarVisita', { visita_V, selectedDate, selectedHour });
                            console.log("Fecha y hora del Confirmar " + selectedDate + ",   " + selectedHour)
                        }}>
                            <Text>Pagar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        paddingBottom: '20%'
    },
    headerInfo: {
        height: '6%',
        backgroundColor: '#fff',
    },
    selectedHourContainer: {
        marginTop: 20,
    },
    selectedHourTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    paragraph:{
        color: '#171717',
        fontSize: 20,
    },
    paragraph2:{
        color: '#171717',
        fontSize: 20,
        bottom:'6%',
        marginLeft: '3%'
    },
    hourItem: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 5,
        fontSize: 16,
    },
    fechaMostrar: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
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
    modalButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
    },
});
