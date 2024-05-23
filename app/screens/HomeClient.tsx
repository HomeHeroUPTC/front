import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, ActivityIndicator, Text } from 'react-native';
import HeaderProfile from '../../src/components/HeaderProfile.js';
import Info from '../../src/components/Info.js';
import Footer from '../../src/components/Footer.js';

const ProfileScreen = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Definir la palabra clave
    const palabraClave = 'Servicio';
  
    // Construir la URL con la palabra clave como parámetro de consulta
    const url = `https://e18e-132-255-20-2.ngrok-free.app/GetServicios`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0B7BFF" />
      </View>
    );
  }

  if (error || servicios.length === 0) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>
          <View style={styles.header}>
            <HeaderProfile 
              companyName='Home Hero' 
              userImage={'https://todoparalaindustria.com/cdn/shop/articles/herramientas-carpintero-madera.png?v=1683036808&width=1400'}
              username="SebasLPZ"
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
            userImage={'https://todoparalaindustria.com/cdn/shop/articles/herramientas-carpintero-madera.png?v=1683036808&width=1400'}
            username="SebasLPZ"
            description={"Servicios"}
          />
        </View>
        <View style={styles.bodyInfo}>
          {servicios.map((servicio, index) => (
            <Info key={index} servicio={servicio} />
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
      height: '8%',
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
