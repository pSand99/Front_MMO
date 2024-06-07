import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigation = useNavigation();


  const handleLogin = () => {
    // Verificamos si los campos de correo electrónico y contraseña no están vacíos
    if (!email || !password) {
      setLoginError('Por favor, ingresa tu correo electrónico y contraseña.');
      return;
    }

    // Realizamos la solicitud de inicio de sesión a la API REST
    fetch('http://localhost:8080/api/time', {
      method: 'GET',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.text();
    })
    .then(data => {
      // Esto maneja la respuesta de la API
      console.log(data); // Aquí podemos hacer algo con los datos recibidos

      // Navegar a la pantalla de inicio después de un inicio de sesión exitoso
      handleSuccessfulLogin();
    })
    .catch(error => {
      console.error(error);
      setLoginError('Error en la solicitud de inicio de sesión.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {loginError ? <Text style={styles.error}>{loginError}</Text> : null}
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Aquí puedes agregar contenido adicional para el modal, como el formulario de registro */}
            <Text style={styles.modalTitle}>Registro</Text>
            {/* Otros campos de registro */}
            <Button title="Cerrar" onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </View>
      </Modal>
      <Button title="Registrarse" onPress={() => setModalVisible(true)} />
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
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default LoginScreen;
