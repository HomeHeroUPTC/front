import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

const HeaderProfile = ({ userImage, username, description, companyName }) => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [userType, setUserType] = useState('HomeHero');

    const handleSearch = async () => {
        // Implement your search logic here
        // Example: Fetch data from API based on keyword
    };

    const firstName = username.split(' ')[0];


    return(
        <View style={styles.container}>
            <View style={styles.companyLogoContainer}>
                <View style={styles.userInfo}>
                    <Image
                        style={styles.logo}
                        source={{uri:userImage}}
                    />
                    <Text style={styles.username}>{firstName}</Text>
                </View>
                <Image
                    style={styles.companyLogo}
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/homehero-417119.appspot.com/o/LogoApp.png?alt=media&token=b1b2758c-c7bb-4bcb-8683-82e8e92a82c3' }}
                />
                <Text style={styles.title}>{description}</Text>
            </View>
            {userType === 'cliente' ?(
                <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={keyword}
                    onChangeText={setKeyword}
                    placeholder="Search..."
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>
            ):null}
            {/* Render search results here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        top: '10%',
        bottom: 5,
    },
    calendarLogo: {
        width: 33,
        height: 33,
        left: 5
    },
    companyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    companyLogoContainer: {
        flexDirection: 'row', // Distribuye los hijos en fila
        justifyContent: 'space-between', // Distribuye el espacio equitativamente
        borderBottomColor: '#e3e4e7', // Color de la línea
        borderBottomWidth: 1, // Grosor de la línea
        paddingBottom: '1%', // Espacio debajo de la línea
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerImage: {
        alignContent: 'center',
    },
    companyLogo: {
        top: 0,
        width: 35,
        height: 35,
        position: 'absolute', // Posiciona absolutamente
        left: '52.5%', // Mueve la imagen al centro
        transform: [{ translateX: -25 }], // Centra la imagen exactamente (la mitad de su ancho)
    },
    logo: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: 10,
        marginLeft: 5,
    },
    userInfo: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
        color: '#171717',
    },
    username: {
        alignContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        color: '#171717',
    },
    title: {
        color: '#171717',
        alignContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        color: '#171717',
        textAlign: 'right', // Alinea el texto a la derecha
        right: '15%'
    },
    description: {
        right: 3,
        flex: 1,
        justifyContent: 'flex-end', // Alinea el contenido a la derecha
    },
    searchContainer: {
        top: '3%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginRight: '4%',
        left: '20%'
    },
    searchButton: {
        backgroundColor: '#007bff',
        paddingHorizontal: 8,
        paddingVertical: 7,
        borderRadius: 4,
        right: 7
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HeaderProfile;
