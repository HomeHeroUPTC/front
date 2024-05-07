import React from "react";
import { StyleSheet, Text, View, Image} from 'react-native';

const HeaderProfile = ({ userImage, username, description, companyName }) => {
    return(
        <View style={styles.container}>
            <View style={styles.companyLogoContainer}>
                <Image
                    style={styles.calendarLogo}
                    source={require('../../assets/images/Calendar2.png')}
                />
                <View style={styles.containerCompany}>
                    <Image
                        style={styles.companyLogo}
                        source={require('../../assets/images/LogoApp.png')}
                    />
                    <Text style={styles.companyName}>{companyName}</Text>
                </View>
            </View>
            <View style={styles.userInfo}>
                <Image
                    style={styles.logo}
                    source={{uri:userImage}}
                />
                <Text style={styles.username}>{username}</Text>
                <View style={styles.description}>
                    <Text style={styles.title}>{description}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        top: 25,
        bottom: 5,
    },
    containerCompany: {
        flexDirection: 'row',
        justifyContent: 'center',// Centra horizontalmente
        alignSelf: 'center',
        left: '20%'
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
        top: 8,
        borderBottomColor: '#e3e4e7', // Color de la línea
        borderBottomWidth: 1, // Grosor de la línea
        paddingBottom: 0, // Espacio debajo de la línea
        flexDirection: 'row',
        alignContent: 'center',
    },
    containerImage: {
        alignContent: 'center',
    },
    companyLogo: {
        top: 0,
        width: 35,
        height: 35,
    },
    companyName: {
        top: 0,
        fontSize: 20,
        color: '#171717'
    },
    logo: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: 10,
        marginLeft: 5,
    },
    userInfo: {
        height: '40%',
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
        color: '#171717'
    },
    username: {
        fontSize: 18,
        color: '#171717'
    },
    title: {
        color: '#0B7BFF',
        right: 5,
        flexDirection: 'row',
        fontSize: 18,
        textAlign: 'right', // Alinea el texto a la derecha
        fontWeight: 'bold', // Establecer negrilla
    },
    description: {
        right: 3,
        flex: 1,
        justifyContent: 'flex-end', // Alinea el contenido a la derecha
    }
});

export default HeaderProfile;
