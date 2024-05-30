import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../src/components/utils/correo';
import DateTimePicker from '@react-native-community/datetimepicker';

const FormularioProfesional = () => {
    const [nombre, setNombre] = useState('');
    const [id, setId] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [barrio, setBarrio] = useState('');
    const [city, setCity] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedProfesion, setSelectedProfesion] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const navigation = useNavigation();
    const { userEmail, setUserEmail } = useAuth();
    const [servicios, setServicios] = useState([]);

        
    const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    
    function ordenarDias(texto) {
        // Convertimos la entrada a una cadena de texto
        texto = texto.toString();
        
        // Convertimos la cadena de texto a un array de días separando por comas y eliminando espacios
        const diasArray = texto.split(',').map(dia => dia.trim());
        
        // Ordenamos los días de la semana utilizando la posición en el array 'days'
        const diasOrdenados = diasArray.sort((a, b) => {
            return days.indexOf(a) - days.indexOf(b);
        });
        
        // Devolvemos los días ordenados como una cadena de texto separada por comas
        return diasOrdenados.join(',');
    }
    

    const toggleDaySelection = (day) => {
        setSelectedDays((prevSelectedDays) => 
            prevSelectedDays.includes(day) 
                ? prevSelectedDays.filter((d) => d !== day)
                : [...prevSelectedDays, day]
        );
    };

    const convertirHoraAMPMa24 = (horaAMPM) => {
        const [hora, periodo] = horaAMPM.split(' ');
        console.log("El periodo es: " + periodo + ".")
        if (periodo === 'a. m.') {
            return parseInt(hora, 10);
        } else {
            return parseInt(hora, 10) + 12;
        }
    };

    const handleRegistrarProfesional = () => {
        const startTimeHours = startTime.getHours();
        const endTimeHours = endTime.getHours();

        if (!nombre || !direccion || !barrio || !selectedCity || !selectedProfesion || !id || selectedDays.length === 0) {
            Alert.alert('Campos Incompletos', 'Por favor complete todos los campos.');
            return;
        }

        if (endTimeHours <= startTimeHours) {
            Alert.alert('Horas inválidas', 'La hora final debe ser mayor que la hora inicial.');
            return;
        }

        const nuevoProfesional = {
<<<<<<< HEAD
            name: nombre.toString(),
            email: userEmail.toString(),
            identification: id.toString(),
            job: selectedProfesion.toString(),
            city: selectedCity.toString(),
            address: direccion.toString(),
            neighborhood: barrio.toString(),
            work_days: ordenarDias(selectedDays),
            init_hour: convertirHoraAMPMa24(startTime.toLocaleTimeString([], { hour: '2-digit', hour12: true })),
            end_hour: convertirHoraAMPMa24(endTime.toLocaleTimeString([], { hour: '2-digit', hour12: true })),
=======
            name: nombre,
            email: userEmail,
            identification: id,
            job: selectedProfesion,
            city: selectedCity,
            address: direccion,
            neighborhood: barrio,
            start_time: convertirHoraAMPMa24(startTime.toLocaleTimeString([], { hour: '2-digit', hour12: true })),
            end_time: convertirHoraAMPMa24(endTime.toLocaleTimeString([], { hour: '2-digit', hour12: true })),
>>>>>>> b4a6494176aa02f173cfd56a2f092d3db8c05b1a
            image_url: "https://firebasestorage.googleapis.com/v0/b/homehero-417119.appspot.com/o/lego-logo-512.png?alt=media&token=b78d7c8d-0029-46f4-bcd4-bf0c328c1de7",
            work_days: selectedDays.join(''),
            init_hour: startTimeHours,
            end_hour: endTimeHours,
        };

        console.log(nuevoProfesional)

        fetch('https://msusuarios-zaewler4iq-uc.a.run.app/User/CreateHero', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoProfesional),
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    throw new Error('Error al enviar los datos');
                }

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    navigation.replace('HomeHH');
                    Alert.alert('HomeHero creado correctamente')
                }

                return response.json();
            })
            .then(data => {
                console.log('Cliente registrado:', data);
            })
            .catch(error => {
            //    console.error('Error:', error);
            //Alert.alert('Error al registrarse', 'Por favor revise que sus datos sean correctos');
            });

        console.log('Registrando profesional:', nuevoProfesional);
    };

    useEffect(() => {
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
            })
            .catch(error => {
                console.error('Error al obtener los servicios:', error);
            });
    }, []);

    const dayOrder = {
        'L': 0,
        'M': 1,
        'X': 2,
        'J': 3,
        'V': 4,
        'S': 5,
        'D': 6
    };
    
    const dayNamesFull = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const sortedSelectedDays = selectedDays.slice().sort((a, b) => dayOrder[a] - dayOrder[b]);

    const sortedSelectedDaysFull = sortedSelectedDays.map(day => dayNamesFull[days.indexOf(day)]);



    // Función para mostrar los días seleccionados en el orden ordenado
    const getSelectedDaysString = () => {
        return sortedSelectedDays.map(day => dayNames[days.indexOf(day)]).join(', ');
    };
    

    const getServiceList = () => {
        return servicios.map(servicio => servicio.title);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Regístrate Héroe</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su nombre"
                    value={nombre}
                    onChangeText={setNombre}
                    accessibilityLabel="NombreInput"
                />
                <TextInput
                    style={styles.input}
                    placeholder={userEmail}
                    value={correo}
                    onChangeText={setCorreo}
                    accessibilityLabel="CorreoInput"
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su id"
                    value={id}
                    onChangeText={(text) => {
                        // Verificar si el texto ingresado contiene solo números
                        if (/^\d+$/.test(text) || text === '') {
                            setId(text);
                        }
                    }}
                    keyboardType="numeric" // Esto muestra un teclado numérico en dispositivos móviles
                    accessibilityLabel="IdInput"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su dirección"
                    value={direccion}
                    onChangeText={setDireccion}
                    accessibilityLabel="DireccionInput"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su barrio"
                    value={barrio}
                    onChangeText={setBarrio}
                    accessibilityLabel="BarrioInput"
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedProfesion}
                        onValueChange={(itemValue) => setSelectedProfesion(itemValue)}
                        accessibilityLabel="ProfesionPicker"
                        style={styles.picker}
                    >
                        <Picker.Item label="Seleccione una profesión" value="" />
                        {getServiceList().map((profession, index) => (
                            <Picker.Item key={index} label={profession} value={profession.toLowerCase()} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedCity}
                        onValueChange={(itemValue) => setSelectedCity(itemValue)}
                        accessibilityLabel="CiudadPicker"
                        style={styles.picker}
                    >
                        <Picker.Item label="Seleccione su ciudad" value
                        ="" />
                        <Picker.Item label="Tunja" value="tunja" />
                        <Picker.Item label="Bogotá" value="bogota" />
                        <Picker.Item label="Medellín" value="medellin" />
                        <Picker.Item label="Bucaramanga" value="bucaramanga" />
                        </Picker>
                        </View>
<Text style={styles.daysTitle}>Selecciona los días que trabajas</Text>
<View style={styles.daysContainer}>
    {days.map((day, index) => (
        <TouchableOpacity
            key={index}
            style={[styles.dayButton, selectedDays.includes(day) && styles.dayButtonSelected]}
            onPress={() => toggleDaySelection(day)}
        >
            <Text style={styles.dayButtonText}>{day}</Text>
        </TouchableOpacity>
    ))}
</View>
<Text style={styles.selectedDaysText}>Días seleccionados: {sortedSelectedDaysFull.join(', ')}</Text>
<View style={styles.hoursContainer}>
<Text style={styles.hoursTitle}>Hora de inicio:</Text>
<TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.timePickerButton}>
<Text style={styles.timePickerButtonText}>Hora inicio: {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
</TouchableOpacity>
{showStartPicker && (
<DateTimePicker
    value={startTime}
    mode="time"
    display="default"
    onChange={(event, selectedTime) => {
        setShowStartPicker(Platform.OS === 'ios');
        if (selectedTime !== undefined) {
            const newTime = new Date(startTime);
            newTime.setHours(selectedTime.getHours(), 0); // Set minutes to 0
            setStartTime(newTime);
        }
    }}
/>
)}
<Text style={styles.hoursTitle}>Hora de finalización:</Text>
<TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.timePickerButton}>
<Text style={styles.timePickerButtonText}>Hora final: {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
</TouchableOpacity>
{showEndPicker && (
<DateTimePicker
    value={endTime}
    mode="time"
    display="default"
    onChange={(event, selectedTime) => {
        setShowEndPicker(Platform.OS === 'ios');
        if (selectedTime !== undefined) {
            const newTime = new Date(endTime);
            newTime.setHours(selectedTime.getHours(), 0); // Set minutes to 0
            setEndTime(newTime);
        }
    }}
/>
)}
</View>
<TouchableOpacity style={styles.button} onPress={handleRegistrarProfesional}>
<Text style={styles.buttonText}>Registrar profesional</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.buttonCancel} onPress={() => console.log('Cancelar')}>
<Text style={styles.buttonText}>Cancelar</Text>
</TouchableOpacity>
</View>
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
flexGrow: 1,
padding: 20,
justifyContent: 'center',
backgroundColor: '#f7f7f7',
},
contentContainer: {
backgroundColor: '#fff',
borderRadius: 10,
padding: 20,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.2,
shadowRadius: 5,
elevation: 5,
},
title: {
fontSize: 24,
fontWeight: 'bold',
color: '#333',
marginBottom: 20,
textAlign: 'center',
},
input: {
height: 48,
borderColor: '#ccc',
borderWidth: 1,
borderRadius: 8,
paddingHorizontal: 10,
marginBottom: 16,
fontSize: 16,
},
pickerContainer: {
borderColor: '#ccc',
borderWidth: 1,
borderRadius: 8,
marginBottom: 16,
overflow: 'hidden',
},
picker: {
height: 48,
color: '#333',
},
daysTitle: {
fontSize: 16,
fontWeight: 'bold',
marginBottom: 10,
textAlign: 'center',
},
daysContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
marginBottom: 20,
},
dayButton: {
backgroundColor: '#ccc',
borderRadius: 8,
paddingVertical: 10,
paddingHorizontal: 12,
flex: 1,
alignItems: 'center',
marginHorizontal: 2,
},
dayButtonSelected: {
backgroundColor: '#0B7BFF',
},
dayButtonText: {
color: '#fff',
fontSize: 16,
fontWeight: 'bold',
},
hoursContainer: {
marginBottom: 20,
},
hoursTitle: {
fontSize: 16,
fontWeight: 'bold',
marginBottom: 10,
textAlign: 'center',
},
timePickerButton: {
backgroundColor: '#16DD3D',
padding: 15,
borderRadius: 8,
alignItems: 'center',
marginBottom: 10,
},
timePickerButtonText: {
color: '#fff',
fontSize: 16,
fontWeight: 'bold',
},
button: {
backgroundColor: '#0B7BFF',
paddingVertical: 15,
borderRadius: 8,
alignItems: 'center',
marginTop: 10,
},
buttonCancel: {
backgroundColor: '#BD0000',
paddingVertical: 15,
borderRadius: 8,
alignItems: 'center',
marginTop: 10,
},
buttonText: {
color: '#fff',
fontSize: 16,
fontWeight: 'bold',
},
});

export default FormularioProfesional;
