import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert, Modal, TouchableOpacity } from 'react-native';
import HeaderProfile from '../../src/components/HeaderProfile.js';
import Footer from '../../src/components/Footer.js';
import { Calendar as RNCalendar } from 'react-native-calendars';
import VisitDescription from '../../src/components/VisitDescription.js';
import PagarVisita from './PagarVisita'; // Suponiendo que tienes un componente PagarVisita.js
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface RouteProps {
  navigation: NavigationProp<any, any>;
}

const ConfirmarVisita: React.FC<RouteProps> = ({ navigation }) => {
  const [visita, setVisita] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const jsonData = {
      "profesionalName":"Lpz",
      "typeService":"Pintura",
      "direction":"Carrera 8 #47b-46",
      "valueVisit": 23000,
      "availability":{
          "2024-05-22":["8","11"],
          "2024-05-23":["8","10"],
          "2024-05-24":["8","14"],
          "2024-05-25":["8","12"],
          "2024-05-26":["9","13"],
          "2024-05-27":["10","13"]
      }
    };

    const availability = Object.entries(jsonData.availability).map(([fecha, horas]) => ({ fecha, horas: horas.join(',') }));
    const visitaData = { ...jsonData, availability };
    setVisita(visitaData);
  }, []);

  const handleDayPress = (day) => {
    if (visita && visita.availability.map(item => item.fecha).includes(day.dateString)) {
      const availabilityForSelectedDate = visita.availability.find(item => item.fecha === day.dateString);
  
      if (availabilityForSelectedDate) {
        const horasDisponibles = availabilityForSelectedDate.horas.split(',');
        setAvailableHours(horasDisponibles);
        setSelectedDate(day.dateString);
        console.log('Fecha seleccionada:', day.dateString); // Registro de la fecha seleccionada
      }
    } else {
      setSelectedDate(null);
      setAvailableHours([]);
      console.log('Fecha no disponible:', day.dateString); // Registro de la fecha no disponible
      Alert.alert('Fecha no disponible', 'Lo siento, esta fecha no está disponible para una visita.');
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
    console.log('Hora seleccionada:', convertirHoraFormato12(hour)); // Registro de la hora seleccionada
    setModalVisible(true); // Abrir la ventana emergente
  };

  const closeModal = () => {
    setModalVisible(false); // Cerrar la ventana emergente
  };

  if (!visita) {
    return null;
  }

  const availableDates = visita.availability.map(item => item.fecha);

  const customDates = availableDates.reduce((dates, date) => {
    dates[date] = { selected: true, selectedColor: 'green' };
    return dates;
  }, {});

  return (
    <View style={styles.container}>
      <View style={styles.headerInfo}>
          <HeaderProfile 
            companyName='Home Hero'
            userImage={'https://todoparalaindustria.com/cdn/shop/articles/herramientas-carpintero-madera.png?v=1683036808&width=1400'}
            username="SebasLPZ"
            description={"Servicios"}
          />
        </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <VisitDescription visita={visita} />
        <RNCalendar
          onDayPress={handleDayPress}
          markedDates={{ ...customDates, [selectedDate]: { selected: true, selectedColor: 'blue' } }}
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
            <VisitDescription visita={visita} />
            <Text>Fecha seleccionada: {selectedDate}</Text>
            <Text>Hora seleccionada: {selectedHour}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate('PagarVisita')}>
              <Text>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text>Denegar</Text>
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
  headerInfo:{
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
  hourItem: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 5,
    fontSize: 16,
  },
  fechaMostrar: {
    fontSize: 20,
    textAlign: 'center', // Para centrar el texto
    marginVertical: 10, // Espacio vertical alrededor del texto
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


export default ConfirmarVisita;
