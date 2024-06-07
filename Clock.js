// const BASE_URL = 'http://localhost:8080/api/time';

// export const getCurrentTime = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/hora`);
//     if (!response.ok) {
//       throw new Error('Error al obtener la hora');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const Clock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/time') // Hacer la solicitud HTTP GET a la URL de la API Spring Boot
      .then(response => response.text())
      .then(data => setTime(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{time}</Text>
    </View>
  );
};

export default Clock;




