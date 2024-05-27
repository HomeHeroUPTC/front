import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import HeaderProfile from '../../src/components/HeaderProfile.js';
import ProfileHH from '../../src/components/ProfileHH.js';
import Footer from '../../src/components/FooterClient.js';
import ProfileDetailModal from '../../src/components/ProfileDetailModal .js';

const FeedHHClient = ({ route }) => {
  const { id: service_id, service_type , cliente} = route.params;
  const [profesionales, setProfesionales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfesional, setSelectedProfesional] = useState(null);

  useEffect(() => {
    const url = `https://msservice-zaewler4iq-uc.a.run.app/Services/GetHeroServices?service_id=${service_id}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const profesionalesWithServiceId = data.map(profesional => ({
            ...profesional,
            service_id: service_id,// Agregando la propiedad service_id
            service_type: service_type
          }));
          setProfesionales(profesionalesWithServiceId);
        } else {
          throw new Error('Expected an array');
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [service_id]);

  const handlePress = (profesional) => {
    setSelectedProfesional(profesional);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProfesional(null);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0B7BFF" />
      </View>
    );
  }

  if (error || profesionales.length === 0) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>
          <View style={styles.header}>
            <HeaderProfile 
              companyName={'Home Hero'}
              userImage={cliente.url_img}
              username={cliente.name}
              description={"Profesionales"}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.info}>
              <Text style={styles.errorText}>
                Por ahora no tenemos profesionales que realicen el servicio que deseas, discúlpanos.
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Footer cliente={cliente} />
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
            description={"Profesionales"}
          />
        </View>
        <View style={styles.bodyInfo}>
          {profesionales.map((profesional, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(profesional)}>
              <ProfileHH profesional={profesional} cliente={cliente}/>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>  
      <View style={styles.footer}>
        <Footer cliente={cliente} />
      </View>
      <ProfileDetailModal 
        visible={modalVisible} 
        onClose={closeModal} 
        profesional={selectedProfesional} 
      />
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
    height: '1%',
    backgroundColor: '#fff',
  },
  headerInfo:{
    height: 50,
    backgroundColor: '#fff',
  },
  body:{
    paddingBottom: 80,
    justifyContent: 'center'
  },
  bodyInfo:{
    paddingBottom: '28%',
  },
  info:{
    marginTop:'30%',
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

export default FeedHHClient;
