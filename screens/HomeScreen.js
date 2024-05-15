import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Aquí podrías agregar la lógica para cerrar sesión
    // Por ejemplo, limpiar el estado de autenticación, eliminar tokens, etc.
    // Luego, navegamos de regreso a la pantalla de inicio de sesión
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la pantalla de inicio</Text>
      <Button
        title="Cerrar sesión"
        onPress={handleLogout}
      />
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

export default HomeScreen;
