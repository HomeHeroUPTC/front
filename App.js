import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Keycloak from 'keycloak-js';

/**
 * Init options
 */
let initOptions = {
  url: 'https://35.196.23.252:8443/',
  realm: 'HomeHero-Realm',
  clientId: 'front-react-homehero',
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Sebastian Lopez</Text>
      <Text>Santiago Rivera Orjuela</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
