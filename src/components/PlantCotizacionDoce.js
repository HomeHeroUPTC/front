import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const PlantDescripcionDoce = ({clientAddress  ,clientNeighborhood ,clientName, heroName, price, details  ,serviceType, cotizacionTime ,cotizacionDate , idCotizacion,heroService}) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.text1}>
                    <Text style={styles.title}>
                        {heroService}
                    </Text>
                    <View style={styles.containerlabel}>
                        <Text style={styles.text}>{"Id cotizacion : "}</Text>
                        <Text style={styles.text1}>{idCotizacion }
                        </Text>
                    </View>
                    <View style={styles.containerlabel}>
                        <Text style={styles.text}>{"Service Type : "}</Text>
                        <Text style={styles.text1}>{serviceType }
                        </Text>
                    </View>
                    <View style={styles.containerlabel}>
                        <Text style={styles.text}>{"Fecha : "}</Text>
                        <Text style={styles.text1}>{cotizacionDate }
                        </Text>
                    </View>
                    <View style={styles.containerlabel}>
                        <Text style={styles.text}>{"Hora : "}</Text>
                        <Text style={styles.text1}>{cotizacionTime }
                        </Text>
                    </View>
                    <View style={styles.containerlabel}>
                        <Text style={styles.text}>{"hero Name : "}</Text>
                        <Text style={styles.text1}>{heroName }
                        </Text>
                    </View>
                    <View style={styles.containerlabel}>
                        <Text style={styles.text}>{"client name: "}</Text>
                        <Text style={styles.text1}>{clientName}
                        </Text>
                    </View>
                    <View style={styles.containerlabel}>
                        <Text style={styles.text}>{"client Neighborhood: "}</Text>
                        <Text style={styles.text1}>{clientNeighborhood}
                        </Text>
                    </View>
                    <View style={styles.containerlabel}>
                        <Text style={styles.text}>{"client Address: "}</Text>
                        <Text style={styles.text1}>{clientAddress}
                        </Text>
                    </View>
                    <View style={styles.containerlabel}>
                        <Text style={styles.text}>{"Price : "}</Text>
                        <Text style={styles.text1}>{price}
                        </Text>
                    </View>
                    <View style={styles.containerlabel}>
                        <Text style={styles.text}>{"details : "}</Text>
                        <Text style={styles.text1}>{details}
                        </Text>
                    </View>
                    <TouchableOpacity style={[styles.button]} onPress={() => console.log(accionbtn1)}>
                        <Text style={styles.buttonText}>{'Re-Agendar'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={() => console.log(accionbtn2)}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 0, // Reducido el margen superior
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        marginTop: 0,
        fontSize: 14,
        alignSelf: 'center',
        textAlign: "justify",
        fontWeight: 'bold',
    },text1: {
        marginTop: 0,
        fontSize: 14,
        alignSelf: 'center',
        textAlign: "justify",
    },
    textContainer: {
        textAlign: 'center',
        alignItems: 'center', // Centers the text container horizontally
        width: '100%', // Ensures the text container takes up a portion of the width for better justification
    },
    imageContainer: {
        marginTop: 15, // Eliminado el margen superior
        alignSelf: 'center',
        width: 300,
        height: 200,
        backgroundColor: '#f0f0f0', // Optional: for better visibility of the image area
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Ensure the image covers the entire container
    },
    container: {
        padding: 20,
        alignItems: 'center',
    },
    contentContainer: {
        borderWidth: 0, // Añadido un borde delgado
        borderColor: '#666', // Darker gray color for the border
        borderRadius: 7, // Rounded corners of the border
        backgroundColor: '#fff', // Background color white
    },button: {
        backgroundColor: '#0B7BFF',
        padding: 13,
        borderRadius: 2,
        alignItems: 'center',
        marginTop: 5,
        opacity:10,
    },button2: {
        backgroundColor: '#BD0000',
        padding: 13,
        borderRadius: 2,
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerlabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
});

export default PlantDescripcionDoce;
