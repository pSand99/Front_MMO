import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const simulateSuccessfulLogin = () => {
    // Simular inicio de sesión exitoso
    console.log("Inicio de sesión exitoso.");

    // Navegar al feed después del inicio de sesión exitoso
    navigation.navigate('Feed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <Button title="Iniciar sesión" onPress={simulateSuccessfulLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoginScreen;
