"use client";
import React, { useState } from "react";

export default function PoliticaPrivacidad() {
  const politicaPreguntasFrecuentes = [
    {
      pregunta: "1. ¿Qué información recopilamos?",
      respuesta:
        "Recopilamos la siguiente información cuando utilizas GameRate HUB: \n\n Información personal: Incluye tu nombre, dirección de correo electrónico, y cualquier otra información que decidas proporcionar al registrarte o usar nuestro sitio. \n\n Información de uso: Recopilamos datos sobre cómo interactúas con nuestro sitio, incluyendo las páginas que visitas, el tiempo que pasas en ellas y otras estadísticas relacionadas. \n\n Cookies y tecnologías similares: Utilizamos cookies para mejorar tu experiencia en nuestro sitio y analizar el tráfico. Puedes configurar tu navegador para rechazar todas las cookies o para indicar cuándo se envían.",
    },
    {
      pregunta: "2. ¿Cómo utilizamos tu información?",
      respuesta:
        "Utilizamos la información recopilada para: \n\n- Proporcionarte acceso a nuestros servicios y funcionalidades. \n\n- Personalizar tu experiencia en GameRate HUB. \n\n- Enviarte información sobre actualizaciones, promociones y noticias relacionadas con el sitio. \n\n- Mejorar nuestro sitio web y servicios mediante análisis y retroalimentación. \n\n- Cumplir con obligaciones legales y resolver disputas.",
    },
    {
      pregunta: "3. ¿Compartimos tu información?",
      respuesta:
        "No vendemos ni alquilamos tu información personal a terceros. Sin embargo, podemos compartir tu información en las siguientes circunstancias: \n\n Con proveedores de servicios: Trabajamos con terceros que nos ayudan a operar el sitio web y proporcionar servicios (por ejemplo, servicios de análisis). Estos proveedores tienen acceso a tu información solo para realizar tareas en nuestro nombre y están obligados a no divulgarla o usarla para otros fines. \n\n Por requerimiento legal: Podemos divulgar tu información si así lo exige la ley o en respuesta a solicitudes de las autoridades públicas.",
    },
    {
      pregunta: "4. ¿Cómo protegemos tu información?",
      respuesta:
        "Tomamos medidas razonables para proteger tu información personal de pérdida, robo y uso indebido. Sin embargo, ninguna transmisión de datos a través de Internet o almacenamiento electrónico es 100% seguro. Por lo tanto, no podemos garantizar la seguridad absoluta de tu información.",
    },
    {
      pregunta: "5. ¿Cuáles son tus derechos?",
      respuesta:
        "Dependiendo de tu ubicación, puedes tener derechos sobre tu información personal, que pueden incluir: \n\n- El derecho a acceder a tus datos. \n\n- El derecho a solicitar la corrección de datos inexactos. \n\n- El derecho a solicitar la eliminación de tu información personal. \n\n- El derecho a oponerte al procesamiento de tus datos o solicitar la restricción de su uso. \n\nPara ejercer cualquiera de estos derechos, por favor contáctanos a través de [correo de contacto o formulario de contacto].",
    },
    {
      pregunta: "6. ¿Enlaces a otros sitios?",
      respuesta:
        "Nuestro sitio puede contener enlaces a otros sitios web que no operamos. No somos responsables de las prácticas de privacidad de esos sitios. Te recomendamos que leas las políticas de privacidad de cada sitio que visites.",
    },
    {
      pregunta: "7. Cambios a esta Política de Privacidad",
      respuesta:
        "Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Te notificaremos sobre cambios significativos mediante un aviso en nuestro sitio web. Tu uso continuado de GameRate HUB después de cualquier cambio constituirá tu aceptación de la nueva Política de Privacidad.",
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
      <h2>Política de Privacidad de GameRate HUB</h2>
      <div className="faq-container">
        {politicaPreguntasFrecuentes.map((item, index) => (
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

