import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import PlantDescripcion from "../../src/components/PlantDescripcion";
import React from "react";

interface RouteProps {
    navigation: NavigationProp<any, any>;
}

export default function Cotizaciones({navigation}: RouteProps) {
    return (
        <View>
            <PlantDescripcion
                descripcion={"Se cambiara la puerta del baño y se envaldocinara la cocina"}
                direccion={"Cr 4-32 "}
                fecha={"2022-06-01"}
                hora={"9"}
                precio={20000}
            />
        </View>
    );
};

