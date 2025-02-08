"use client";
import React, { useState } from "react";

export default  function Faq() {
  const preguntasFrecuentes = [
    {
      pregunta: "¿Qué es GameRate HUB y cómo funciona?",
      respuesta:
        "GameRate HUB es un sitio web diseñado para los amantes de los videojuegos, donde puedes descubrir, documentarte y compartir opiniones sobre tus juegos favoritos. Puedes navegar por diferentes géneros, leer reseñas de otros usuarios y encontrar recomendaciones personalizadas.",
    },
    {
      pregunta: "¿Es necesario registrarse para usar GameRate HUB?",
      respuesta:
        "Sí, el registro es necesario para acceder a todas las funciones de GameRate HUB. Al crear una cuenta, podrás dejar reseñas, participar en la comunidad y personalizar tu experiencia.",
    },
    {
      pregunta: "¿Cómo puedo dejar una reseña sobre un videojuego?",
      respuesta:
        "Una vez que estés registrado y hayas iniciado sesión, busca el videojuego que deseas reseñar. En la página del juego, encontrarás un formulario para dejar tu opinión y calificación.",
    },
    {
      pregunta: "¿Hay algún costo asociado a usar GameRate HUB?",
      respuesta:
        "No, GameRate HUB es completamente gratuito para los usuarios. Puedes explorar, reseñar y descubrir juegos sin ningún costo.",
    },
    {
      pregunta: "¿Cómo puedo modificar o eliminar mi reseña?",
      respuesta:
        "Puedes modificar o eliminar tus reseñas desde tu perfil en la sección de 'Mis Reseñas'. Simplemente selecciona la reseña que deseas cambiar y sigue las instrucciones.",
    },
    {
      pregunta: "¿Cómo protegen mi información personal?",
      respuesta:
        "En GameRate HUB, nos tomamos muy en serio la seguridad de tus datos. Implementamos medidas de seguridad para proteger tu información personal. Puedes consultar nuestra Política de Privacidad para más detalles sobre cómo manejamos tus datos.",
    },
    {
      pregunta: "¿Puedo eliminar mi cuenta en GameRate HUB?",
      respuesta:
        "Sí, puedes eliminar tu cuenta en cualquier momento desde la sección de 'Configuración de cuenta'. Ten en cuenta que esta acción es irreversible y se borrará toda tu información.",
    },
    {
      pregunta: "¿Qué tipos de videojuegos puedo encontrar en GameRate HUB?",
      respuesta:
        "GameRate HUB abarca una amplia variedad de géneros de videojuegos, desde acción y aventura hasta estrategia y simulación. Puedes explorar y descubrir nuevos títulos en cada categoría.",
    },
    {
      pregunta: "¿Cómo puedo contactar al equipo de soporte?",
      respuesta:
        "Si necesitas ayuda, puedes ponerte en contacto con nuestro equipo de soporte a través del formulario de contacto en la sección de 'Ayuda' del sitio web. Estamos aquí para ayudarte.",
    },
    {
      pregunta: "¿Ofrecen algún tipo de garantía sobre las reseñas?",
      respuesta:
        "Las reseñas en GameRate HUB son opiniones de usuarios, por lo que no garantizamos la exactitud o calidad de cada reseña. Te recomendamos que leas varias opiniones antes de tomar decisiones sobre un videojuego.",
    },
    {
      pregunta: "¿GameRate HUB está disponible en dispositivos móviles?",
      respuesta:
        "Sí, puedes acceder a GameRate HUB desde cualquier dispositivo con conexión a internet, incluyendo computadoras, tablets y smartphones.",
    },
    {
      pregunta: "¿Cómo puedo recibir noticias y actualizaciones sobre GameRate HUB?",
      respuesta:
        "Puedes suscribirte a nuestro boletín desde tu perfil para recibir noticias, actualizaciones sobre nuevos juegos y funciones especiales directamente en tu correo electrónico.",
    },
  ];

  const [isOpen, setIsOpen] = useState({});

  function toggleAnswer(index) {
    setIsOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }

  return (
    <div>
      <h2>FAQ - Preguntas Frecuentes de GameRate HUB</h2>
      <div className="faq-container">
        {preguntasFrecuentes.map((item, index) => (
          <div key={index}>
            <div className="question" onClick={() => toggleAnswer(index)}>
              <button>{isOpen[index] ? "-" : "+"}</button>
              <span>{item.pregunta}</span>
            </div>
            {isOpen[index] && (
              <div className="answer">
                <p>{item.respuesta}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


