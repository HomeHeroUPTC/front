import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import React, { useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from "./firebaseConfig";
import Cotizaciones from "./app/screens/Cotizaciones";
import Visitas from "./app/screens/Visitas";
import DetallesVisita from "./app/screens/DetallesVisitas";
import HomeCliente from "./app/screens/HomeClient";
import HomeHH from "./app/screens/HomeHH";
import { AuthProvider } from "./src/components/utils/correo";
import { ServiciosProvider } from "./src/components/utils/serviciosList";
import DoceCotizaciones from "./app/screens/DoceCotizaciones";
import FormularioCliente from "./app/screens/FormularioCliente";
import FormularioProfesional from "./app/screens/FormularioProfesional";
import RegistrarServicios from "./app/screens/RegistrarServicios";
import FeedHHClient from "./app/screens/ProfesionalesDelServicio";
import ConfirmarVisita from "./app/screens/ConfirmarVisita";
import PagarVisita from './app/screens/PagarVisita'
import { RoleProvider } from "./src/components/utils/verificarcorreo";
import VisitasProfesionales from "./app/screens/VistasProfesional";
import CrearCotizaciones from "./app/screens/CrearCotizaciones";
import SelectProfile from "./app/screens/SeleccionarRegistro";
import { HeroProvider } from "./src/components/utils/Hero";
import Agenda from "./app/screens/Agenda";


const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen name='Login' component={Login}/>
            <InsideStack.Screen name='Cotizaciones' component={Cotizaciones} />
            <InsideStack.Screen name='Visitas' component={Visitas} />
            <InsideStack.Screen name='DetallesVisita' component={DetallesVisita} />
            <InsideStack.Screen name='HomeHH' component={HomeHH} />
            <InsideStack.Screen name='DoceCotizaciones' component={DoceCotizaciones}/>
            <InsideStack.Screen name='HomeCliente' component={HomeCliente}/>
            <InsideStack.Screen name='FormularioCliente' component={FormularioCliente}/>
            <InsideStack.Screen name='FormularioProfesional' component={FormularioProfesional}/>
            <InsideStack.Screen name='RegistrarServicios' component={RegistrarServicios}/>
            <InsideStack.Screen name='ProfesionalesDelServicio' component={FeedHHClient}/>
            <InsideStack.Screen name='ConfirmarVisita' component={ConfirmarVisita}/>
            <InsideStack.Screen name='PagarVisita' component={PagarVisita}/>
            <InsideStack.Screen name="VisitaProfesional" component={VisitasProfesionales}/>
            <InsideStack.Screen name="CrearCotizaciones" component={CrearCotizaciones}/>
            <InsideStack.Screen name="SeleccionPerfil" component={SelectProfile}/>
            <InsideStack.Screen name="Agenda" component={Agenda}/>
        </InsideStack.Navigator>
    )
}

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('user: ', user);
            setUser(user)
        });
    }, [])

    return (
        <AuthProvider>
            <RoleProvider>
            <ServiciosProvider>
                <HeroProvider> 
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="Login">
                            {user ? (
                                <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
                            ) : (
                                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                            )}
                        </Stack.Navigator>
                    </NavigationContainer>
                </HeroProvider>
            </ServiciosProvider>
            </RoleProvider>
        </AuthProvider>
    );
};