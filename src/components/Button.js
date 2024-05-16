import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const BlueButton = ({ text, onPress, backgroundColor, textColor }) => {
    return (
        <TouchableOpacity style={[, { backgroundColor }]} onPress={onPress}>
            <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 34,
        paddingVertical: 3,
        paddingHorizontal: 30,
        borderRadius: 0,
        maxWidth: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default BlueButton;
