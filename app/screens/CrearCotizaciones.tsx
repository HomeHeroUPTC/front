import React,  { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import HeaderProfile from "../../src/components/HeaderProfile";
import Footer from "../../src/components/Footer";
import CustomTextInput from "../../src/components/TextInput";
import CustomPicker from "../../src/components/ComboBox";
import DatePickerComponent from "../../src/components/calendario";
import DateInput from "../../src/components/calendario";
import TimePicker from "../../src/components/horaslista";
import HourList from "../../src/components/horaslista";
import { useRole } from "../../src/components/utils/verificarcorreo";

const CrearCotizaciones = () => {
    const {role,setRoleFromEmail} = useRole();
    const [nameService, setNameService] = useState('');
    const [nameCL, setNameCL] = useState('');
    const [hora, setHora] = useState('');
    const [name, setName] = useState('');
    const [TipoServico, setTiposervicio] = useState('');
    const [direccion, setdireccion] = useState('');
    const [barrio, setBarrio] = useState('');
    const [id, setId] = useState(5);
    const [price, setPrice] = useState('');
    const [descripcion, setDescription] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());



    const formatDate=(text) =>{
        const fechaString = '5/22/2024';
        const partesFecha = fechaString.split('/'); // Dividir la cadena por '/'
        const mes = parseInt(partesFecha[0]) - 1; // Restar 1 porque los meses en JavaScript van de 0 a 11
        const dia = parseInt(partesFecha[1]);
        const año = parseInt(partesFecha[2]);
        const fecha = new Date(año, mes, dia); // Crear objeto Date

        setSelectedDate(fecha);
    };

    useEffect(() => {
        const personData = [{
            id: 1,
            cliente: 'LPZ',
            HH: 'Mortadelo',
            Nombre_Servicio: 'Trabajos de la Unad',
            Tipo_servicio: 'Educacion',
            direccion: 'Uptc',
            barrio: 'JJ camacho',
            fecha: '5/22/2024',
            hora: '06',
            precio: '123123',
            Descripcion: 'arg asrg ahfoanñ'
        }];

    
        const person = personData[0];
        setNameService(person.Nombre_Servicio);
        setName(person.HH);
        setNameCL(person.cliente);
        setTiposervicio(person.Tipo_servicio);
        setdireccion(person.direccion);
        setBarrio(person.barrio);
        setId(person.id);
        setPrice(person.precio);
        setDescription(person.Descripcion);
        formatDate(person.fecha);
        setHora(person.hora)
}, []);


    const options = ['00', '01', '02', '03','04','05','06','07','08','09',
                    '10', '11', '12', '13','14','15','16','17','18','19',
    '20', '21', '22', '23','24'
    ];
   

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    const handlePress = () => {
        if (descripcion.length <= 50 && descripcion.length >= 1) {
            alert('Su descripcion debe de tener 50 caracteres')
        } else if (name.length === 0) {
            alert('El Nombre no puede ir vacio')
        } else if (selectedOption === '') {
            alert('Debe de seleccionar un tipo de servicio')
        } else if (price.length == 0) {
            alert('Debe de ingresar un precio de visita')
        } else if (descripcion.length === 0) {
            console.log(convertToJson())
            alert('Descripcion base de datos')
        } else {
            console.log(convertToJson())
        }

    };

    const convertToJson = () => {
        const data = {
            name: name,
            price: parseInt(price),
            descripcion: descripcion,
            hero_id: id
        };

        return JSON.stringify(data);
    };

   
    const handleSetHora=(text)=>{
        setSelectedOption(text);
    }

    const handlePriceChange = (text) => {
        const regex = /^[0-9]*$/;
        if (regex.test(text) && text.length <= 6) {
            setPrice((text));
        }
    };

    const handleDescriptionChange = (text) => {
        if (text.length <= 120) {
            setDescription(text);
        }
    };

    const saveData =()=>{
        
    }

    if(role === 'homehero'){
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
                        placeholder= {name}
                        onChangeText={null}
                        value={name}
                    />
                    <CustomTextInput
                        label="Nombre del servicio"
                        placeholder="Ingresa el nombre del servicio"
                        onChangeText={null}
                        value={name}
                    />
                    <CustomTextInput
                        label="Tipo de Servicio"
                        placeholder="Ingresa el nombre del servicio"
                        onChangeText={null}
                        value={name}
                    />
                    <CustomTextInput
                        label="Direccion "
                        placeholder="Ingresa el nombre del servicio"
                        onChangeText={null}
                        value={name}
                    />
    
                    <CustomTextInput
                        label="Barrio"
                        placeholder="Ingresa el nombre del servicio"
                        onChangeText={null}
                        value={name}
                    />
                    <View style={styles.dateTimeContainer}>
                        <View style={styles.datePickerContainer}>
                            <DateInput
                                label="Selecciona una fecha"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </View>
                        <View style={styles.timePickerContainer}>
                            <HourList
                                label="Hora"
                                options={options}
                                selectedValue={selectedOption}
                                onValueChange={handleSetHora}
                            />
                        </View>
                    </View>
    
                    <CustomTextInput
                        label="Precio de visita"
                        placeholder="Ingresa el precio de tu visita (Valores numericos)"
                        onChangeText={handlePriceChange}
                        value={price}
                    />
                    <CustomTextInput
                        label="Descripción"
                        placeholder="Ingresa los detalles del servicio"
                        onChangeText={handleDescriptionChange}
                        value={descripcion} // Aplicar estilo específico para la descripción
                    />
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Guardar"
                        onPress={handlePress}
                    />
                </View>
                <View style={styles.footerContainer}>
                    <Footer />
                </View>
            </View>
        );
    }

    if(role === 'cliente'){
        return(
            <View>
                <Text>Usted no tiene autorizacion para realizar esta accion </Text>
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20, // Ajustar el padding inferior para evitar que el botón se pegue al final
    },
    headerContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    dateTimeContainer: {
        flexDirection: 'row', // Coloca los elementos en una fila
        marginBottom: 20, // Ajusta el margen inferior entre los elementos
    },
    datePickerContainer: {
        flex: 1, // Ocupa el espacio disponible en la fila
        marginRight: 10, // Añade un margen derecho para separar los elementos
    },
    timePickerContainer: {
        flex: 1, // Ocupa el espacio disponible en la fila
        marginLeft: 10, // Añade un margen izquierdo para separar los elementos
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Añadir padding horizontal para que el botón no esté pegado a los bordes
        marginBottom: 80, // Ajustar el margen inferior

    },
    footerContainer: {
        height: 60,
    },
});

export default CrearCotizaciones;
