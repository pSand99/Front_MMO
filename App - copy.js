// import React from 'react';
// import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
// export default class App extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       isLoading: true,
//       time: null,
//       //dataSource: null,
//     }
//   }
//   componentDidMount(){
    
//     //'https://reactnative.dev/movies.json
//     return fetch('http://localhost:8080/api/time', {
//       method: 'GET',
//       mode: 'no-cors' // Set the request's mode to 'no-cors'
//     })
//     .then((response) => {
//       console.log('Request successful');
//       return response.json();
      
//     })
//     .then((data) => {
//       this.setState({
//         isLoading: false,
//         time: data,
//         //dataSource: responseJson,
//       });

//     })
      
//       .catch(error => {
//         // Handle any errors
//         console.error('Error:', error);
//       });
//     }

// render () {
//   if (this.state.isLoading){
//     return(
//       <View style={styles.container}>
//         <ActivityIndicator/>
//       </View>
//     )
//   }else{
//     return (
//       <View style={styles.container}>
//         <Text>La hora actual es: {this.state.time}</Text>
        
//     </View>
//     );    
//   }
//   }
//   }
// const styles = StyleSheet.create({
//     container: {
//     flex: 1, backgroundColor: '#fff', 
//     alignItems:'center',
//     justifyContent:'center',
//     },

//     item: {
//       flex: 1, alignSelf: 'stretch', margin: 10, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor:
//       '#eee'}
// });

import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

export default function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://192.168.1.56:8080/api/time')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{message}</Text>
    </View>
  );
}