import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import HeaderProfile from "../../src/components/HeaderProfile";
import Footer from "../../src/components/Footer";
import CustomTextInput from "../../src/components/TextInput";
import CustomPicker from "../../src/components/ComboBox";

const RegistrarServicios = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState(5);
    const [price, setPrice] = useState('');
    const [descripcion, setDescription] = useState('');
    const [selectedOption, setSelectedOption] = useState('');


    const options = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];


    const handlePress = () => {
        if(descripcion.length <= 50 && descripcion.length >= 1){
            alert('Su descripcion debe de tener 50 caracteres')
        }else if(name.length === 0){
            alert('El Nombre no puede ir vacio')    
        }else if(selectedOption === ''){
            alert('Debe de seleccionar un tipo de servicio')
        }else if(price.length == 0){
            alert('Debe de ingresar un precio de visita')
        }else if(descripcion.length === 0){
            console.log(convertToJson())
            alert('Descripcion base de datos')
        }else{
            console.log(convertToJson())
        }
        
    };

    const convertToJson = () => {
        const data = {
            name: name,
            service_id: handleServiceChange(),
            price: parseInt(price),
            descripcion: descripcion,
            hero_id: id
        };
    
        return JSON.stringify(data);
    };

    const handleServiceChange = () =>{
        if(selectedOption === 'Opción 1'){
            return 1
        }else if(selectedOption === 'Opción 2'){
            return 2
        }else if(selectedOption === 'Opción 3'){
            return 3
        }else if(selectedOption === 'Opción 4'){
            return 4;
        }
    }

    const handleNameChange = (text) => {
        if (text.length <= 100) {
            setName(text);
        }
    };

    const handleIdChange = (text) => {
        setId(text);
    };

    const handlePriceChange = (text) => {
        const regex = /^[0-9]*$/;
        if (regex.test(text)&&text.length <= 6) {
            setPrice((text));
        }
    };

    const handleDescriptionChange = (text) => {
        if(text.length <= 120 ){
            setDescription(text);
        }
    };

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
                <Text style={styles.title}>Agrega Tu servicio</Text>
                <CustomTextInput
                    label="Nombre del servicio"
                    placeholder="Ingresa el nombre del servicio"
                    onChangeText={handleNameChange}
                    value={name}
                />
                <CustomPicker
                    label="Opciones"
                    options={options}
                    selectedValue={selectedOption}
                    onValueChange={setSelectedOption}
                    
                />
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

    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Añadir padding horizontal para que el botón no esté pegado a los bordes
        marginBottom: 80, // Ajustar el margen inferior para separar el botón del resto de los elementos
    
        

    },
    footerContainer: {
        height: 60,
    },
});

export default RegistrarServicios;
