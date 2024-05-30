import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Modal } from 'react-native';
import HeaderProfile from '../../src/components/HeaderProfile.js';
import Footer from '../../src/components/FooterClient.js';
import { Calendar as RNCalendar } from 'react-native-calendars';
import VisitDescription from '../../src/components/VisitDescription.js';
import { useNavigation } from '@react-navigation/native';

export default function ConfirmarVisita({ route }) {
    const { visita_V } = route.params || {};
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableHours, setAvailableHours] = useState([]);
    const [selectedHour, setSelectedHour] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    if (!visita_V) {
        return <Text>Error: visita_V no está definido</Text>;
    }

    // Asegurarse de que las fechas tengan ceros delante de los números de un solo dígito en el día
    useEffect(() => {
        const availabilityWithPaddedDates = visita_V.availability.map(item => {
            if (item && item.day) {
                const paddedDay = item.day.split('-').map(part => part.padStart(2, '0')).join('-');
                return { ...item, day: paddedDay };
            }
            return item;
        });
        visita_V.availability = availabilityWithPaddedDates;
    }, [visita_V.availability]);

    const handleDayPress = (day) => {
        const availabilityForSelectedDate = visita_V.availability.find(item => item.day === day.dateString);
        if (availabilityForSelectedDate) {
            setAvailableHours(availabilityForSelectedDate.hours);
            setSelectedDate(day.dateString);
        } else {
            setAvailableHours([]);
            setSelectedDate(null);
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

    const customDates = visita_V.availability.reduce((acc, item) => {
        if (item && item.day) {
            const paddedDay = item.day.split('-').map(part => part.padStart(2, '0')).join('-');
            acc[paddedDay] = { selected: true, marked: false, selectedColor: '#0B7BFF' };
        }
        return acc;
    }, {});

    useEffect(() => {
        if (selectedDate) {
            handleDayPress({ dateString: selectedDate });
        }
    }, [selectedDate]);

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
                        <ScrollView>
                            {availableHours.map(hour => (
                                <TouchableOpacity key={hour} onPress={() => handleHourSelect(hour)} style={styles.hourItem}>
                                    <Text style={styles.hourText}>{convertirHoraFormato12(hour)}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </ScrollView>
            <Footer cliente={visita_V.cliente} />
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
                            navigation.navigate('PagarVisita', { visita_V, selectedDate, selectedHour, id: visita_V.id});
                        }}>
                            <Text>Pagar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        paddingBottom: '20%',
    },
    headerInfo: {
        height: '6%',
        backgroundColor: '#fff',
    },
    selectedHourContainer: {
        flexDirection: 'column',
        marginTop: 20,
    },
    selectedHourTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    paragraph: {
        color: '#171717',
        fontSize: 20,
    },
    paragraph2: {
        color: '#171717',
        fontSize: 20,
        bottom: '6%',
        marginLeft: '3%',
    },
    hourItem: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    hourText: {
        fontSize: 16,
    },
    fechaMostrar: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
        flexDirection: 'row'
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
        alignItems: 'center'
    },
    modalButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
    },
});
