import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  
  //ESTO ES UNA PÁGINA EQUIS DE PRUEBA NO HACERLE CASO
  
  
  
  const navigation = useNavigation();
  



  // Estados para la visibilidad de cada modal
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  // Animación para ambos modales
  const loginScale = useSharedValue(0);
  const registerScale = useSharedValue(0);

  const loginAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: loginScale.value }],
  }));

  const registerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: registerScale.value }],
  }));

  const openModalLogin = (event) => {
    // Obtener la posición del botón
    event.target.measure((fx, fy, w, h, px, py) => {
      setButtonPosition({ x: px + w / 2, y: py + h / 2 });
      setLoginModalVisible(true);
      loginScale.value = 0;
      loginScale.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
    });
  };

  const openModalRegister = (event) => {
    // Obtener la posición del botón
    event.target.measure((fx, fy, w, h, px, py) => {
      setButtonPosition({ x: px + w / 2, y: py + h / 2 });
      setRegisterModalVisible(true);
      registerScale.value = 0;
      registerScale.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
    });
  };

  const closeModalLogin = () => {
    // Animación y cambio de estado visibilidad
    loginScale.value = withTiming(0, { duration: 600, easing: Easing.in(Easing.exp) }, () => {
      setLoginModalVisible(false);
    });
  };

  const closeModalRegister = () => {
    // Animación y cambio de estado visibilidad
    registerScale.value = withTiming(0, { duration: 600, easing: Easing.in(Easing.exp) }, () => {
      setRegisterModalVisible(false);
    });
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Hola! Esto es meme-o</Text>

      {/* LOGIN */}
      <Button title="Inicia sesión" onPress={openModalLogin} />
      <Modal
        isVisible={isLoginModalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
        onBackdropPress={closeModalLogin}
        style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
      >
        <Animated.View style={[styles.modalContent, loginAnimatedStyle]}>
          <Text style={styles.modalText}>LOGGEATEEEE SIU</Text>
          <TouchableOpacity onPress={closeModalLogin}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>

      <Button title="Regístrate" onPress={openModalRegister} />
      <Modal
        isVisible={isRegisterModalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
        onBackdropPress={closeModalRegister}
        style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
      >
        <Animated.View style={[styles.modalContent, registerAnimatedStyle]}>
          <Text style={styles.modalText}>REGÍSTRATEEEEE</Text>
          <TouchableOpacity onPress={closeModalRegister}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>

      <Button title="Cerrar sesión" onPress={handleLogout} />
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
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    color: 'red',
    fontSize: 16,
  }
});

export default HomeScreen;
