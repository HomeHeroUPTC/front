import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import puntodeentrada from "./app/screens/Puntodeentrada";
import React, { useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from "./firebaseConfig";
import Cotizaciones from "./app/screens/Cotizaciones";
import Visitas from "./app/screens/Visitas";
import HomeCliente from "./app/screens/HomeClient";
import HomeHH from "./app/screens/HomeHH";
import { AuthProvider } from "./src/components/utils/correo";
import { ServiciosProvider } from "./src/components/utils/serviciosList";
import DoceCotizaciones from "./app/screens/DoceCotizaciones";
<<<<<<< HEAD
import FormularioCliente from "./app/screens/FormularioCliente";
import FormularioProfesional from "./app/screens/FormularioProfesional";
=======
import RegistrarServicios from "./app/screens/RegistrarServicios";
import FeedHHClient from "./app/screens/ProfesionalesDelServicio";
import { RoleProvider } from "./src/components/utils/verificarcorreo";

>>>>>>> c2d1d68b53d0f809479b0f3f417d325d8662af18

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen name='Login' component={Login}/>
            <InsideStack.Screen name='Home Hero' component={puntodeentrada} />
            <InsideStack.Screen name='Cotizaciones' component={Cotizaciones} />
            <InsideStack.Screen name='Visitas' component={Visitas} />
            <InsideStack.Screen name='HomeHH' component={HomeHH} />
            <InsideStack.Screen name='DoceCotizaciones' component={DoceCotizaciones}/>
            <InsideStack.Screen name='HomeCliente' component={HomeCliente}/>
<<<<<<< HEAD
            <InsideStack.Screen name='FormularioCliente' component={FormularioCliente}/>
            <InsideStack.Screen name='FormularioProfesional' component={FormularioProfesional}/>
=======
            <InsideStack.Screen name='RegistrarServicios' component={RegistrarServicios}/>
            <InsideStack.Screen name='ProfesionalesDelServicio' component={FeedHHClient}/>
>>>>>>> c2d1d68b53d0f809479b0f3f417d325d8662af18
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
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    {user ? (
                        <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
                    ) : (
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
            </ServiciosProvider>
            </RoleProvider>
        </AuthProvider>
    );
};