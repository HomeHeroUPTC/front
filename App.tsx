import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import puntodeentrada from "./app/screens/Puntodeentrada";
import React, { useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from "./firebaseConfig";
import Cotizaciones from "./app/screens/Cotizaciones";
import Visitas from "./app/screens/Visitas";
import DoceCotizaciones from "./app/screens/DoceCotizaciones";


const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen name='Home Hero' component={puntodeentrada}/>
            <InsideStack.Screen name='Cotizaciones' component={Cotizaciones}/>
            <InsideStack.Screen name='Visitas' component={Visitas}/>
            <InsideStack.Screen name='DoceCotizaciones' component={DoceCotizaciones}/>
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
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {user ? (
                    <Stack.Screen name="Inside" component={InsideLayout} options={{headerShown: false}}/>
                ) : (
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};