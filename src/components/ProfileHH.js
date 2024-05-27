import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import WeekDays from './WeekDays';
import { useNavigation } from '@react-navigation/native';



const ProfileHH = ({ profesional , cliente}) => {

    const navigation = useNavigation();

    const fechasDisponibles = profesional.availability.map(item => item.day);

    const handlePress = () => {
        // Crear el objeto visita
        const visita_V = {
            type_service: profesional.service_type,
            service_id: profesional.service_id,
            id: profesional.id,
            hero_name: profesional.hero_name,
            price: profesional.price,
            availability: profesional.availability,
            cliente: cliente
        };

        console.log(visita_V)

        navigation.navigate('ConfirmarVisita', { visita_V });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                <View style={styles.infoUser}>
                    <Image
                        style={styles.image}
                        source={{ uri: profesional.image_url }}
                    />
                    <Text style={styles.userName}>{profesional.hero_name}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.title}>{profesional.title}</Text>
                    <Text style={styles.paragraph}>{"Ubicado en " + profesional.neighborhood}</Text>
                    <Text style={styles.paragraph}>
                        {profesional.description}
                    </Text>
                    <View style={styles.schedule}>
                        <WeekDays fechas={fechasDisponibles} />
                    </View>
                    <View style={styles.value}>
                        <Text style={styles.valueVisit}>{profesional.price + " COP"}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 30,
        flexDirection: 'row',
        padding: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    infoUser: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    userName: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#171717',
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#171717',
        marginBottom: 5,
    },
    paragraph: {
        fontSize: 14,
        color: '#171717',
        marginBottom: 4,
    },
    schedule: {
        marginTop: 5,
        marginBottom: 5,
    },
    valueVisit: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#171717',
    },
    value: {
        flexDirection: 'row'
    }
});

export default ProfileHH;
