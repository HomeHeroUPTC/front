import { Font } from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'MyCustomFont': require('../assets/fonts/Balance Groovy - Sans.ttf'),
  });
};
