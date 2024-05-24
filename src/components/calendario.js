import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateInput = ({ label, value, onChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.inputContainer} onPress={showDatepicker}>
        <Text style={styles.dateText}>{value.toLocaleDateString()}</Text>
        <MaterialIcons name="calendar-today" size={24} color="black" />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex: 1, // Ocupa todo el espacio disponible
    marginVertical: 10,
    paddingHorizontal: 10, // Espacio lateral para centrar en la mitad de la pantalla
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
  },
});

export default DateInput;
