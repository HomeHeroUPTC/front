import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';

const Calendar = ({ visitaData, selectedDate, onSelectDate }) => {
  const availableDates = visitaData.availability.map(item => item.fecha);

  const customDates = availableDates.reduce((dates, date) => {
    dates[date] = { selected: true, selectedColor: 'green' };
    return dates;
  }, {});

  const handleDayPress = (day) => {
    if (availableDates.includes(day.dateString)) {
      // Formatear la fecha en "YYYY-MM-DD"
      const formattedDate = day.dateString;
      console.log('Fecha seleccionada:', formattedDate); // Registro de la fecha seleccionada
      onSelectDate(formattedDate);
    } else {
      console.log('Fecha no disponible:', day.dateString); // Registro de la fecha no disponible
      Alert.alert('Fecha no disponible', 'Lo siento, esta fecha no está disponible para una visita.');
    }
  };
  

  return (
    <View style={styles.container}>
      <RNCalendar
        onDayPress={handleDayPress}
        markedDates={{ ...customDates, [selectedDate]: { selected: true, selectedColor: 'blue' } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default Calendar;
