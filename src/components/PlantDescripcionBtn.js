import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

const PlantDescripcionBtn = ({imageUrl, tituloServicioProfesional, fechaHora, valor, nombreCliente}) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.text}>
                    <Text style={styles.title}>
                        {tituloServicioProfesional}
                    </Text>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{uri: imageUrl}}
                        />
                    </View>
                    <View style={styles.containerlabel}>
                        <Text style={styles.text}>{"Fecha: "}</Text>
                        <Text style={styles.text1}>{fechaHora}
                        </Text>
                    </View>
                    <View style={styles.containerlabel}>
                        <Text style={styles.text}>{"Valor: "}</Text>
                        <Text style={styles.text1}>{valor}
                        </Text>
                    </View>
                    <View style={styles.containerlabel}>
                        <Text style={styles.text}>{"Cliente: "}</Text>
                        <Text style={styles.text1}>{nombreCliente}
                        </Text>
                    </View>
                    <TouchableOpacity style={[styles.button]} onPress={() => console.log(accionbtn1)}>
                        <Text style={styles.buttonText}>{'Ver mas'}</Text>
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
        textAlign: "justify",
        fontWeight: 'bold',
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
        opacity: 10,
    }, button2: {
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
    text1: {
        marginTop: 20,
        fontSize: 14,
        alignSelf: 'center',
        textAlign: "justify",
    }
});

export default PlantDescripcionBtn;
