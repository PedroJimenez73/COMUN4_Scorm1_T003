const QUIZZS = {
    question1: {
        enunciate: '¿Cómo se hace un cuestionario de verificación?',
        responses: {
            response1: {
                response: 'Dando siempre feedback en cada respuesta',
                isTrue: true,
                value: 1,
                name: 'question1',
                feedback: '¡Correcto! Y el feedback ha de ser de utilidad, no puede ser solo una palabra. No puede contener imágenes ni citas.'
            },
            response2: {
                response: 'Siempre debe contener una respuesta incorrecta.',
                isTrue: false,
                value: 2,
                name: 'question1',
                feedback: 'Falso. El número de respuestas correctas o incorrectas es decisión del profesor. Siempre deberá contener al menos una respuesta correcta.'
            },
            response3: {
                response: 'Animando al alumno a comprobar todas las respuestas',
                isTrue: true,
                value: 3,
                name: 'question1',
                feedback: '¡Correcto! Lo interesante de esta plantilla es que el alumno pruebe las diferentes opciones y lea los feedbacks correspondientes.'
            },
        },
    },
    question2: {
        enunciate: '¿Tienes alguna duda? La respuesta a este cuestionario no llegará al autor del SCORM. Sí quedará guardada y cada alumno al volver a abrir el SCORM podrá leerla o modificarla.',
        ask: 'Escribe aquí tu respuesta...',
        isTrue: null,
        value: '',
        name: 'question2',
    },}

export default QUIZZS;