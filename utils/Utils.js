export const convertToBase64 = async (url) => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error("Error converting to base64: ", error)
    return null
  }
}

// const simulateSuccessfulLogin = () => {
//   // Simular obtención de publicaciones
//   const simulatedPosts = [
//     {
//       id: 1,
//       username: "usuario1",
//       text: "¡Hola mundo!",
//       likes: 0,
//       liked: false,
//     },
//     {
//       id: 2,
//       username: "usuario2",
//       text: "Esto es una publicación de prueba.",
//       likes: 5,
//       liked: false,
//     },
//     {
//       id: 3,
//       username: "usuario3",
//       text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac maximus nulla. Proin pretium dapibus aliquam. Etiam semper ligula sit amet quam maximus, in porta lectus consectetur. Nunc varius massa massa, quis vehicula arcu consequat nec. Nullam sit amet tempus ante. Sed ornare sollicitudin urna, sit amet lobortis quam. Integer id feugiat ex. Vivamus a volutpat odio. Aliquam tristique lectus et mauris ullamcorper, sed sagittis leo aliquet. Donec viverra elementum magna, a commodo libero congue a. Nulla placerat iaculis fermentum. Vestibulum ullamcorper sit amet est ac sollicitudin. Ut eleifend, odio ut mollis placerat, elit diam finibus augue, ac laoreet risus erat eleifend neque.",
//       likes: 5,
//       liked: false,
//     },
//     {
//       id: 4,
//       username: "usuario4",
//       text: "Esto es una publicación de prueba.",
//       likes: 5,
//       liked: false,
//     },
//     {
//       id: 5,
//       username: "usuario5",
//       text: "¡Hola mundo!",
//       likes: 5,
//       liked: false,
//     },
//     {
//       id: 6,
//       username: "usuario6",
//       text: "Esto es una publicación de prueba.",
//       likes: 5,
//       liked: false,
//     },
//     {
//       id: 7,
//       username: "usuario7",
//       text: "¡Hola mundo!",
//       likes: 5,
//       liked: false,
//     },
//     {
//       id: 8,
//       username: "usuario8",
//       text: "Esto es una publicación de prueba.",
//       likes: 5,
//       liked: false,
//     },
//     {
//       id: 9,
//       username: "usuario1",
//       text: "¡Hola mundo!",
//       likes: 5,
//       liked: false,
//     },
//     {
//       id: 10,
//       username: "usuario2",
//       text: "Esto es una publicación de prueba.",
//       likes: 5,
//       liked: false,
//     },
//     {
//       id: 11,
//       username: "usuario3",
//       text: "¡Hola mundo!",
//       likes: 5,
//       liked: false,
//     },
//     {
//       id: 12,
//       username: "usuario4",
//       text: "Esto es una publicación de prueba.",
//       likes: 5,
//       liked: false,
//     },
//   ]
//   setPosts(simulatedPosts)
// }

// useEffect(() => {
//   // simulateSuccessfulLogin();
// }, []);
