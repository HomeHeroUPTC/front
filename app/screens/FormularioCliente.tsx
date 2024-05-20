import {StyleSheet, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import React from "react";
import FormularioClienteJS from "../../src/components/FormularioCliente";

interface RouteProps {
    navigation: NavigationProp<any, any>;
}

export default function FormularioCliente({navigation}: RouteProps) {
    return (
            <View>
                <FormularioClienteJS></FormularioClienteJS>
            </View>
    );
};
