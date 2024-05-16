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
                title={'Soldador'}
                imageUrl="https://www.solyman.com/wp-content/uploads/2018/12/080917-F-4707M-119.jpg"
                description={'sdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdssdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsdsdfdsgfsdfsddfdsdfdsfsdfsdfsd'}
            />
        </View>
    );
};

