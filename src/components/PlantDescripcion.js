import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const PlantDescripcion = ({ imageUrl, title, description }) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.text}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: imageUrl }}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.description}>
                            {description+'                                                              '}
                        </Text>
                    </View>

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
    },
    textContainer: {
        textAlign: 'center',
        alignItems: 'center', // Centers the text container horizontally
        alignSelf: 'center',
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
    description: {
        marginTop: 20,
        alignSelf: 'center',
        textAlign: 'justify', // Justifies the text within the container
        paddingHorizontal: 40, // Adds horizontal padding of 20 points (2 cm approximately)
    },
    container: {
        padding: 20,
        top: 30,
        alignItems: 'center',
    },
    contentContainer: {
        borderWidth: 0, // Añadido un borde delgado
        borderColor: '#666', // Darker gray color for the border
        borderRadius: 7, // Rounded corners of the border
        backgroundColor: '#fff', // Background color white
    },
});

export default PlantDescripcion;