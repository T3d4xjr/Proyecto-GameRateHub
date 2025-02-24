"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaMinus } from "react-icons/fa"; 

export default function Faq() {
  const preguntasFrecuentes = [
    {
      pregunta: "1. ¿Qué es GameRate HUB y cómo funciona?",
      respuesta:
        "GameRate HUB es un sitio web diseñado para los amantes de los videojuegos, donde puedes descubrir, documentarte y compartir opiniones sobre tus juegos favoritos.",
    },
    {
      pregunta: "2. ¿Es necesario registrarse para usar GameRate HUB?",
      respuesta:
        "Sí, el registro es necesario para acceder a todas las funciones de GameRate HUB. Al crear una cuenta, podrás dejar reseñas y participar en la comunidad.",
    },
    {
      pregunta: "3. ¿Cómo puedo dejar una reseña sobre un videojuego?",
      respuesta:
        "Una vez registrado e iniciado sesión, busca el videojuego y usa el formulario para dejar tu opinión y calificación.",
    },
    {
      pregunta: "4. ¿Hay algún costo asociado a usar GameRate HUB?",
      respuesta:
        "No, GameRate HUB es completamente gratuito para los usuarios.",
    },
    {
      pregunta: "5. ¿Cómo puedo modificar o eliminar mi reseña?",
      respuesta:
        "Puedes modificar o eliminar tus reseñas desde tu perfil en la sección de 'Mis Reseñas'.",
    },
    {
      pregunta: "6. ¿Cómo protegen mi información personal?",
      respuesta:
        "En GameRate HUB implementamos medidas de seguridad para proteger tu información personal.",
    },
    {
      pregunta: "7. ¿Puedo eliminar mi cuenta en GameRate HUB?",
      respuesta:
        "Sí, puedes eliminar tu cuenta en la sección de 'Configuración de cuenta'. Esta acción es irreversible.",
    },
    {
      pregunta: "8. ¿Cómo puedo contactar al equipo de soporte?",
      respuesta:
        "Puedes ponerte en contacto con nuestro equipo a través del formulario de contacto en la sección de 'Ayuda'.",
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
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundColor: "#0D0D0D",
        color: "#FFFFFF",
        minHeight: "100vh",
      }}
    >
      <h2 className="text-center mb-5" style={{ color: "#FFFFFF" }}>
        FAQ - Preguntas Frecuentes
      </h2>

      <div className="accordion w-75" id="faqAccordion">
        {preguntasFrecuentes.map((item, index) => (
          <div
            key={index}
            className="accordion-item"
            style={{
              backgroundColor: "#1C1C1C",
              border: "none",
              marginBottom: "10px", 
            }}
          >
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed d-flex justify-content-between align-items-center"
                type="button"
                onClick={() => toggleAnswer(index)}
                style={{
                  backgroundColor: "#222",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  padding: "20px", 
                  fontSize: "1.2rem",
                }}
              >
                {item.pregunta}
                <span className="ms-2">
                  {isOpen[index] ? (
                    <FaMinus className="icon-minus" size={20} />
                  ) : (
                    <FaPlus className="icon-plus" size={20} />
                  )}
                </span>
              </button>
            </h2>
            {isOpen[index] && (
              <div className="accordion-body" style={{ backgroundColor: "#1C1C1C", color: "#FFFFFF", padding: "20px" }}>
                {item.respuesta}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
