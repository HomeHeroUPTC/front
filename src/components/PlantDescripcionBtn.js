import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

const PlantDescripcionBtn = ({ imageUrl, title, description, accionbtn1, accionbtn2,txtbtn1 }) => {
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
                    <TouchableOpacity style={[styles.button]} onPress={() => console.log(accionbtn1)}>
                        <Text style={styles.buttonText}>{txtbtn1}</Text>
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
        marginTop: 0,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        marginTop: 20,
        fontSize: 14,
        alignSelf: 'center',
        textAlign: "justify"
    },
    textContainer: {
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
    },
    imageContainer: {
        marginTop: 15,
        alignSelf: 'center',
        width: 280,
        height: 200,
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    description: {
        marginTop: 20,
        alignSelf: 'center',
        textAlign: 'justify',
        paddingHorizontal: 40,
    },
    container: {
        padding: 20,
        alignItems: 'center',
    },
    contentContainer: {
        borderWidth: 0,
        borderColor: '#666',
        borderRadius: 7,
        backgroundColor: '#fff',
    },
    button: {
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
});

export default PlantDescripcionBtn;
