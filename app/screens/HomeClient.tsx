import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native';
import HeaderProfile from '../../src/components/HeaderProfile.js';
import Info from '../../src/components/Info.js';
import Footer from '../../src/components/FooterClient.js';

const ProfileScreen = ({ route }) => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cliente, setCliente] = useState(null);
  const { correo } = route.params;
  console.log("Tu correo es " + correo);

  useEffect(() => {
    const filtro = ""; // Aquí puedes definir tu filtro, por ejemplo: const filtro = "tipo=servicio";
    const urlServicios = `https://msservice-zaewler4iq-uc.a.run.app/Services/GetServices?filter=${filtro}`;
    fetch(urlServicios, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received from API:', data);
        if (Array.isArray(data)) {
          setServicios(data);
        } else {
          throw new Error('Expected an array');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los servicios:', error);
        setError(error);
        setLoading(false);
      });

    const urlCliente = `https://msusuarios-zaewler4iq-uc.a.run.app/User/GetClientByMail?client_mail=${correo}`;
    fetch(urlCliente, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received from API:', data);
        setCliente(data);
      })
      .catch(error => {
        console.error('Error al obtener el cliente:', error);
        setError(error);
      });
  }, []);

  const handlePress = (id) => {
    console.log('Servicio seleccionado con ID:', id);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0B7BFF" />
      </View>
    );
  }

  if (error || !cliente) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>
          <View style={styles.header}>
            <HeaderProfile 
              companyName='Home Hero'
              userImage={cliente ? cliente.image_url : ''}
              username={cliente ? cliente.name : ''}
              description={"Servicios"}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.info}>
              <Text style={styles.errorText}>
                Por ahora no tenemos servicios para ofrecerte, discúlpanos.
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Footer />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>
        <View style={styles.headerInfo}>
          <HeaderProfile 
            companyName='Home Hero'
            userImage={cliente.image_url}
            username={cliente.name}
            description={"Servicios"}
          />
        </View>
        <View style={styles.bodyInfo}>
          {servicios.map((servicio, index) => (
            <Info key={index} servicio={servicio} cliente={cliente} />
          ))}
        </View>
      </ScrollView>  
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
    },
    scrollContainer: {
      backgroundColor: '#fff',
    },
    header:{
      height: '50%',
      backgroundColor: '#fff',
    },
    headerInfo:{
      height: '4%',
      backgroundColor: '#fff',
    },
    body:{
      paddingBottom: 80,
      justifyContent: 'center'
    },
    bodyInfo:{
      paddingBottom: 90,
    },
    info:{
      marginTop:20,
    },
    footer:{
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 18,
      color: '#ff0000',
      textAlign: 'center',
      marginHorizontal: 20,
    },
});

export default ProfileScreen;
