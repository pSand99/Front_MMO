import { useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  
  // Estados para los valores de los inputs en el modal de registro
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Estados para la visibilidad de modales
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  // Animaciones para los modales
  const loginScale = useSharedValue(0);
  const registerScale = useSharedValue(0);

  const loginAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: loginScale.value }],
  }));
  const registerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: registerScale.value }],
  }));

  // Evento abrir el modal de LOGIN
  const openModalLogin = (event) => {
    // Obtener la posición del botón
    event.target.measure((fx, fy, w, h, px, py) => {
      setButtonPosition({ x: px + w / 2, y: py + h / 2 });
      setLoginModalVisible(true);
      loginScale.value = 0;
      loginScale.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
    });
  };

  //Evento abrir el modal de REGISTRO
  const openModalRegister = (event) => {
    // Obtener la posición del botón
    event.target.measure((fx, fy, w, h, px, py) => {
      setButtonPosition({ x: px + w / 2, y: py + h / 2 });
      setRegisterModalVisible(true);
      registerScale.value = 0;
      registerScale.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
    });
  };

  // Cerrar modal de LOGIN
  const closeModalLogin = () => {
    // Animación y cambio de estado visibilidad
    loginScale.value = withTiming(0, { duration: 600, easing: Easing.in(Easing.exp) }, () => {
      setLoginModalVisible(false);
    });
  };

  // Cerrar modal de REGISTRO
  const closeModalRegister = () => {
    // Animación y cambio de estado visibilidad
    registerScale.value = withTiming(0, { duration: 600, easing: Easing.in(Easing.exp) }, () => {
      setRegisterModalVisible(false);
    });
  };

  // Navegación a screen de "LoginScreen"
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Hola! Esto es meme-o</Text>

      {/* LOGIN */}
      <TouchableOpacity style={styles.screenButton} onPress={openModalLogin}>
        <Text style={styles.buttonText}>Inicia sesión</Text>
      </TouchableOpacity>
      <Modal isVisible={isLoginModalVisible} animationIn="zoomIn" animationOut="zoomOut" onBackdropPress={closeModalLogin}
        style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }} >
        <Animated.View style={[styles.modalContent, loginAnimatedStyle]}>
          <Text style={styles.modalText}>¿Ya tienes cuenta? Great!</Text>
          {/* Formulario de registro */}
          <TextInput style={styles.input} value={username} placeholder="memeuser" onChangeText={setUsername} />
          <TextInput style={styles.input} value={password} placeholder="Passw0rd" onChangeText={setPassword} secureTextEntry />
          
          <TouchableOpacity onPress={closeModalRegister}>
            <Text style={styles.goodButton}>Entra</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModalLogin}>
            <Text style={styles.closeButton}>Cerrar</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>

      {/* REGISTRO */}
      <TouchableOpacity style={styles.screenButton} onPress={openModalRegister}>
        <Text style={styles.buttonText}>Regístrate</Text>
      </TouchableOpacity>
      <Modal isVisible={isRegisterModalVisible} animationIn="zoomIn" animationOut="zoomOut" onBackdropPress={closeModalRegister}
        style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }} >
        <Animated.View style={[styles.modalContent, registerAnimatedStyle]}>
          <Text style={styles.modalText}>Regístrese</Text>
          {/* Formulario de registro */}
          <TextInput style={styles.input} value={email} placeholder="welcomemeo@memeo.com" onChangeText={setEmail} />
          <TextInput style={styles.input} value={username} placeholder="memeuser" onChangeText={setUsername} />
          <TextInput style={styles.input} value={password} placeholder="Passw0rd" onChangeText={setPassword} secureTextEntry />

          <TouchableOpacity onPress={closeModalRegister}>
            <Text style={styles.goodButton}>Registro</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModalRegister}>
            <Text style={styles.closeButton}>Cerrar</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>

      <TouchableOpacity style={styles.screenButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Botón al login</Text>
      </TouchableOpacity>
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
  modalContent: {
    width: 400,
    height: 400,
    backgroundColor: 'white',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  goodButton: {
    color: 'green',
    fontSize: 16,
    paddingBottom: '3px',
  },
  closeButton: {
    color: 'red',
    fontSize: 16,
  },
  input: {
    width: '50%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  screenButton: {
    padding: 10,
    margin: 5,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  }
});

export default HomeScreen;
