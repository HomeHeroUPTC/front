import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import WeekDays from './WeekDays'; 

const ProfileHH = ({ profesional }) => {
    console.log(profesional);
    return (
        <View style={styles.container}>
            <View style={styles.infoUser}>
                <Image
                    style={styles.image}
                    source={{ uri: profesional.imagenUrl}}
                />
                <Text style={styles.userName}>{profesional.userName}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{profesional.title}</Text>
                <Text style={styles.paragraph}>{"Ubicado en " + profesional.neighborhood}</Text>
                <Text style={styles.paragraph}>
                    {profesional.description}
                </Text>
                <View style={styles.schedule}>
                    <WeekDays diasDisponibles={profesional.availableDays} />
                    <Text style={styles.hours}>{profesional.availableSchedule}</Text>
                </View>
                <View style={styles.value}>
                  <Text style={styles.valueVisit}>{profesional.valueVisit + "COP"}</Text>
                </View>
            </View>
        </View>
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
    hours: {
      fontSize: 16,
      color: '#171717',
      marginBottom: 3,
      marginTop: 3
    },
    schedule: {
        marginTop: 5,
        marginBottom: 5,
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5,
        marginBottom: 5,
    },
    day: {
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#171717',
    },
    dayAvailable: {
        backgroundColor: 'lightgreen',
    },
    dayNotAvailable: {
        backgroundColor: 'lightgray',
    },
    valueVisit:{
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 4,
      color: '#171717',
    },
    valueVisitText:{
      marginTop: '3%',
      color: '#01a651',
      fontSize: 16
    },
    value:{
      flexDirection: 'row'
    }
});

export default ProfileHH;
