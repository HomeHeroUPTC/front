import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '../../src/components/utils/correo';
import ServiciosHH from '../../src/components/ServiciosHome';
import RoundButton from '../../src/components/ButonAdd';
import Footer from '../../src/components/Footer';
import HeaderProfile from '../../src/components/HeaderProfile';
import { useServicios } from '../../src/components/utils/serviciosList';
import InsideLayoutHH from '../../src/components/utils/RutasHH';



interface RouteProps {
    navigation: NavigationProp<any, any>;
}

const handlePress = () => {
    ;
};

export default function HomeHH({ navigation }: RouteProps) {
    const { userEmail } = useAuth();
    const [serviciosData, setServiciosData] = useState([

    ]);

    const agregarServicio = () => {
        const nuevoServicio = {
            id: serviciosData.length + 1,
            nombre: `Servicio ${serviciosData.length + 1}`,
            descripcion: 'Sercios de aposentos ${sdasd}',
            image: 'https://todoparalaindustria.com/cdn/shop/articles/herramientas-carpintero-madera.png?v=1683036808&width=1400'

        };
        setServiciosData([...serviciosData, nuevoServicio]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderProfile
                    username={'Sebas'}
                    companyName={'HomeHero'}
                    description={'papapa'}
                    userImage={'https://todoparalaindustria.com/cdn/shop/articles/herramientas-carpintero-madera.png?v=1683036808&width=1400'}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {serviciosData.length === 0 ? (
                    <Text style={styles.noServicesText}>No hay servicios creados</Text>
                ) : (
                    serviciosData.map(servicio => (
                        <ServiciosHH
                            key={servicio.id} // Asegúrate de agregar una key única
                            serviceName={servicio.nombre} // Aquí eliminamos las comillas simples
                            servicedescription={servicio.descripcion} // Aquí eliminamos las comillas simples
                            serviceImage={servicio.image} // Aquí eliminamos las comillas simples
                        />
                    ))
                )}
            </ScrollView>
            <RoundButton onPress={() => navigation.navigate('RegistrarServicios')} />
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',  // Asegura que el contenido se alinee al final
    },
    scrollViewContent: {
        paddingBottom: 180,  // Ajusta el padding para evitar solapamiento con el footer y botón
    },
    footer: {
        height: 60,  // Ajusta según el tamaño real del footer
        backgroundColor: '#ccc',  // Ajusta según el estilo del footer
    },
    header: {
        height: '12%',
      backgroundColor: '#fff',
    },
    noServicesText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'gray',
    },
});
