import {StyleSheet, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import React from "react";
import FormularioProfesionalJS from "../../src/components/FormularioProfesional";

interface RouteProps {
    navigation: NavigationProp<any, any>;
}

export default function FormularioProfesional({navigation}: RouteProps) {
    return (
            <View>
                <FormularioProfesionalJS></FormularioProfesionalJS>
            </View>
    );
};
