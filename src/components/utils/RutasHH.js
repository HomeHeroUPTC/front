// RutasHH.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../../app/screens/Login';
import Cotizaciones from '../../../app/screens/Cotizaciones';
import Visitas from '../../../app/screens/Visitas';
import HomeCliente from '../../../app/screens/HomeClient';
import HomeHH from '../../../app/screens/HomeHH';
import DoceCotizaciones from '../../../app/screens/DoceCotizaciones';
import RegistrarServicios from '../../../app/screens/RegistrarServicios';
import FeedHHClient from '../../../app/screens/ProfesionalesDelServicio';

const InsideStack = createNativeStackNavigator();

export default function InsideLayoutHH() {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen name='Cotizaciones' component={Cotizaciones} />
            <InsideStack.Screen name='Visitas' component={Visitas} />
            <InsideStack.Screen name='HomeHH' component={HomeHH} />
            <InsideStack.Screen name='DoceCotizaciones' component={DoceCotizaciones} />
            <InsideStack.Screen name='HomeCliente' component={HomeCliente} />
            <InsideStack.Screen name='RegistrarServicios' component={RegistrarServicios} />
            <InsideStack.Screen name='ProfesionalesDelServicio' component={FeedHHClient} />
        </InsideStack.Navigator>
    );
}
