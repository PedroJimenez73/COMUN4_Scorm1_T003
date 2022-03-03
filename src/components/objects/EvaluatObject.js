const EVALUATION = [
  {
    enunciate: "¿Cómo puedo subrayar?",
    responses: {
      response1: {
        response: "Seleccionando el texto que deseo subrayar y dándole al botón con el icono del subrayador.",
        isTrue: true,
        name: "evaluation1",
        value: 1,
        namepuntuation: "puntuation1",
        puntuation: 1,
        nameArr: "puntuationArr1"
      },
      response2: {
        response: "Dándole al botón con el icono del subrayador y luego seleccionando el texto que quiero subrayar.",
        isTrue: false,
        name: "evaluation1",
        value: 2,
        namepuntuation: "puntuation1",
        puntuation: 0,
        nameArr: "puntuationArr1"
      },
      response3: {
        response: "No se puede subrayar.",
        isTrue: false,
        name: "evaluation1",
        value: 3,
        namepuntuation: "puntuation1",
        puntuation: 0,
        nameArr: "puntuationArr1"
      },
      response4: {
        response: "Presionando el botón con el icono de la cruz.",
        isTrue: false,
        name: "evaluation1",
        value: 4,
        namepuntuation: "puntuation1",
        puntuation: 0,
        nameArr: "puntuationArr1"
      },
    },
  },
  {
    enunciate:
      "¿Qué es necesario para hacer una tarjeta giratoria?",
    responses: {
      response1: {
        response: "Una imagen rectangular.",
        isTrue: false,
        name: "evaluation2",
        value: 1,
        namepuntuation: "puntuation2",
        puntuation: 0,
        nameArr: "puntuationArr2"
      },
      response2: {
        response: "Un texto de más de 50 palabras.",
        isTrue: false,
        name: "evaluation2",
        value: 2,
        namepuntuation: "puntuation2",
        puntuation: 0,
        nameArr: "puntuationArr2"
      },
      response3: {
        response: "Un título de un máximo de 3 palabras.",
        isTrue: true,
        name: "evaluation2",
        value: 3,
        namepuntuation: "puntuation2",
        puntuation: 1,
        nameArr: "puntuationArr2"
      },
      response4: {
        response: "Un texto de un máximo de 50 palabras y una imagen que pueda reencuadrarse a un formato cuadrado.",
        isTrue: true,
        name: "evaluation2",
        value: 4,
        namepuntuation: "puntuation2",
        puntuation: 1,
        nameArr: "puntuationArr2"
      },
      response5: {
        response: "Una imagen que pueda reencuadrarse a un formato cuadrado.",
        isTrue: true,
        name: "evaluation2",
        value: 5,
        namepuntuation: "puntuation2",
        puntuation: 1,
        nameArr: "puntuationArr2"
      },
    },
  },
  {
    enunciate: "¿En qué formato debe estar la bibliografía?",
    responses: {
      response1: {
        response: "Formato APA (sexta edición).",
        isTrue: true,
        name: "evaluation3",
        value: 1,
        namepuntuation: "puntuation3",
        puntuation: 1,
        nameArr: "puntuationArr3"
      },
      response2: {
        response: "No necesitan un formato concreto.",
        isTrue: false,
        name: "evaluation3",
        value: 2,
        namepuntuation: "puntuation3",
        puntuation: 0,
        nameArr: "puntuationArr3"
      },
    },
  },
  {
    enunciate:
      "¿Cuales de las siguientes pantallas no son obligatorias?",
    responses: {
      response1: {
        response: "Glosario, Vídeo y Enlaces de interés.",
        isTrue: false,
        name: "evaluation4",
        value: 1,
        namepuntuation: "puntuation4",
        puntuation: 0,
        nameArr: "puntuationArr4"
      },
      response2: {
        response: "Carrousel de imágenes, Tarjetas giratorias y Rosco de definiciones.",
        isTrue: true,
        name: "evaluation4",
        value: 2,
        namepuntuation: "puntuation4",
        puntuation: 1,
        nameArr: "puntuationArr4"
      },
      response3: {
        response: "Presentación, Bibliografía y Nube de conceptos.",
        isTrue: false,
        name: "evaluation4",
        value: 3,
        namepuntuation: "puntuation4",
        puntuation: 0,
        nameArr: "puntuationArr4"
      },
      response4: {
        response: "Presentación, Evaluación y Valoración.",
        isTrue: false,
        name: "evaluation4",
        value: 4,
        namepuntuation: "puntuation4",
        puntuation: 0,
        nameArr: "puntuationArr4"
      },
    },
  },
  {
    enunciate: "¿Cuál puede ser la procedencia de las imágenes que aparezcan en el SCORM?",
    responses: {
      response1: {
        response: "Bancos de imágenes.",
        isTrue: false,
        name: "evaluation5",
        value: 1,
        namepuntuation: "puntuation5",
        puntuation: 0,
        nameArr: "puntuationArr5"
      },
      response2: {
        response: "Cuenta propia.",
        isTrue: false,
        name: "evaluation5",
        value: 2,
        namepuntuation: "puntuation5",
        puntuation: 0,
        nameArr: "puntuationArr5"
      },
      response3: {
        response: "Licencia uso comercial.",
        isTrue: false,
        name: "evaluation5",
        value: 3,
        namepuntuation: "puntuation5",
        puntuation: 0,
        nameArr: "puntuationArr5"
      },
      response4: {
        response: "Todas las anteriores.",
        isTrue: true,
        name: "evaluation5",
        value: 4,
        namepuntuation: "puntuation5",
        puntuation: 1,
        nameArr: "puntuationArr5"
      },
    },
  }
]
export default EVALUATION;
